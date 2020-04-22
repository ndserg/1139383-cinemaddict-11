// Шаблон Звания пользователя
import {createElement, getRandomIntegerNumber} from "../utils.js";
import {PROFILE_RATING_VALUES} from "../const.js";

const createHeaderProfileTemplate = () => {
  const profileRatings = [`novice`, `fan`, `movie buff`];
  const profileRatingCounter = getRandomIntegerNumber(0, 30);

  const getProfileRating = (rating) => {
    switch (rating) {

      case (rating !== 0) && (rating <= PROFILE_RATING_VALUES[1]) ? rating : true:
        return profileRatings[0];

      case (rating > PROFILE_RATING_VALUES[1]) && (rating <= PROFILE_RATING_VALUES[2]) ? rating : true:
        return profileRatings[1];

      case rating > PROFILE_RATING_VALUES[2] ? rating : true:
        return profileRatings[2];

      default:
        return ``;
    }
  };

  const profileRating = getProfileRating(profileRatingCounter);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class HeaderProfile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderProfileTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
