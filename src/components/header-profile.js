// Шаблон Звания пользователя
import {getRandomIntegerNumber} from "../utils.js";

export const createHeaderProfileTemplate = () => {
  const profileRatings = [`novice`, `fan`, `movie buff`];
  const profileRatingCounter = getRandomIntegerNumber(0, 30);
  let profileRating = 0;

  switch (true) {
    case (profileRatingCounter === 0):
      profileRating = ``;
      break;

    case (profileRatingCounter < 11):
      profileRating = profileRatings[0];
      break;

    case (profileRatingCounter < 21):
      profileRating = profileRatings[1];
      break;

    case (profileRatingCounter > 20):
      profileRating = profileRatings[2];
      break;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
