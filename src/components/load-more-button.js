// Шаблон Кнопки "Показать Больше"
import AbstractComponent from "./abstract-component.js";

const createCardsButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class CardsButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createCardsButtonShowMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
