const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');

const keys = require('./keys');

const spotify = new Spotify(keys.spotifyKeys);

let getSpotifyInfo = (query, count) => {
    spotify.search({
        type: query.type,
        query: query.title,
        limit: 10
    }, (err, data) => {
        if (err) return console.log(`Error in Spotify: ${err}`);

        showSpotifyInfo(count, data, query.type);
    });
};


let showSpotifyInfo = (count, data, queryType) => {
    // show spotify info from api response
    let spotifyInfo = {
        artist: data.tracks.items[count].artists[0].name,
        track: data.tracks.items[count].name,
        album: data.tracks.items[count].album.name,
        url: 'https://open.spotify.com/track/3Zjdqz7eOox8XU0zTCPL4P',
    }

    console.log(
        `Artist: ${spotifyInfo.artist}\nTrack: ${spotifyInfo.track}\nAlbum: ${spotifyInfo.album}\nURL: ${spotifyInfo.url}`
    );
    console.log(queryType);
    // after results are displayed, asks user if it's what they wanted.
    // if it's not, displays the next result.
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Is this the song you were looking for?',
            name: 'spotifyConfirm',
            default: true
        }
    ]).then((answers) => {
        if (!answers.spotifyConfirm) {
            if (count < 9) {
                showSpotifyInfo(++count, data, queryType);
            } else {
                console.log("I'm having some trouble finding what you're looking for.");
                console.log(queryType);

                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Try searching for ' + (queryType === 'Track' ? 'an Artist' : 'a Song',
                        name: 'newSpotifySearch'
                    }
                ]).then((answers) => {
                    // new spotify api call
                });
            }
        }
    });
}

module.exports = { getSpotifyInfo, showSpotifyInfo };
