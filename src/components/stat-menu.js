import AbstractComponent from "./abstract-component.js";

const createStatMenuTemplate = () => {
  return (
    `<a href="#stats" class="main-navigation__additional">Stats</a>`
  );
};

export default class StatMenu extends AbstractComponent {
  getTemplate() {
    return createStatMenuTemplate();
  }

  setStatClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
