const twitterKeys = {
    consumer_key: 'pQNEFUpkdSsDuztNVNVNqcnwi',
    consumer_secret: 'iRNwIrzSVCgR0YpGDLnuiWw6GjxklQ7Y2zkukmCxgzPOO7nmW6',
    access_token_key: '477610447-7SKimFI1jgyBPhMbZByQGrV4GTzvddEtZ0jfB9Mx',
    access_token_secret: 'hUU84ROQw0etj9Vkg2vjg8JWSMAT2mzQEm0V5r744Y8eG',
}

const spotifyKeys = {
    id: 'f380fb0509634e6ebe2ba320b9826e94',
    secret: 'ed186ecdde814a8cabaf5071301829f6',
}

let movieAPI = {
    key: 'a7f81ba434e0b69771bbcc1977a29d87',
    movieUrl: 'https://api.themoviedb.org/3/search/movie?api_key=',
    personUrl: 'https://api.themoviedb.org/3/search/person?api_key=',
    detailsUrl: 'https://api.themoviedb.org/3/person/',
    getCastUrl: 'https://api.themoviedb.org/3/movie/',
}

module.exports = { twitterKeys, spotifyKeys, movieAPI};
