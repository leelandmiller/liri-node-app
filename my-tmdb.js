const inquirer = require('inquirer');
const request = require('request');

const keys = require('./keys');
const log = require('./log');
const Actor = require('./Actor');
const Movie = require('./Movie');

let getTMDBData = (query) => {
    //console.log(JSON.stringify(query, null, 2));
    let queryUrl = '';
    if (query.type.toLowerCase() === 'actor') {

        queryUrl = keys.movieAPI.personUrl + keys.movieAPI.key + '&query=' + query.name;
        getActor(queryUrl);

    } else if (query.type.toLowerCase() === 'movie') {

        queryUrl = keys.movieAPI.movieUrl + keys.movieAPI.key + '&query=' + query.name;
        getMovie(queryUrl);
    }
};

let getActor = (queryUrl) => {
    // request()
    request(queryUrl, (err, response, body) => {
        body = JSON.parse(body);

        let actorObj = {
            name: body.results[0].name,
            bio: '',
            bday: '',
            gender: '',
            popularity: '',
            knownFor: [],
        };

        // loops and pushes movies that the actor is known for
        body.results[0].known_for.forEach((val, i) => {
            let movie = {
                title: val.title,
                releaseDate: val.release_date,
                rating: val.vote_average,
            }
            actorObj.knownFor.push(movie);
        });

        // store id for next request
        let id = body.results[0].id;
        // get more actor details using actor's id
        queryUrl = keys.movieAPI.detailsUrl + id + '?api_key=' + keys.movieAPI.key;

        request(queryUrl, (err, response, body) => {
            body = JSON.parse(body);
            // get bio, bday, gender, pop,
            actorObj.bio = body.biography;
            actorObj.bday = body.birthday;
            actorObj.gender = (body.gender === 1 ? 'female' : 'male');
            actorObj.popularity = (parseFloat(body.popularity)).toFixed(2);

            let actor = new Actor(actorObj);
            actor.showInfo();
            logTMDB(actor, 'Actor');
        });
    });
};

let getMovie = (queryUrl) => {

    request(queryUrl, (err, response, body) => {

        body = JSON.parse(body);

        let movieObj = {
            title: body.results[0].title,
            year: body.results[0].release_date,
            imdbRating: body.results[0].vote_average,
            lang: body.results[0].original_language,
            plot: body.results[0].overview,
            cast: [],
        }

        let id = body.results[0].id;

        queryUrl = keys.movieAPI.getCastUrl + id + '?api_key=' + keys.movieAPI.key + '&append_to_response=credits';
        // request to get the cast
        request(queryUrl, (err, response, body) => {
            body = JSON.parse(body);

            movieObj.url = body.homepage;

            body.credits.cast.every((castMem, i) => {
                movieObj.cast.push({
                    char: castMem.character,
                    name: castMem.name,
                });

                return i < 8;
            });

            let movie = new Movie(movieObj);
            movie.showInfo();
            logTMDB(movie, 'Movie');
        });
    });
};

let logTMDB = (data, queryType) => {
    let newLog = {
        command: 'tmdb',
        input: {
            type: queryType,
            title: (queryType.toLowerCase() === 'movie' ? data.title : data.name),
        },
        log: data
    }

    log.addLog(newLog);
};

module.exports = {
    getTMDBData
};
