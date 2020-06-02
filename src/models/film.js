export default class FilmModel {
  constructor(film) {
    this.id = film[`id`];
    this.name = film[`film_info`][`title`];
    this.genre = film[`film_info`][`genre`];
    this.poster = film[`film_info`][`poster`];
    this.age = film[`film_info`][`age_rating`];
    this.originalTitle = film[`film_info`][`alternative_title`];
    this.director = film[`film_info`][`director`];
    this.actors = film[`film_info`][`actors`];
    this.writers = film[`film_info`][`writers`];
    this.country = film[`film_info`][`release`][`release_country`];
    this.rating = film[`film_info`][`total_rating`];
    this.releaseDate = new Date(film[`film_info`][`release`][`date`]);
    this.duration = film[`film_info`][`runtime`];
    this.description = film[`film_info`][`description`];
    this.isInWatchlist = Boolean(film[`user_details`][`watchlist`]);
    this.isInHistory = Boolean(film[`user_details`][`already_watched`]);
    this.whatchingDate = new Date(film[`user_details`][`watching_date`]);
    this.isFavorite = Boolean(film[`user_details`][`favorite`]);
    this.comments = film[`comments`];
  }

  static parseFilm(film) {
    return new FilmModel(film);
  }

  static parseFilms(films) {
    return films.map(FilmModel.parseFilm);
  }

  toRAW() {
    return {
      "id": this.id,
      "film_info": {
        "title": this.name,
        "genre": this.genre,
        "poster": this.poster,
        "age_rating": this.age,
        "alternative_title": this.originalTitle,
        "director": this.director,
        "actors": this.actors,
        "writers": this.writers,
        "release": {
          "release_country": this.country,
          "date": this.releaseDate.toISOString()
        },
        "total_rating": this.rating,
        "runtime": this.duration,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.isInWatchlist,
        "already_watched": this.isInHistory,
        "watching_date": this.watchingDate ? this.watchingDate.toISOString() : null,
        "favorite": this.isFavorite
      },
      "comments": this.comments
    };
  }

  static clone(film) {
    return new FilmModel(film.toRAW());
  }
}
