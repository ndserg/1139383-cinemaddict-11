import FilmCardComponent from "../components/film-card.js";
import FilmInfoPopupComponent from "../components/film-details.js";
import FilmCommentsPopupComponent from "../components/film-comments.js";
import {generateComments} from "../mock/comment.js";
import {render, replace, addPopupElement, removePopupElement, RenderPosition} from "../utils/render.js";

const comments = generateComments();
const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmCardComponent = null;
    this._filmInfoPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    // Рэндеринг карточек фильмов
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmInfoPopupComponent = this._filmInfoPopupComponent;
    const oldFilmPopupCommentComponent = this._filmPopupCommentComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmInfoPopupComponent = new FilmInfoPopupComponent(film);
    this._filmPopupCommentComponent = new FilmCommentsPopupComponent(comments);

    const onButtonPopupClose = () => {
      this._removePopup(onButtonPopupClose);
    };

    this._filmCardComponent.setDetailClickHandler(() => {
      addPopupElement(siteBodyElement, this._filmInfoPopupComponent, this._filmPopupCommentComponent);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmInfoPopupComponent.setPopupButtonCloseHandler(onButtonPopupClose);

    // Обработка кликов на кнопках   карточек фильмов «Add to watchlist», «Already watched», «Add to favorites»
    this._filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInHistory: !film.isInHistory,
      }));
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorit: !film.isFavorit,
      }));
    });

    // Обработка кликов на кнопках попапа «Add to watchlist», «Already watched», «Add to favorites»
    this._filmInfoPopupComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._filmInfoPopupComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInHistory: !film.isInHistory,
      }));
    });

    this._filmInfoPopupComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorit: !film.isFavorit,
      }));
    });

    if (oldFilmCardComponent && oldFilmInfoPopupComponent && oldFilmPopupCommentComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmInfoPopupComponent, oldFilmInfoPopupComponent);
      replace(this._filmPopupCommentComponent, oldFilmPopupCommentComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _removePopup(element) {
    this._filmInfoPopupComponent.removeElement(element);
    removePopupElement(siteBodyElement, this._filmInfoPopupComponent, this._filmPopupCommentComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
