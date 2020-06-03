import API from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import HeaderProfileComponent from "./components/header-profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import StatComponent from "./components/stat-menu.js";
import StatisticsComponent from "./components/statistics.js";
import FilterController from "./controllers/filter-controller.js";
import FilmsBlockComponent from "./components/films-block.js";
import FooterStatisticComponent from "./components/footer-statistic.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmsController from "./controllers/films-controller.js";
import FilmsModel from "./models/films-model.js";
import {AUTHORIZATION, END_POINT} from "./const.js";

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticElement = document.querySelector(`.footer__statistics`);

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();

const siteMenuComponent = new SiteMenuComponent();
const statComponent = new StatComponent();
const filmsBlockComponent = new FilmsBlockComponent();
const filmsController = new FilmsController(filmsBlockComponent, filmsModel, apiWithProvider);

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

apiWithProvider.getFilms()
.then((films) => renderAfterLoad(films))
.catch(() => renderAfterLoad([])
);

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
