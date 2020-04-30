import {getRandomNumber} from "../utils/common.js";
import {getRandomIntegerNumber} from "../utils/common.js";
import {getRandomArrayItem} from "../utils/common.js";
import {getRandomArray} from "../utils/common.js";
import {generateRandomDate} from "../utils/common.js";
import {FILM_NAMES} from "../const.js";
import {FILM_POSTERS} from "../const.js";
import {FILM_GENRES} from "../const.js";
import {COUNTRYES} from "../const.js";
import {PEOPLES} from "../const.js";
import {DESCRIPTION_TEXT} from "../const.js";

const generateFilmDescription = () => {
  const FILM_DESCRIPTIONS = DESCRIPTION_TEXT.split(/[\.!\?]+/);
  const DESCRIPTION_COUNT = getRandomIntegerNumber(1, 5);
  let filmDescription = ``;

  for (let i = 1; i <= DESCRIPTION_COUNT; i++) {
    filmDescription = filmDescription + getRandomArrayItem(FILM_DESCRIPTIONS) + `. `;
  }
  return filmDescription;
};

const generateFilm = () => {
  return {
    name: getRandomArrayItem(FILM_NAMES),
    rating: getRandomNumber(0, 10),
    duration: getRandomIntegerNumber(0, 3) + `h ` + getRandomIntegerNumber(0, 60) + `m`,
    genre: getRandomArray(FILM_GENRES, getRandomIntegerNumber(1, FILM_GENRES.length)),
    poster: getRandomArrayItem(FILM_POSTERS),
    description: generateFilmDescription(),
    age: getRandomIntegerNumber(0, 18),
    director: getRandomArrayItem(PEOPLES),
    writers: getRandomArray(PEOPLES, getRandomIntegerNumber(1, PEOPLES.length)).join(`, `),
    actors: getRandomArray(PEOPLES, getRandomIntegerNumber(1, PEOPLES.length)).join(`, `),
    releaseDate: generateRandomDate(new Date(2012, 0, 1), new Date(2020, 0, 1), `01 April 1995`),
    country: getRandomArrayItem(COUNTRYES),
    isInWatchlist: getRandomIntegerNumber(0, 10),
    isInHistory: getRandomIntegerNumber(0, 10),
    isFavorit: getRandomIntegerNumber(0, 10),
    commentsCount: getRandomIntegerNumber(0, 100)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
