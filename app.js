const inquirer = require('inquirer');
const request = require('request');

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

const keys = require('./keys');
const myTwitter = require('./my-twitter');
const mySpotify = require('./my-spotify');
const myTMDB = require('./my-tmdb');
const myRandom = require('./my-random');

const commandChoices = ['Show My Tweets', 'Search on Spotify', 'Checkout a Movie', 'Do What it Says'];
const rngCommands = ['twitter', 'track', 'artist', 'movie', 'actor'];

// welcome user to Liri, ask them what they want Liri to do for them
inquirer.prompt([{
        type: 'input',
        message: 'Welcome to Liri!',
        name: 'welcome'
    },
    {
        type: 'list',
        message: 'What can I help you with today?',
        choices: commandChoices,
        name: 'commandChoice'
    }
]).then((answers) => {
    switch (answers.commandChoice) {
        case commandChoices[0]:
            // twitter - ask user to enter their twitter handle
            inquirer.prompt([{
                type: 'input',
                message: 'What is your twitter handle?',
                name: 'twitterHandle'
            }]).then((answers) => {
                if (answers.twitterHandle) {
                    myTwitter.getMyTweets(answers.twitterHandle);
                } else {
                    myTwitter.getMyTweets('pewdiepie');
                }
            });
            break;
        case commandChoices[1]:
            // spotify
            // ask user to enter a song to search for
            inquirer.prompt([{
                    type: 'list',
                    message: 'Track or Artist?',
                    choices: ['Track', 'Artist'],
                    name: 'type',
                },
                {
                    type: 'input',
                    message: 'What is the name?',
                    name: 'title',
                }
            ]).then((answers) => {
                if (answers.title) {
                    mySpotify.getSpotifyInfo(answers, 0);
                } else {
                    if (answers.type === 'Track') {
                        mySpotify.getSpotifyInfo({
                            type: 'Track',
                            title: 'one love bob marley'
                        }, 0);
                    } else if (answers.type === 'Artist') {
                        mySpotify.getSpotifyInfo({
                            type: 'Artist',
                            title: 'slightly stoopid'
                        }, 0);
                    }
                }
            });
            break;
        case commandChoices[2]:
            // movie
            inquirer.prompt([{
                    type: 'list',
                    message: 'Search by actor for a list of their movies -OR- \nSearch by movie title for detailed info:',
                    choices: ['Actor', 'Movie'],
                    name: 'type',
                },
                {
                    type: 'input',
                    message: 'What is the name?',
                    name: 'name',
                }
            ]).then((answers) => {
                if (answers.name) {
                    myTMDB.getTMDBData(answers);
                } else {
                    if (answers.type === 'Actor') {
                        myTMDB.getTMDBData({
                            type: answers.type,
                            name: 'Jennifer Lawrence'
                        });
                    } else if (answers.type === 'Movie') {
                        myTMDB.getTMDBData({
                            type: answers.type,
                            name: 'Avatar'
                        });
                    }
                }
            });
            break;
        case commandChoices[3]:
            // random number between 0 and total num of commands in random.json
            let commands = myRandom.fetchCommands();
            let rng = Math.floor(Math.random() * commands.length);
            // get the command
            let command = myRandom.getCommand(rng);

            switch (command.type) {
                case rngCommands[0]:
                    // twitter
                    myTwitter.getMyTweets(command.name);
                    break;
                case rngCommands[1]:
                    // track
                    mySpotify.getSpotifyInfo(command, 0);
                    break;
                case rngCommands[2]:
                    // artist
                    mySpotify.getSpotifyInfo(command, 0);
                    break;
                case rngCommands[3]:
                    // movie
                    myTMDB.getTMDBData(command);
                    break;
                case rngCommands[4]:
                    // actor
                    myTMDB.getTMDBData(command);
                    break;
                default:
                    // odd
                    console.log('Error');
                    break;
            }
            break;
    }
});
