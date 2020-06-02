import API from "../api.js";
import FilmCardComponent from "../components/film-card.js";
import FilmPopupComponent from "../components/film-popup.js";
import FilmModel from "../models/film.js";
import CommentsModel from "../models/comments.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import {
  AUTHORIZATION,
  END_POINT,
  SHAKE_ANIMATION_TIMEOUT,
  siteBodyElement,
  Mode
} from "../const.js";

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

    // Рэндеринг карточек фильмов
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCardComponent(this._filmData);

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

      const api = new API(END_POINT, AUTHORIZATION);
      this._commentsModel = new CommentsModel();
      this._commentsData = this._commentsModel.getComments();

      api.getComments(this._filmData.id)
      .then((comments) => {

        this._commentsModel.setComments(comments);
        this._commentsData = this._commentsModel.getComments();

        render(siteBodyElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
        this._filmPopupComponent.renderComments(this._commentsData);
      });

      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.OPEN_POPUP;
    });

    this._filmPopupComponent.setPopupButtonCloseHandler(onButtonPopupClose);

    // Обработка кликов на кнопках карточек фильмов «Add to watchlist», «Already watched», «Add to favorites»
    this._filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = FilmModel.clone(this._filmData);
      newFilm.isInWatchlist = !newFilm.isInWatchlist;
      this._onDataChange(this, this._filmData, newFilm);
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = FilmModel.clone(this._filmData);
      newFilm.isInHistory = !newFilm.isInHistory;
      this._onDataChange(this, this._filmData, newFilm);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = FilmModel.clone(this._filmData);
      newFilm.isFavorite = !newFilm.isFavorite;
      this._onDataChange(this, this._filmData, newFilm);
    });

    // Обработка кликов на кнопках попапа «Add to watchlist», «Already watched», «Add to favorites»
    this._filmPopupComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = FilmModel.clone(this._filmData);
      newFilm.isInWatchlist = !newFilm.isInWatchlist;
      this._onDataChange(this, this._filmData, newFilm);
    });

    this._filmPopupComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = FilmModel.clone(this._filmData);
      newFilm.isInHistory = !newFilm.isInHistory;
      this._onDataChange(this, this._filmData, newFilm);
    });

    this._filmPopupComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = FilmModel.clone(this._filmData);
      newFilm.isFavorite = !newFilm.isFavorite;
      this._onDataChange(this, this._filmData, newFilm);
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

  _onCommentChange(oldComment, newComment, commentComponent) {
    const api = new API(END_POINT, AUTHORIZATION);

    if (newComment === null) {
      commentComponent.getDeleteButton().disabled = true;
      commentComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      api.deleteComment(oldComment.id)
      .then(() => {
        this._commentsModel.removeComment(oldComment.id);
        this._commentsData = this._commentsModel.getComments();
        this._filmPopupComponent.renderComments(this._commentsData);
        this._filmData.comments = this._filmData.comments.filter((comment) => comment !== oldComment.id);
        this.render(this._filmData);
      })
      .catch(() => {
        this.shake(commentComponent);
        commentComponent.getDeleteButton().disabled = false;
      });
    } else {
      this._filmPopupComponent._getCommentInputElement().disabled = true;
      this._filmPopupComponent._getCommentInputElement().style.outline = `none`;

      api.addComment(this._filmData, newComment)
      .then((loadedData) => {
        this._filmData = loadedData.movie;
        this._commentsModel.setComments(loadedData.comments);
        this._commentsData = this._commentsModel.getComments();
        this._filmPopupComponent.renderComments(this._commentsData);
        this.render(this._filmData);
      })
      .catch(() => {
        this.shake(commentComponent);
      })
      .then(() => {
        this._filmPopupComponent._getCommentInputElement().disabled = false;
      });
    }
  }

  shake(commentComponent) {
    this._filmPopupComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._filmPopupComponent._getCommentInputElement().style.outline = `2px solid red`;

    setTimeout(() => {
      this._filmPopupComponent.getElement().style.animation = ``;
      this._filmPopupComponent._getCommentInputElement().style.outline = `none`;

      commentComponent.setData({
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _removePopup() {
    this._filmPopupComponent.resetForm();
    this._popupMode = Mode.DEFAULT;
    this._commentsModel.setComments(this._filmData.comments);
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
