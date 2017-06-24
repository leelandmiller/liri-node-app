const Twitter = require('twitter');
const moment = require('moment');

const keys = require('./keys');
const log = require('./log');

const twitter = new Twitter(keys.twitterKeys);

let getMyTweets = (username) => {
    // get some tweets from twitter
    twitter.get('search/tweets', {
        q:'from:' + username,
        count:10
    }, (err, tweets, response) => {
        let statuses = tweets.statuses;

        let formattedTweets = statuses.map((val) => {
            let rObj = {
                createdAt: val.created_at,
                text: val.text,
                retweetCount: val.retweet_count,
                favoriteCount: val.favorite_count,
            }
            return rObj;
        });

        showMyTweets(username, formattedTweets);
        logMyTweets(username, formattedTweets);
    });
};

let showMyTweets = (user, tweets) => {
    // show tweets here
    console.log(`User: ${user}`);
    console.log('-------------||-------------');
    let tweetsReverse = tweets.slice().reverse();
    tweetsReverse.forEach((val, i) => {
        let date = moment(new Date(val.createdAt)).format('dd MMM Do, YY - h:mm A');
        console.log(`Tweet: ${val.text}`);
        console.log(`Time: ${date}`);
        console.log(`RT: ${val.retweetCount}`);
        console.log(`Fav: ${val.favoriteCount}`);
        console.log('-------------');
    });
};

let logMyTweets = (user, tweets) => {
    let newLog = {
        command: 'twitter',
        input: user,
        log: tweets
    };
    log.addLog(newLog);
};

module.exports = { getMyTweets, showMyTweets };
