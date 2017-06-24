const fs = require('fs');
const _ = require('lodash');

let fetchLogs = () => {
    try {
        let logsString = fs.readFileSync('logs.json');
        return JSON.parse(logsString);
    } catch(e) {
        return [];
    }
};

let saveLogs = (logs) => {
    fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2));
};

let addLog = (log) => {
    let logs = fetchLogs();
    logs.push(log);

    saveLogs(logs);
}

module.exports = { addLog, fetchLogs };
