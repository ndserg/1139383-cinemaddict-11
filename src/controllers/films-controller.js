import FilmsListComponent from "../components/films-list.js";
import FilmsListCardsContainerComponent from "../components/films-list-container.js";
import CardsButtonShowMoreComponent from "../components/load-more-button.js";
import MovieController from "./movie-controller.js";
import FilmsExtraBlockComponent from "../components/films-extra.js";
import NoFilmsComponent from "../components/no-films.js";
import FilterComponent, {SortType} from "../components/filter.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const EXTRA_FILM_CARDS_COUNT = 2;

//  Сортировка карточек фильмов
const renderFilms = (filmsContainerElement, films, onDataChange) => {

  return films.map((film) => {
    const movieController = new MovieController(filmsContainerElement, onDataChange);

    movieController.render(film);

    return movieController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class FilmsController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedCardsControllers = [];
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListCardsContainerComponent = new FilmsListCardsContainerComponent();
    this._cardsButtonShowMoreComponent = new CardsButtonShowMoreComponent();
    this._filmsExtraBlockTopComponent = new FilmsExtraBlockComponent(`Top rated`);
    this._filmsExtraBlockMostCommentedComponent = new FilmsExtraBlockComponent(`Most commented`);
    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();

    this._onDataChange = this._onDataChange.bind(this);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._filterComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

    const container = this._container.getElement();
    const filmsListComponent = this._filmsListComponent.getElement();
    const filmsListCardsContainerComponent = this._filmsListCardsContainerComponent.getElement();

    const renderFilmsList = () => {
      // Рэндеринг блока списков и карточек фильмов
      render(filmsListComponent, this._filmsListCardsContainerComponent, RenderPosition.BEFOREEND);
      render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

      // Показ карточек по кнопке "Show more"
      if (this._showingCardsCount >= this._films.length) {
        return;
      }

      render(container, this._cardsButtonShowMoreComponent, RenderPosition.BEFOREEND);

      this._cardsButtonShowMoreComponent.setClickHandler(() => {
        const prevCardCount = this._showingCardsCount;
        this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(this._films, this._filterComponent.getSortType(), prevCardCount, this._showingCardsCount);

        const newCards = renderFilms(filmsListCardsContainerComponent, sortedFilms, this._onDataChange);
        this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

        if (this._showingCardsCount >= this._films.length) {
          remove(this._cardsButtonShowMoreComponent);
        }
      });

      const newCards = renderFilms(filmsListCardsContainerComponent, this._films.slice(0, this._showingCardsCount), this._onDataChange);
      this._showedCardsControllers = this._showedCardsControllers.concat(newCards);
    };

    render(container, this._filterComponent, RenderPosition.BEFOREEND);
    renderFilmsList();

    // Рендеринг "Top Rated" карточек
    const topRatedFilms = this._films
      .filter((film) => film.rating > 0)
      .sort((a, b) => {
        return (b.rating - a.rating);
      });

    if (topRatedFilms.length > 0) {
      render(container, this._filmsExtraBlockTopComponent, RenderPosition.BEFOREEND);

      const topRatedFilmsElement = container.querySelector(`.films-list--top_rated`).querySelector(`.films-list__container`);

      renderFilms(topRatedFilmsElement, topRatedFilms.slice(0, EXTRA_FILM_CARDS_COUNT), this._onDataChange);
    }

    // Рендеринг "Most commented" карточек
    const mostCommentedFilms = this._films
    .filter((film) => film.commentsCount > 0)
    .sort((a, b) => {
      return (b.commentsCount - a.commentsCount);
    });

    if (mostCommentedFilms.length > 0) {
      render(container, this._filmsExtraBlockMostCommentedComponent, RenderPosition.BEFOREEND);

      const mostCommentedFilmsElement = container.querySelector(`.films-list--most_commented`).querySelector(`.films-list__container`);

      renderFilms(mostCommentedFilmsElement, mostCommentedFilms.slice(0, EXTRA_FILM_CARDS_COUNT), this._onDataChange);
    }

    // Вывод сообщения об отсутствии фильмов
    if (this._films.length === 0) {
      filmsListComponent.querySelector(`.films-list__title`).remove();
      render(filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
    }
  }

  // Обработка кликов на кнопках «Add to watchlist», «Already watched», «Add to favorites»
  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  // Сортировка фильмов
  _onSortTypeChange(sortType) {
    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingCardsCount);
    const filmsListCardsContainerComponent = this._filmsListCardsContainerComponent.getElement();

    filmsListCardsContainerComponent.innerHTML = ``;

    renderFilms(filmsListCardsContainerComponent, sortedFilms, this._onDataChange);
    const newCards = renderFilms(filmsListCardsContainerComponent, sortedFilms, this._onDataChange);
    this._showedCardsControllers = newCards;
  }
}
