import FilmCardComponent from "../components/film-card.js";
import FilmPopupComponent from "../components/film-popup.js";
import CommentsModel from "../models/comments.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const siteBodyElement = document.querySelector(`body`);

const Mode = {
  DEFAULT: `default`,
  OPEN_POPUP: `openPopup`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmData = {};

    this._commentsData = [];
    this._onCommentChange = this._onCommentChange.bind(this);

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmData = film;
    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(this._filmData.comments);
    this._commentsData = this._commentsModel.getComments();

    // Рэндеринг карточек фильмов
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCardComponent(this._filmData, this._commentsData);
    this._filmPopupComponent = new FilmPopupComponent(this._filmData, this._commentsData, this._onCommentChange);

    if (this._filmPopupComponent) {
      this._filmPopupComponent.setNewFilmData(this._filmData);
      this._filmPopupComponent.rerender();
    }

    const onButtonPopupClose = () => {
      this._removePopup(onButtonPopupClose);
    };

    this._filmCardComponent.setDetailClickHandler(() => {
      this._onViewChange();
      render(siteBodyElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
      this._filmPopupComponent.renderComments(this._commentsData);
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.OPEN_POPUP;
    });

    this._filmPopupComponent.setPopupButtonCloseHandler(onButtonPopupClose);

    // Обработка кликов на кнопках карточек фильмов «Add to watchlist», «Already watched», «Add to favorites»
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
        isFavorite: !film.isFavorite,
      }));
    });

    // Обработка кликов на кнопках попапа «Add to watchlist», «Already watched», «Add to favorites»
    this._filmPopupComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._filmPopupComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInHistory: !film.isInHistory,
      }));
    });

    this._filmPopupComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    if (oldFilmCardComponent && oldFilmPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopup();
    }
  }

  _onCommentChange(oldData, newData) {
    let isSuccess = false;
    if (newData === null) {
      isSuccess = this._commentsModel.removeComment(oldData.id);
    } else {
      isSuccess = this._commentsModel.addComment(newData);
    }

    if (isSuccess) {
      this._commentsData = this._commentsModel.getComments();
      this._filmPopupComponent.renderComments(this._commentsData);
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _removePopup(element) {
    this._filmPopupComponent.removeElement(element);
    this._filmPopupComponent.resetForm();
    this._popupMode = Mode.DEFAULT;
    this._commentsModel.setComments(this._filmData.comments);
    this._commentsData = this._commentsModel.getComments();
    remove(this._filmPopupComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
