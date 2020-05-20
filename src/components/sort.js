// Шаблон сортировки
import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DATE: `date`,
  RATING: `raiting`,
  DEFAULT: `default`,
};

const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  _addActiveClass(activeElement) {
    const sortElements = document.querySelectorAll(`.sort__button`);

    sortElements.forEach((element) => {
      if (element.classList.contains(`sort__button--active`) === true) {
        element.classList.remove(`sort__button--active`);
      }
    });

    activeElement.classList.add(`sort__button--active`);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this._addActiveClass(evt.target);

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
