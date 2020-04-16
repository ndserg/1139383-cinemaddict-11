import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createFilmsElementsTemplate} from "./components/films-block.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmsExtraBlockTemplate} from "./components/films-extra.js";
import {createFilmInfoPopupTemplate} from "./components/film-details.js";
import {createFilmCommentsPopupTemplate} from "./components/film-comments.js";
import {createCardsButtonShowMoreTemplate} from "./components/load-more-button.js";
import {createFooterStatisticTemplate} from "./components/footer-statistic.js";
import {generateFilms} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";

const FILM_CARDS_COUNT = 20;
const EXTRA_FILM_CARDS_COUNT = 2;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_CARDS_COUNT);
const comments = generateComments();

// Счетчик фильтров
const filterCounter = {
  watchlist: films.filter((film) => film.isInWatchlist > 5).length,
  history: films.filter((film) => film.isInHistory > 5).length,
  favorite: films.filter((film) => film.isFavorit > 5).length
};

render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(filterCounter), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmsElementsTemplate(), `beforeend`);

// Рэндеринг блока списков и карточек фильмов
const filmsElement = document.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate(), `beforeend`);

// Рэндеринг карточек фильмов
const filmsBlockElement = filmsElement.querySelector(`.films-list`);
const filmsBlockContainerElement = filmsBlockElement.querySelector(`.films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

films.slice(0, showingCardsCount)
  .forEach((film) => render(filmsBlockContainerElement, createFilmCardTemplate(film), `beforeend`));

render(filmsBlockElement, createCardsButtonShowMoreTemplate(), `beforeend`);

const loadMoreButton = filmsBlockElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevCardCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  films.slice(prevCardCount, showingCardsCount)
  .forEach((film) => render(filmsBlockContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingCardsCount >= films.length) {
    loadMoreButton.remove();
  }
});

// Рендеринг "Top Rated" карточек
const topRatedFilms = films
  .filter((film) => film.rating > 0)
  .sort((a, b) => {
    return (b.rating - a.rating);
  });

if (topRatedFilms.length > 0) {
  render(filmsElement, createFilmsExtraBlockTemplate(`Top rated`), `beforeend`);

  const topRatedFilmsElement = filmsElement.querySelector(`.films-list--top_rated`).querySelector(`.films-list__container`);

  topRatedFilms.slice(0, EXTRA_FILM_CARDS_COUNT)
  .forEach((film) => render(topRatedFilmsElement, createFilmCardTemplate(film), `beforeend`));
}

// Рендеринг "Most commented" карточек
const mostCommentedFilms = films
  .filter((film) => film.commentsCount > 0)
  .sort((a, b) => {
    return (b.commentsCount - a.commentsCount);
  });

if (mostCommentedFilms.length > 0) {
  render(filmsElement, createFilmsExtraBlockTemplate(`Most commented`), `beforeend`);

  const mostCommentedFilmsElement = filmsElement.querySelector(`.films-list--most_commented`).querySelector(`.films-list__container`);

  mostCommentedFilms.slice(0, EXTRA_FILM_CARDS_COUNT)
  .forEach((film) => render(mostCommentedFilmsElement, createFilmCardTemplate(film), `beforeend`));
}

// Рендеринг Количества фильмов в базе (в футере)
render(footerStatisticElement, createFooterStatisticTemplate(films.length), `beforeend`);

// Рендеринг Подробная информация о фильме (попап)
render(siteBodyElement, createFilmInfoPopupTemplate(films[0]), `beforeend`);

const filmsDetailsElement = document.querySelector(`.film-details`);

filmsDetailsElement.setAttribute(`style`, `position: static`);

// Рендеринг Комментарии к фильму (попап)
render(filmsDetailsElement, createFilmCommentsPopupTemplate(comments), `beforeend`);
