// Количество фильмов в базе (футер сайта)
import {createElement} from "../utils.js";

const createFooterStatisticTemplate = (counter) => {

  return (
    `<p>${counter} movies inside</p>`
  );
};

export default class FooterStatistic {
  constructor(counter) {
    this._counter = counter;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._counter);
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
