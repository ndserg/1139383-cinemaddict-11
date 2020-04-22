// Шаблон Блока Списков карточек фильмов
import {createElement} from "../utils.js";

export const createFilmsElementsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsElements {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsElementsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
