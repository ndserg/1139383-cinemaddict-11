import AbstractComponent from "./abstract-component.js";

const createStatTemplate = () => {
  return (
    `<a href="#stats" class="main-navigation__additional">Stats</a>`
  );
};

export default class StatMenu extends AbstractComponent {
  getTemplate() {
    return createStatTemplate();
  }
}
