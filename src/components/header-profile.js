// Шаблон Звания пользователя
import AbstractComponent from "./abstract-component.js";

const createHeaderProfileTemplate = (films) => {
  const profileRating = films.getProfileRating();

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class HeaderProfile extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._filmsModel);
  }
}
