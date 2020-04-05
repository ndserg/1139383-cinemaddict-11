import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createFilmsElementsTemplate} from "./components/films-block.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmsExtraBlockTemplate} from "./components/films-extra.js";
import {createFilmInfoPopupTemplate} from "./components/film-details.js";
import {createCardsButtonShowMoreTemplate} from "./components/load-more-button.js";

const FILM_CARDS_COUNT = 5;
const EXTRA_FILM_CARDS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmsElementsTemplate(), `beforeend`);

// Рэндеринг блока списков и карточек фильмов
const filmsElement = document.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate(), `beforeend`);

// Рэндеринг карточек фильмов
const filmsBlockElement = filmsElement.querySelector(`.films-list`);
const filmsBlockContainerElement = filmsBlockElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsBlockContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(filmsBlockElement, createCardsButtonShowMoreTemplate(), `beforeend`);

// Рендеринг "Top Rated" и "Most commented" карточек фильмов
render(filmsElement, createFilmsExtraBlockTemplate(`Top rated`), `beforeend`);
render(filmsElement, createFilmsExtraBlockTemplate(`Most commented`), `beforeend`);

const filmsExtraBlockElements = filmsElement.querySelectorAll(`.films-list--extra`);

filmsExtraBlockElements.forEach((element) => {
  const filmsExtraBlockContainerElement = element.querySelector(`.films-list__container`);

  for (let i = 0; i < EXTRA_FILM_CARDS_COUNT; i++) {
    render(filmsExtraBlockContainerElement, createFilmCardTemplate(), `beforeend`);
  }
});

// Рендеринг Подробная информация о фильме (попап)
render(siteBodyElement, createFilmInfoPopupTemplate(), `beforeend`);

const filmsDetailsElement = document.querySelector(`.film-details`);

filmsDetailsElement.setAttribute(`style`, `position: static`);
