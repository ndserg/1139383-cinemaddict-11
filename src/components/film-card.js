// Шаблон Карточки Фильма
import AbstractComponent from "./abstract-component.js";

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
    commentsCount
  } = film;
  const year = releaseDate.substr(releaseDate.length - 4);
  const descriptionText = prepareDescription(description);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre.join(`, `)}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionText}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
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

  setDetailClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
