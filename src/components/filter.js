import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (filter) => {
  const {id, name, count, isActive} = filter;
  const filmId = id.toString().toLowerCase();
  const activeClass = isActive ? `main-navigation__item--active` : ``;

  return (
    `<a href="#${filmId}" id="filter__${filmId}" data-name="${name}" class="main-navigation__item ${activeClass}">
    ${name} ${name !== `All movies` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.active)).join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }
  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.dataset.name;
      handler(filterName);
    });
  }
}
