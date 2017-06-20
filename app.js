const inquirer = require('inquirer');
const request = require('request');

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

const keys = require('./keys');
const myTwitter = require('./my-twitter');
const mySpotify = require('./my-spotify');
const myOMDB = require('./my-omdb');

const commandChoices = ['Show My Tweets', 'Checkout a Song on Spotify', 'Checkout a Movie', 'Do What it Says'];

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
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is your twitter handle?',
                    name: 'twitterHandle'
                }
            ]).then((answers) => {
                myTwitter.getMyTweets(answers.twitterHandle);
            });
            break;
        case commandChoices[1]:
            // spotify
            // ask user to enter a song to search for
            inquirer.prompt([
                {
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
                let count = 0;
                mySpotify.getSpotifyInfo(answers, count);
            });
            break;
        case commandChoices[2]:
            // movie
            break;
        case commandChoices[2]:
            // random
            break;
    }
});
