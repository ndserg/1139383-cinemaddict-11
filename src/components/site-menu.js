import AbstractComponent from "./abstract-component.js";

// Шаблон Меню
const createSiteMenuTemplate = (counter) => {
  const {watchlist, history, isFavorite} = counter;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${isFavorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(filterCounter) {
    super();

    this._filterCounter = filterCounter;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filterCounter);
  }
}
