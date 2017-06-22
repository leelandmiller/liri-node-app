const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');

const keys = require('./keys');

function SpotifyInfo() {

}

function titleCase(str) {
    if (str !== undefined) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
        return '';
    }

}

let getSpotifyInfo = (query, count) => {
    const spotify = new Spotify(keys.spotifyKeys);
    spotify.search({
        type: query.type,
        query: query.title,
        limit: 10
    }).then((data) => {
        // console.log(JSON.stringify(data, null, 2));
        showSpotifyInfo(count, data, query.type);
    }).catch((err) => {
        console.log(err);
    });
};

let showSpotifyInfo = (count, data, queryType) => {
    // show spotify info from api response
    let spotifyInfo = new SpotifyInfo();

    if (queryType.toLowerCase() === 'track') {
        spotifyInfo.queryType = queryType.toLowerCase();
        spotifyInfo.artist =  data.tracks.items[count].artists[0].name;
        spotifyInfo.track = data.tracks.items[count].name;
        spotifyInfo.album = data.tracks.items[count].album.name;
        spotifyInfo.url = data.tracks.items[count].external_urls.spotify;
    } else if (queryType.toLowerCase() === 'artist') {
        spotifyInfo.queryType = queryType.toLowerCase();
        spotifyInfo.artist = data.artists.items[count].name;
        spotifyInfo.genre = titleCase(data.artists.items[count].genres[0]);
        spotifyInfo.url = data.artists.items[count].external_urls.spotify;
        spotifyInfo.followers = data.artists.items[count].followers.total;
    }

    let total = data[`${spotifyInfo.queryType.toLowerCase()}s`].total;
    // store property names into an array.
    // they will differ depending on if they searched an artist or track
    let spotifyInfoKeys = Object.getOwnPropertyNames(spotifyInfo);

    console.log('----------');
    spotifyInfoKeys.forEach((val, i) => {
        if (val !== 'queryType') {
            console.log(`${titleCase(val)}: ${spotifyInfo[val]}`);
        }
    });
    console.log('----------');

    confirmResults(count, data, queryType, total);
}

let confirmResults = (count, data, queryType, total) => {
    // after results are displayed, asks user if it's what they wanted.
    // if it's not, displays the next result.
    inquirer.prompt([
        {
            type: 'confirm',
            message: `Is this the ${queryType} you were looking for?`,
            name: 'spotifyConfirm',
            default: true
        }
    ]).then((answers) => {
        if (!answers.spotifyConfirm) {
            if (++count < total) {
                showSpotifyInfo(count, data, queryType);
            } else {
                console.log("I'm having some trouble finding what you're looking for.");
                let newQuery = {};
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Try searching for ' + (queryType === 'Track' ? 'an Artist:' : 'a Song:'),
                        name: 'newSpotifySearch',
                    }
                ]).then((answers) => {
                    // new spotify api call
                    // build new query
                    newQuery = {
                        type: (queryType === 'Track' ? 'artist' : 'track'),
                        title: answers.newSpotifySearch,
                    };
                    getSpotifyInfo(newQuery, 0);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    });
}

module.exports = { getSpotifyInfo, };
