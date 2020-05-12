// Шаблон Подробная информация о фильме (попап)
import {MONTHS, COMMENT_EMOJIS} from "../const.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const createGenresMarkup = (genre) => {

  return (
    ` <span class="film-details__genre">${genre}</span>`
  );
};

const createFilmInfoPopupMarkup = (film) => {
  const {
    name,
    poster,
    rating,
    age,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genre,
    description
  } = film;
  const genresMarkup = genre.map((it) => createGenresMarkup(it)).join(`\n`);
  const filmDate = `${releaseDate.getDate()} ${MONTHS[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`;

  return (
    `<div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="">

        <p class="film-details__age">${age}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${name}</h3>
            <p class="film-details__title-original">Original: ${name}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${filmDate}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${duration}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
            <td class="film-details__cell">
              ${genresMarkup}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`
  );
};

const createCommentMarkup = (comment) => {
  const {emoji, text, author, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createPopupEmojiListMarkup = (emojis) => {

  return emojis
    .map((emoji) => {
      const isChecked = emoji;
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${isChecked ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`
      );
    })
    .join(`\n`);
};

const createFilmCommentsPopupMarkup = (film) => {
  const {comments} = film;
  const commentsTemplate = comments.map((it) => createCommentMarkup(it)).join(`\n`);
  const emojiList = createPopupEmojiListMarkup(COMMENT_EMOJIS);

  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiList}
          </div>
        </div>
      </section>
    </div>`
  );
};

const createFilmPopupTemplate = (film) => {
  const filmInfo = createFilmInfoPopupMarkup(film);
  const commentsMarkup = createFilmCommentsPopupMarkup(film);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        ${filmInfo}
        ${commentsMarkup}
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._popupButtonClose = this.getElement().querySelector(`.film-details__close-btn`);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const emojiList = element.querySelectorAll(`.film-details__emoji-item`);
    const emojiInsert = element.querySelector(`.film-details__add-emoji-label`);

    emojiList.forEach(() => {
      element.addEventListener(`change`, (evt) => {
        const _activeEmoji = evt.target.value;
        emojiInsert.innerHTML = `<img src="./images/emoji/${_activeEmoji}.png" width="55" height="55" alt="emoji-${_activeEmoji}">`;
      });
    });
  }

  setPopupButtonCloseHandler(handler) {
    this._popupButtonClose.addEventListener(`click`, handler);
  }

  removeElement(handler) {
    this._popupButtonClose.addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }
}
