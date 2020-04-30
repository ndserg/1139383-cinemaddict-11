// Шаблон блока карточек фильмов
import AbstractComponent from "./abstract-component.js";

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
