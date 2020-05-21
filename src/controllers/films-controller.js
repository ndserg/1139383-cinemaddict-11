import FilmsListComponent from "../components/films-list.js";
import FilmsListCardsContainerComponent from "../components/films-list-container.js";
import CardsButtonShowMoreComponent from "../components/load-more-button.js";
import MovieController from "./movie-controller.js";
import FilmsExtraBlockComponent from "../components/films-extra.js";
import NoFilmsComponent from "../components/no-films.js";
import SortComponent, {SortType} from "../components/sort.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const EXTRA_FILM_CARDS_COUNT = 2;

//  Сортировка карточек фильмов
const renderFilms = (filmsContainerElement, films, onDataChange, onViewChange) => {

  return films.map((film) => {
    const movieController = new MovieController(filmsContainerElement, onDataChange, onViewChange);

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
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showedCardsControllers = [];
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListCardsContainerComponent = new FilmsListCardsContainerComponent();
    this._cardsButtonShowMoreComponent = new CardsButtonShowMoreComponent();
    this._filmsExtraBlockTopComponent = new FilmsExtraBlockComponent(`Top rated`);
    this._filmsExtraBlockMostCommentedComponent = new FilmsExtraBlockComponent(`Most commented`);
    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();

    this._onDataChange = this._onDataChange.bind(this);

    this._onViewChange = this._onViewChange.bind(this);

    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const films = this._filmsModel.getFilms();
    const container = this._container.getElement();
    const filmsListComponent = this._filmsListComponent.getElement();

    render(container, this._sortComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList(films.slice(0, this._showingCardsCount));


    // Вывод сообщения об отсутствии фильмов
    if (films.length === 0) {
      filmsListComponent.querySelector(`.films-list__title`).remove();
      render(filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _topRatedFilms(films) {
    const container = this._container.getElement();

    const topRatedFilms = films
      .filter((film) => film.rating > 0)
      .sort((a, b) => {
        return (b.rating - a.rating);
      });

    if (topRatedFilms.length > 0) {
      render(container, this._filmsExtraBlockTopComponent, RenderPosition.BEFOREEND);

      const topRatedFilmsElement = container.querySelector(`.films-list--top_rated`).querySelector(`.films-list__container`);

      renderFilms(topRatedFilmsElement, topRatedFilms.slice(0, EXTRA_FILM_CARDS_COUNT), this._onDataChange, this._onViewChange);
    }
  }

  _mostCommentedFilms(films) {
    const container = this._container.getElement();

    const mostCommentedFilms = films
    .filter((film) => film.commentsCount > 0)
    .sort((a, b) => {
      return (b.commentsCount - a.commentsCount);
    });

    if (mostCommentedFilms.length > 0) {
      render(container, this._filmsExtraBlockMostCommentedComponent, RenderPosition.BEFOREEND);

      const mostCommentedFilmsElement = container.querySelector(`.films-list--most_commented`).querySelector(`.films-list__container`);

      renderFilms(mostCommentedFilmsElement, mostCommentedFilms.slice(0, EXTRA_FILM_CARDS_COUNT), this._onDataChange, this._onViewChange);
    }
  }

  _removeFilms() {
    this._showedCardsControllers.forEach((cardsController) => cardsController.destroy());
    this._showedCardsControllers = [];
  }

  _renderFilmsList(films) {
    const container = this._container.getElement();
    const filmsListComponent = this._filmsListComponent.getElement();
    const filmsListCardsContainerComponent = this._filmsListCardsContainerComponent.getElement();

    // Рэндеринг блока списков и карточек фильмов
    render(filmsListComponent, this._filmsListCardsContainerComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

    const newCards = renderFilms(filmsListCardsContainerComponent, films, this._onDataChange, this._onViewChange);
    this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

    this._showingCardsCount = this._showedCardsControllers.length;

    this._renderShowMoreButton();

    this._topRatedFilms(films);
    this._mostCommentedFilms(films);
  }

  _renderShowMoreButton() {
    remove(this._cardsButtonShowMoreComponent);

    if (this._showingCardsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._cardsButtonShowMoreComponent, RenderPosition.BEFOREEND);

    this._cardsButtonShowMoreComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _updateFilms(count) {
    this._removeFilms();
    remove(this._filmsExtraBlockTopComponent);
    remove(this._filmsExtraBlockMostCommentedComponent);
    this._renderFilmsList(this._filmsModel.getFilms().slice(0, count));
  }

  _onShowMoreButtonClick() {
    const films = this._filmsModel.getFilms();

    const prevCardCount = this._showingCardsCount;
    this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevCardCount, this._showingCardsCount);
    this._renderFilmsList(sortedFilms);

    if (this._showingCardsCount >= films.length) {
      remove(this._cardsButtonShowMoreComponent);
    }
  }

  // Обработка кликов на кнопках «Add to watchlist», «Already watched», «Add to favorites»
  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilms(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedCardsControllers.forEach((it) => it.setDefaultView());
  }

  // Сортировка фильмов
  _onSortTypeChange(sortType) {
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingCardsCount);
    const filmsListCardsContainerComponent = this._filmsListCardsContainerComponent.getElement();

    filmsListCardsContainerComponent.innerHTML = ``;

    this._removeFilms();
    this._renderFilmsList(sortedFilms);
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_CARDS_COUNT_ON_START);
  }
}
