// Шаблон Кнопки "Показать Больше"
import {createElement} from "../utils.js";

const createCardsButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class CardsButtonShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCardsButtonShowMoreTemplate();
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
