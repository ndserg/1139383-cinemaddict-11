import HeaderProfileComponent from "./components/header-profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import FilmsBlockComponent from "./components/films-block.js";
import FooterStatisticComponent from "./components/footer-statistic.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmsController from "./controllers/films-controller.js";

const FILM_CARDS_COUNT = 0;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_CARDS_COUNT);

// Счетчик фильтров
const filterCounter = {
  watchlist: films.filter((film) => film.isInWatchlist > 5).length,
  history: films.filter((film) => film.isInHistory > 5).length,
  favorite: films.filter((film) => film.isFavorit > 5).length
};

const headerProfileComponent = new HeaderProfileComponent();
const siteMenuComponent = new SiteMenuComponent(filterCounter);
const filterComponent = new FilterComponent();
const filmsBlockComponent = new FilmsBlockComponent();
const filmsController = new FilmsController(filmsBlockComponent);

render(siteHeaderElement, headerProfileComponent, RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(siteMainElement, filterComponent, RenderPosition.BEFOREEND);
render(siteMainElement, filmsBlockComponent, RenderPosition.BEFOREEND);
filmsController.render(films);

// Рендеринг Количества фильмов в базе (в футере)
render(footerStatisticElement, new FooterStatisticComponent(films.length), RenderPosition.BEFOREEND);
