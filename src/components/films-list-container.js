// Шаблон блока карточек фильмов
import AbstractComponent from "./abstract-component.js";

const createFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsListContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
