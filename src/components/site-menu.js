import AbstractComponent from "./abstract-component.js";

// Шаблон Меню
const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">

    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
