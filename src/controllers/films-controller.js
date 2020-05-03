import FilmCardComponent from "../components/film-card.js";
import FilmsListComponent from "../components/films-list.js";
import FilmsListCardsContainerComponent from "../components/films-list-container.js";
import CardsButtonShowMoreComponent from "../components/load-more-button.js";
import FilmInfoPopupComponent from "../components/film-details.js";
import FilmCommentsPopupComponent from "../components/film-comments.js";
import FilmsExtraBlockComponent from "../components/films-extra.js";
import NoFilmsComponent from "../components/no-films.js";
import {generateComments} from "../mock/comment.js";
import FilterComponent, {SortType} from "../components/filter.js";
import {render, addPopupElement, removePopupElement, remove, RenderPosition} from "../utils/render.js";

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const EXTRA_FILM_CARDS_COUNT = 2;

const comments = generateComments();
const siteBodyElement = document.querySelector(`body`);

// Рэндеринг карточек фильмов
const renderFilmCard = (filmsContainerElement, film) => {

  const removePopup = () => {
    filmInfoPopupComponent.removeElement(onButtonPopupClose);
    removePopupElement(siteBodyElement, filmInfoPopupComponent, filmPopupCommentComponent);
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
  flmCardComponent.setDetailClickHandler(() => {
    addPopupElement(siteBodyElement, filmInfoPopupComponent, filmPopupCommentComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  // Подробная информация о фильме (попап)
  const filmInfoPopupComponent = new FilmInfoPopupComponent(film);

  // Комментарии к фильму (попап)
  const filmPopupCommentComponent = new FilmCommentsPopupComponent(comments);

  filmInfoPopupComponent.setPopupButtonCloseHandler(onButtonPopupClose);
  render(filmsContainerElement, flmCardComponent, RenderPosition.BEFOREEND);
};

//  Сортировка карточек фильмов
const renderFilms = (filmsContainerElement, films) => {
  films.forEach((film) => {
    renderFilmCard(filmsContainerElement, film);
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

    this._filmsListComponent = new FilmsListComponent();
    this._filmsListCardsContainerComponent = new FilmsListCardsContainerComponent();
    this._cardsButtonShowMoreComponent = new CardsButtonShowMoreComponent();
    this._filmsExtraBlockTopComponent = new FilmsExtraBlockComponent(`Top rated`);
    this._filmsExtraBlockMostCommentedComponent = new FilmsExtraBlockComponent(`Most commented`);
    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();
  }

  render(films) {
    const container = this._container.getElement();
    const filmsListComponent = this._filmsListComponent.getElement();
    const filmsListCardsContainerComponent = this._filmsListCardsContainerComponent.getElement();

    const renderFilmsList = () => {
      // Рэндеринг блока списков и карточек фильмов
      render(filmsListComponent, this._filmsListCardsContainerComponent, RenderPosition.BEFOREEND);
      render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

      let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

      // Показ карточек по кнопке "Show more"
      if (showingCardsCount >= films.length) {
        return;
      }

      render(container, this._cardsButtonShowMoreComponent, RenderPosition.BEFOREEND);

      this._cardsButtonShowMoreComponent.setClickHandler(() => {
        const prevCardCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._filterComponent.getSortType(), prevCardCount, showingCardsCount);

        renderFilms(filmsListCardsContainerComponent, sortedFilms);

        if (showingCardsCount >= films.length) {
          remove(this._cardsButtonShowMoreComponent);
        }
      });

      renderFilms(filmsListCardsContainerComponent, films.slice(0, showingCardsCount));

      this._filterComponent.setSortTypeChangeHandler((sortType) => {
        const sortedTasks = getSortedFilms(films, sortType, 0, showingCardsCount);

        filmsListCardsContainerComponent.innerHTML = ``;

        renderFilms(filmsListCardsContainerComponent, sortedTasks);

      });
    };

    render(container, this._filterComponent, RenderPosition.BEFOREEND);
    renderFilmsList();

    // Рендеринг "Top Rated" карточек
    const topRatedFilms = films
      .filter((film) => film.rating > 0)
      .sort((a, b) => {
        return (b.rating - a.rating);
      });

    if (topRatedFilms.length > 0) {
      render(container, this._filmsExtraBlockTopComponent, RenderPosition.BEFOREEND);

      const topRatedFilmsElement = container.querySelector(`.films-list--top_rated`).querySelector(`.films-list__container`);

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
      render(container, this._filmsExtraBlockMostCommentedComponent, RenderPosition.BEFOREEND);

      const mostCommentedFilmsElement = container.querySelector(`.films-list--most_commented`).querySelector(`.films-list__container`);

      mostCommentedFilms.slice(0, EXTRA_FILM_CARDS_COUNT)
      .forEach((film) => {
        renderFilmCard(mostCommentedFilmsElement, film);
      });
    }

    // Вывод сообщения об отсутствии фильмов
    if (films.length === 0) {
      filmsListComponent.querySelector(`.films-list__title`).remove();
      render(filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
    }
  }
}
