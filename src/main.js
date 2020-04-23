import HeaderProfileComponent from "./components/header-profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import FilmsElementsComponent from "./components/films-block.js";
import NoFilmsComponent from "./components/no-films.js";
import FilmsListComponent from "./components/films-list.js";
import FilmCardComponent from "./components/film-card.js";
import FilmsExtraBlockComponent from "./components/films-extra.js";
import FilmInfoPopupComponent from "./components/film-details.js";
import FilmCommentsPopupComponent from "./components/film-comments.js";
import CardsButtonShowMoreComponent from "./components/load-more-button.js";
import FooterStatisticComponent from "./components/footer-statistic.js";
import {generateFilms} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";
import {render, RenderPosition} from "./utils.js";

const FILM_CARDS_COUNT = 20;
const EXTRA_FILM_CARDS_COUNT = 2;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_CARDS_COUNT);
const comments = generateComments();

// Рэндеринг карточек фильмов
const renderFilmCard = (filmsContainerElement, film) => {

  const showPopup = () => {
    siteBodyElement.appendChild(filmInfoPopupComponent.getElement());
    filmInfoPopupComponent.getElement().appendChild(filmPopupCommentComponent.getElement());
  };

  const removePopup = () => {
    closePopupButton.removeEventListener(`click`, onButtonPopupClose);
    filmInfoPopupComponent.getElement().removeChild(filmPopupCommentComponent.getElement());
    siteBodyElement.removeChild(filmInfoPopupComponent.getElement());
  };

  const onButtonPopupClose = () => {
    removePopup();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const flmCardComponent = new FilmCardComponent(film);
  flmCardComponent.getElement().addEventListener(`click`, () => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  // Подробная информация о фильме (попап)
  const filmInfoPopupComponent = new FilmInfoPopupComponent(film);

  // Комментарии к фильму (попап)
  const filmPopupCommentComponent = new FilmCommentsPopupComponent(comments);

  const closePopupButton = filmInfoPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  closePopupButton.addEventListener(`click`, onButtonPopupClose);

  render(filmsContainerElement, flmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

// Счетчик фильтров
const filterCounter = {
  watchlist: films.filter((film) => film.isInWatchlist > 5).length,
  history: films.filter((film) => film.isInHistory > 5).length,
  favorite: films.filter((film) => film.isFavorit > 5).length
};

const headerProfileComponent = new HeaderProfileComponent();
const siteMenuComponent = new SiteMenuComponent(filterCounter);
const filterComponent = new FilterComponent();
const filmsElementsComponent = new FilmsElementsComponent();
const filmsListComponent = new FilmsListComponent();
const cardsButtonShowMoreComponent = new CardsButtonShowMoreComponent();

render(siteHeaderElement, headerProfileComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filterComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsElementsComponent.getElement(), RenderPosition.BEFOREEND);

// Вывод сообщения об отсутствии фильмов
if (films.length === 0) {
  filmsListComponent.getElement().querySelector(`h2`).remove();
  render(filmsListComponent.getElement(), new NoFilmsComponent().getElement(), RenderPosition.AFTERBEGIN);
}

// Рэндеринг блока списков и карточек фильмов
render(filmsElementsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

// Рэндеринг карточек фильмов
const filmsBlockContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

films.slice(0, showingCardsCount)
  .forEach((film) => {
    renderFilmCard(filmsBlockContainerElement, film);
  });

// Показ карточек по кнопке "Show more"
render(filmsListComponent.getElement(), cardsButtonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

cardsButtonShowMoreComponent.getElement().addEventListener(`click`, () => {
  const prevCardCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  films.slice(prevCardCount, showingCardsCount)
  .forEach((film) => {
    renderFilmCard(filmsBlockContainerElement, film);
  });

  if (showingCardsCount >= films.length) {
    cardsButtonShowMoreComponent.getElement().remove();
    cardsButtonShowMoreComponent.removeElement();
  }
});

// Рендеринг "Top Rated" карточек
const topRatedFilms = films
  .filter((film) => film.rating > 0)
  .sort((a, b) => {
    return (b.rating - a.rating);
  });

if (topRatedFilms.length > 0) {
  render(filmsElementsComponent.getElement(), new FilmsExtraBlockComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);

  const topRatedFilmsElement = filmsElementsComponent.getElement().querySelector(`.films-list--top_rated`).querySelector(`.films-list__container`);

  topRatedFilms.slice(0, EXTRA_FILM_CARDS_COUNT)
  .forEach((film) => {
    renderFilmCard(topRatedFilmsElement, film);
  });
}

// Рендеринг "Most commented" карточек
const mostCommentedFilms = films
  .filter((film) => film.commentsCount > 0)
  .sort((a, b) => {
    return (b.commentsCount - a.commentsCount);
  });

if (mostCommentedFilms.length > 0) {
  render(filmsElementsComponent.getElement(), new FilmsExtraBlockComponent(`Most commented`).getElement(), RenderPosition.BEFOREEND);

  const mostCommentedFilmsElement = filmsElementsComponent.getElement().querySelector(`.films-list--most_commented`).querySelector(`.films-list__container`);

  mostCommentedFilms.slice(0, EXTRA_FILM_CARDS_COUNT)
  .forEach((film) => {
    renderFilmCard(mostCommentedFilmsElement, film);
  });
}

// Рендеринг Количества фильмов в базе (в футере)
render(footerStatisticElement, new FooterStatisticComponent(films.length).getElement(), RenderPosition.BEFOREEND);
