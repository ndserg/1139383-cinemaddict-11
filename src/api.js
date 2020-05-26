import FilmModel from './models/film.js';
import CommentsModel from "./models/comments.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getFilms() {
    return this._load({url: `movies`})
    .then((response) => response.json())
    .then(FilmModel.parseFilms);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
    .then((response) => response.json())
    .then(CommentsModel.parseComments);
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      headers: new Headers({"Content-Type": `application/json`}),
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
    })
    .then((response) => response.json())
    .then(FilmModel.parseFilm);
  }

  addComment(filmData, commentData) {
    return this._load({
      url: `comments/${filmData.id}`,
      headers: new Headers({"Content-Type": `application/json`}),
      method: `POST`,
      body: JSON.stringify(CommentsModel.commentToRaw(commentData)),
    })
      .then((response) => response.json())
      .then(({movie, comments}) => {
        return {
          movie: FilmModel.parseFilm(movie),
          comments: CommentsModel.parseComments(comments)
        };
      });
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: `DELETE`,
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
