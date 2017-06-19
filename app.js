const inquirer = require('inquirer');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');

const myTwitter = require('./my-twitter');
const mySpotify = require('./my-spotify');
const myOMDB = require('./my-omdb');

const commandChoices = [ 'Show My Tweets', 'Checkout a Song on Spotify', 'Checkout a Movie', 'Do What it Says'];

inquirer.prompt([
    {
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
    switch(answers.commandChoice) {
        case commandChoices[0]:
            // twitter
            console.log('showing your tweeter')
            break;
        case commandChoices[1]:
            // spotify
            break;
        case commandChoices[2]:
            // movie
            break;
        case commandChoices[2]:
            // random
            break;
    }
});
