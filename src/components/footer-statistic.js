// Количество фильмов в базе (футер сайта)
import AbstractComponent from "./abstract-component.js";

const createFooterStatisticTemplate = (films) => {
  const counter = films.getFilms().length;

  return (
    `<p>${counter} movies inside</p>`
  );
};

export default class FooterStatistic extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._filmsModel);
  }
}
