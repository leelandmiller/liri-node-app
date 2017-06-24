const moment = require('moment');

function Actor(args) {
    this.name = args.name;
    this.bio = args.bio;
    this.bday = args.bday;
    this.gender = args.gender;
    this.popularity = args.popularity;
    this.knownFor = args.knownFor;
}

Actor.prototype.getInfo = function() {

    console.log(`
    Name: ${this.name}
    Birthday: ${moment(this.bday).format("MMM Do YYYY")}
    Gender: ${this.gender}
    Popularity: ${this.popularity}
    Known For:`);

    this.knownFor.forEach((movie, i) => {
        console.log(`
        ${movie.title} - ${moment(movie.releaseDate).format("MMM Do YYYY")}
        Rating: ${movie.rating}
        `);
    });
    
};

module.exports = Actor;
