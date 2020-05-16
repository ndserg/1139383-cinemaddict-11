import HeaderProfileComponent from "./components/header-profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import StatComponent from "./components/stat.js";
import FilterController from "./controllers/filter.js";
import FilmsBlockComponent from "./components/films-block.js";
import FooterStatisticComponent from "./components/footer-statistic.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmsController from "./controllers/films-controller.js";
import FilmsModel from "./models/films.js";

const FILM_CARDS_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_CARDS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const headerProfileComponent = new HeaderProfileComponent();
const siteMenuComponent = new SiteMenuComponent();
const statComponent = new StatComponent();
const filmsBlockComponent = new FilmsBlockComponent();
const filmsController = new FilmsController(filmsBlockComponent, filmsModel);

render(siteHeaderElement, headerProfileComponent, RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(siteMainElement, filmsBlockComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMenuComponent.getElement(), filmsModel);
filterController.render();

render(siteMenuComponent.getElement(), statComponent, RenderPosition.BEFOREEND);

filmsController.render(films);

// Рендеринг Количества фильмов в базе (в футере)
render(footerStatisticElement, new FooterStatisticComponent(films.length), RenderPosition.BEFOREEND);
