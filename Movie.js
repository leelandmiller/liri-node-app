function Movie(args) {
    this.title = args.title;
    this.year = args.year;
    this.imdbRating = args.imdbRating;
    this.lang = args.lang;
    this.plot = args.plot;
    this.cast = args.cast;
    this.url = args.url;
}

Movie.prototype.getInfo = function() {
    console.log(`
        Title: ${this.title}
        Year: ${this.year}
        Rating: ${this.imdbRating}
        Language: ${this.lang}
        URL: ${this.url}

        Plot: ${this.plot}
        
        Cast:`);

    this.cast.forEach((castMem, i) => {
        console.log(`
            Name: ${castMem.name}
            Character: ${castMem.char}`);
    });
};

module.exports = Movie;
