// Шаблон Карточки Фильма
import AbstractComponent from "./abstract-component.js";
import moment from "moment";

const ITEM_ACTIVE_CLASS = `film-card__controls-item--active`;

const prepareDescription = (description) => {
  const DESCRIPTION_LENGTH = 139;
  return description.length <= DESCRIPTION_LENGTH ? description : description.substr(0, DESCRIPTION_LENGTH) + ` ...`;
};

const createFilmCardTemplate = (film) => {
  const {
    name,
    rating,
    releaseDate,
    duration,
    genre,
    poster,
    description,
    isInWatchlist,
    isInHistory,
    isFavorite
  } = film;
  const year = releaseDate.getFullYear();
  const descriptionText = prepareDescription(description);
  const filmDuration = moment.utc(duration * 60 * 1000).format(`HH:mm`);
  const commentsCount = film.comments.length;
  const watchlistActiveClass = isInWatchlist ? ITEM_ACTIVE_CLASS : ``;
  const historyActiveClass = isInHistory ? ITEM_ACTIVE_CLASS : ``;
  const favoriteActiveClass = isFavorite ? ITEM_ACTIVE_CLASS : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genre.join(`, `)}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionText}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActiveClass}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  rerender() {
    super.rerender();
  }

  setDetailClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
    .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
