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
  `December`,
];

const COMMENT_EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const COMMENT_TEXTS = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const COMMENT_AUTHORS = [
  `Tim Macoveev`,
  `John Doe`
];

const FILM_NAMES = [
  `The man with the golden arm`,
  `The great flamarion`,
  `The dance of life`,
  `Santa Claus conquers the martians`,
  `Sagebrush trail`,
  `Popeye meets sinbad`,
  `Made for each other`
];

const FILM_POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const FILM_GENRES = [
  `Musical`,
  `Horror`,
  `Fantasy`,
  `Historical`,
  `Action`,
  `Comedy`
];

const COUNTRYES = [
  `USA`,
  `Russia`,
  `Germany`,
  `France`,
  `Brazil`,
  `Czech`
];

const PEOPLES = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`
];

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Cras aliquet varius magna, non porta ligula feugiat eget. 
Fusce tristique felis at fermentum pharetra. 
Aliquam id orci ut lectus varius viverra. 
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
Sed sed nisi sed augue convallis suscipit in sed felis. 
Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. 
In rutrum ac purus sit amet tempus.`;

const PROFILE_RATINGS = [`novice`, `fan`, `movie buff`];
const PROFILE_RATING_VALUES = [0, 10, 20];

export {MONTHS,
  COMMENT_EMOJIS,
  COMMENT_TEXTS,
  COMMENT_AUTHORS,
  FILM_NAMES,
  FILM_POSTERS,
  FILM_GENRES,
  COUNTRYES,
  PEOPLES,
  DESCRIPTION_TEXT,
  PROFILE_RATING_VALUES,
  PROFILE_RATINGS
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export const StatisticsFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};
