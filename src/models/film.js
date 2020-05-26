export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];
    this.name = data[`film_info`][`title`];
    this.genre = data[`film_info`][`genre`];
    this.poster = data[`film_info`][`poster`];
    this.age = data[`film_info`][`age_rating`];
    this.originalTitle = data[`film_info`][`alternative_title`];
    this.director = data[`film_info`][`director`];
    this.actors = data[`film_info`][`actors`];
    this.writers = data[`film_info`][`writers`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.rating = data[`film_info`][`total_rating`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.duration = data[`film_info`][`runtime`];
    this.description = data[`film_info`][`description`];
    this.isInWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isInHistory = Boolean(data[`user_details`][`already_watched`]);
    this.whatchingDate = new Date(data[`user_details`][`watching_date`]);
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.comments = data[`comments`];
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
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

  static clone(data) {
    return new FilmModel(data.toRAW());
  }
}
