const PROFILE_RATINGS = [`Novice`, `Fan`, `Movie Buff`];
const PROFILE_RATING_VALUES = [0, 10, 20];

const HIDDEN_CLASS = `visually-hidden`;

const ITEM_ACTIVE_CLASS = `film-card__controls-item--active`;

const AUTHORIZATION = `Basic sghjtyuyk6197457DSDSFfdfs`;

const DESCRIPTION_LENGTH = 139;

const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const EXTRA_FILM_CARDS_COUNT = 2;

const SHAKE_ANIMATION_TIMEOUT = 600;
const siteBodyElement = document.querySelector(`body`);

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const COMMENT_EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const DefaultButtonText = {
  deleteText: `Delete`
};

const ResponseCode = {
  SUCCESS: 200,
  REDIRECT: 300
};

const Mode = {
  DEFAULT: `default`,
  OPEN_POPUP: `openPopup`
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};

const SortType = {
  DATE: `date`,
  RATING: `raiting`,
  DEFAULT: `default`
};

const StatisticsFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export {
  ResponseCode,
  DESCRIPTION_LENGTH,
  Method,
  RenderPosition,
  Mode,
  SHAKE_ANIMATION_TIMEOUT,
  siteBodyElement,
  SHOWING_CARDS_COUNT_ON_START,
  SHOWING_CARDS_COUNT_BY_BUTTON,
  EXTRA_FILM_CARDS_COUNT,
  HIDDEN_CLASS,
  ITEM_ACTIVE_CLASS,
  DefaultButtonText,
  MONTHS,
  COMMENT_EMOJIS,
  PROFILE_RATING_VALUES,
  PROFILE_RATINGS,
  FilterType,
  SortType,
  StatisticsFilter,
  AUTHORIZATION,
  END_POINT
};
