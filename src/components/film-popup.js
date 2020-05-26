// Шаблон Подробная информация о фильме (попап)
import {COMMENT_EMOJIS} from "../const.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import CommentComponent from "./comments.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import moment from "moment";
import {encode} from "he";

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
    description,
    isInWatchlist,
    isInHistory,
    isFavorite
  } = film;
  const genresMarkup = genre.map((it) => createGenresMarkup(it)).join(`\n`);
  const filmDate = moment(releaseDate).format(`DD MMMM YYYY`);
  const filmDuration = moment.utc(duration * 60 * 1000).format(`HH:mm`);
  const watchlistActive = isInWatchlist ? `checked` : ``;
  const historyActive = isInHistory ? `checked` : ``;
  const favoriteActive = isFavorite ? `checked` : ``;

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
            <td class="film-details__cell">${filmDuration}</td>
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
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistActive}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${historyActive}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteActive}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`
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

const createFilmCommentsPopupMarkup = (comments) => {
  const emojiList = createPopupEmojiListMarkup(COMMENT_EMOJIS);

  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">

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
  constructor(film, commentsData, onCommentChange) {
    super();

    this._filmData = film;
    this._commentsData = commentsData;
    this._activeEmoji = ``;
    this._emojiInsert = this.getElement().querySelector(`.film-details__add-emoji-label`);

    this._onCommentChange = onCommentChange;
    this._showedCommentsComponents = [];

    this._popupButtonClose = this.getElement().querySelector(`.film-details__close-btn`);
    this._setActiveEmoji();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._filmData, this._commentsData);
  }

  renderComments(commentsData) {
    this._commentsData = commentsData;
    this._removeAllComments();
    this._setCommentsCount(this._commentsData);
    this._commentsData.forEach((comment) => {
      const commentComponent = new CommentComponent(comment);
      this._showedCommentsComponents.push(commentComponent);
      commentComponent.setDeleteCommentHandler((evt) => {
        evt.preventDefault();
        this._onCommentChange(comment, null, commentComponent);
      });
      render(this._getCommentsListElement(), commentComponent, RenderPosition.BEFOREEND);
    });
  }

  _setCommentsCount(value) {
    this.getElement().querySelector(`.film-details__comments-count`).textContent = value.length;
  }

  getComments() {
    return this._commentsData;
  }

  _getCommentsListElement() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  _removeAllComments() {
    this._showedCommentsComponents.forEach((component) => remove(component));
    this._showedCommentsComponents = [];
  }

  _getCommentInputElement() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  setNewFilmData(newFilmData) {
    this._filmData = newFilmData;
  }

  setNewCommentHandler() {
    const commentInput = this._getCommentInputElement();
    commentInput.addEventListener(`input`, () => {
      this._newCommentTextValue = encode(commentInput.value);
    });
    commentInput.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && this._activeEmoji) {
        this._onCommentChange(null, {
          id: String(new Date() + Math.random()),
          emotion: this._activeEmoji,
          comment: encode(commentInput.value),
          author: `author`,
          date: new Date(),
        });
        commentInput.value = ``;
        this._newCommentTextValue = ``;
      }
    });
  }

  resetForm() {
    this.getElement().querySelector(`.film-details__inner`).reset();
    this._emojiInsert.innerHTML = ``;
  }

  recoveryListeners() {
    this._setActiveEmoji();
    this.setNewCommentHandler();
  }

  rerender() {
    super.rerender();
    this.renderComments(this._commentsData);
  }

  _setActiveEmoji() {
    const element = this.getElement();

    const emojiList = element.querySelectorAll(`.film-details__emoji-item`);

    emojiList.forEach(() => {
      element.addEventListener(`change`, (evt) => {
        this._activeEmoji = evt.target.value;
        if (COMMENT_EMOJIS.includes(this._activeEmoji)) {
          this._emojiInsert.innerHTML = `<img src="./images/emoji/${this._activeEmoji}.png" width="55" height="55" alt="emoji-${this._activeEmoji}">`;
        }
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
