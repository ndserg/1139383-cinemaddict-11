import {getFilmsByFilter} from "../utils/filter.js";
import {PROFILE_RATING_VALUES, PROFILE_RATINGS, FilterType, StatisticsFilter} from "../const.js";

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getWatchedFilms(period) {
    let watchedFilms = getFilmsByFilter(this._films, FilterType.WATCHLIST);

    if (period === StatisticsFilter.ALL_TIME) {
      return watchedFilms;
    }

    const date = new Date();

    switch (period) {
      case StatisticsFilter.YEAR:
        date.setFullYear(date.getFullYear() - 1);
        break;
      case StatisticsFilter.MONTH:
        date.setMonth(date.getMonth() - 1);
        break;
      case StatisticsFilter.WEEK:
        date.setDate(date.getDate() - 7);
        break;
      case StatisticsFilter.TODAY:
        date.setDate(date.getDate() - 1);
        break;
      default:
        return watchedFilms;
    }

    return watchedFilms.filter((item) => {
      return item.whatchingDate > date;
    });
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateFilms(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  getGenreStatistics(filter) {
    let genres = {};

    this.getWatchedFilms(filter).forEach((film) => {
      Array.from(new Set(film.genre)).forEach((genre) => {
        genres[genre] = genres[genre] === undefined
          ? 1
          : genres[genre] + 1;
      });
    });

    return genres;
  }

  getSortedGenres(filter) {
    const genres = this.getGenreStatistics(filter);

    let sortable = [];

    for (let key in genres) {
      if (Object.prototype.hasOwnProperty.call(genres, key)) {
        sortable.push([key, genres[key]]);
      }
    }

    sortable.sort(function (a, b) {
      if (a[1] > b[1]) {
        return -1;
      } else {
        if (a[1] > b[1]) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    let orderedList = {};
    for (let idx in sortable) {
      if (Object.prototype.hasOwnProperty.call(sortable, idx)) {
        orderedList[sortable[idx][0]] = sortable[idx][1];
      }
    }

    return orderedList;
  }

  getTopGenre(filter) {
    return Object.keys(this.getSortedGenres(filter))[0];
  }

  getProfileRating(filter) {
    const watchedFilmsCount = this.getWatchedFilms(filter).length;

    switch (watchedFilmsCount) {

      case (watchedFilmsCount !== 0) && (watchedFilmsCount <= PROFILE_RATING_VALUES[1]) ? watchedFilmsCount : true:
        return PROFILE_RATINGS[0];

      case (watchedFilmsCount > PROFILE_RATING_VALUES[1]) && (watchedFilmsCount <= PROFILE_RATING_VALUES[2]) ? watchedFilmsCount : true:
        return PROFILE_RATINGS[1];

      case watchedFilmsCount > PROFILE_RATING_VALUES[2] ? watchedFilmsCount : true:
        return PROFILE_RATINGS[2];

      default:
        return ``;
    }
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
