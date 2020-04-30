// Количество фильмов в базе (футер сайта)
import AbstractComponent from "./abstract-component.js";

const createFooterStatisticTemplate = (counter) => {

  return (
    `<p>${counter} movies inside</p>`
  );
};

export default class FooterStatistic extends AbstractComponent {
  constructor(counter) {
    super();

    this._counter = counter;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._counter);
  }
}
