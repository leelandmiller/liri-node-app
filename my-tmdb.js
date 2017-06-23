const inquirer = require('inquirer');
const request = require('request');

const keys = require('./keys');

let getTMDBData = (query) => {
    console.log('doing a tmdb http request next');
    console.log(JSON.stringify(query, null, 2));
    let queryUrl = keys.url + keys.key;

    // request()
};

module.exports = { getTMDBData };
