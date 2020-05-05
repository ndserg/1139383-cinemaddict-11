import FilmCardComponent from "../components/film-card.js";
import FilmInfoPopupComponent from "../components/film-details.js";
import FilmCommentsPopupComponent from "../components/film-comments.js";
import {generateComments} from "../mock/comment.js";
import {render, addPopupElement, removePopupElement, RenderPosition} from "../utils/render.js";

const comments = generateComments();
const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmInfoPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    // Рэндеринг карточек фильмов
    this._flmCardComponent = new FilmCardComponent(film);
    this._filmInfoPopupComponent = new FilmInfoPopupComponent(film);
    this._filmPopupCommentComponent = new FilmCommentsPopupComponent(comments);

    const onButtonPopupClose = () => {
      this._removePopup(onButtonPopupClose);
    };

    this._flmCardComponent.setDetailClickHandler(() => {
      addPopupElement(siteBodyElement, this._filmInfoPopupComponent, this._filmPopupCommentComponent);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmInfoPopupComponent.setPopupButtonCloseHandler(onButtonPopupClose);
    render(this._container, this._flmCardComponent, RenderPosition.BEFOREEND);
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
