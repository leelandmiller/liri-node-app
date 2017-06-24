const fs = require('fs');
const _ = require('lodash');

const log = require('./log');

let fetchCommands = () => {
    // fetch potential commands from random.json
    try {
        let randomCommands = fs.readFileSync('random.json');
        return JSON.parse(randomCommands);
    } catch(e) {
        console.log(e);
    }
};

let getCommand = (rng) => {
    // fetches all potential 'random' commands from random.json
    let commands = fetchCommands();

    return commands[rng];
}

let doRandom = (command) => {
    // do random stuff
    console.log(rng);
};

module.exports = { getCommand, fetchCommands, doRandom };
