// Шаблон Блока Списков карточек фильмов
import AbstractComponent from "./abstract-component.js";

export const createFilmsElementsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsBlock extends AbstractComponent {
  getTemplate() {
    return createFilmsElementsTemplate();
  }
}
