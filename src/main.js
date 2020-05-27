import API from "./api.js";
import HeaderProfileComponent from "./components/header-profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import StatComponent from "./components/stat.js";
import StatisticsComponent from "./components/statistics.js";
import FilterController from "./controllers/filter.js";
import FilmsBlockComponent from "./components/films-block.js";
import FooterStatisticComponent from "./components/footer-statistic.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmsController from "./controllers/films-controller.js";
import FilmsModel from "./models/films.js";
import {AUTHORIZATION, END_POINT} from "./const.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticElement = document.querySelector(`.footer__statistics`);

const api = new API(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();

const siteMenuComponent = new SiteMenuComponent();
const statComponent = new StatComponent();
const filmsBlockComponent = new FilmsBlockComponent();
const filmsController = new FilmsController(filmsBlockComponent, filmsModel, api);

render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(siteMainElement, filmsBlockComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMenuComponent.getElement(), filmsModel);
filterController.render();

render(siteMenuComponent.getElement(), statComponent, RenderPosition.BEFOREEND);

const renderAfterLoad = (response) => {
  filmsModel.setFilms(response);
  filmsController.render();

  const headerProfileComponent = new HeaderProfileComponent(filmsModel);
  const statisticsComponent = new StatisticsComponent(filmsModel);
  const footerStatisticComponent = new FooterStatisticComponent(filmsModel);

  render(siteHeaderElement, headerProfileComponent, RenderPosition.BEFOREEND);
  render(footerStatisticElement, footerStatisticComponent, RenderPosition.BEFOREEND);
  render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

  let statisticsComponentShowed = false;
  statisticsComponent.hide();

  statComponent.setStatClickHandler(() => {
    if (statisticsComponentShowed) {
      statisticsComponent.hide();
      filmsController.show();
      statisticsComponentShowed = false;
    } else {
      statisticsComponent.show();
      filmsController.hide();
      statisticsComponent.render();
      statisticsComponentShowed = true;
    }
  });
};

api.getFilms()
.then((films) => renderAfterLoad(films))
.catch(() => renderAfterLoad([])
);
