import FilmModel from '../models/film-model.js';

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
      .then((films) => {
        const items = films.reduce((acc, current) => {
          return Object.assign({}, acc, {
            [current.id]: current,
          });
        }, {});

        this._store.setItems(items);

        return films;
      });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(FilmModel.parseTasks(storeTasks));
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  addComment(filmData, commentData) {
    if (isOnline()) {
      return this._api.addComment(filmData, commentData);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  deleteComment(commentId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  updateFilm(id, film) {
    if (isOnline()) {

      return this._api.updateFilm(id, film)
      .then((newFilm) => {
        this._store.setItem(newFilm.id, newFilm.toRAW());

        return newFilm;
      });
    }

    const localFilm = FilmModel.clone(Object.assign(film, {id}));

    this._store.setItem(id, localFilm.toRAW());

    return Promise.resolve(localFilm);
  }
}
