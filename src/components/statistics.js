import AbstractSmartComponent from "./abstract-smart-component.js";
import {StatisticsFilter} from "../const.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const createStatisticsTemplate = (films, filter) => {
  const watchedFilmsCount = films.getWatchedFilms(filter).length;
  const whatchedFilmsDuration = films.getWatchedFilms(filter).reduce((accumulator, film) => {
    return accumulator + film.duration;
  }, 0);
  const topGenre = watchedFilmsCount > 0 ? films.getTopGenre(filter) : ``;
  const userRating = films.getProfileRating(filter);

  const durationHours = (whatchedFilmsDuration - whatchedFilmsDuration % 60) / 60;
  const durationMinutes = whatchedFilmsDuration % 60;

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRating}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${filter === `all-time` ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${filter === `today` ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${filter === `week` ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${filter === `month` ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${filter === `year` ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${durationHours} <span class="statistic__item-description">h</span> ${durationMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._filter = StatisticsFilter.ALL_TIME;
  }

  getTemplate() {
    return createStatisticsTemplate(this._filmsModel, this._filter);
  }

  recoveryListeners() {
    this.addFilterChangeHandler();
  }

  rerender() {
    super.rerender();
    this._renderStatistics();
  }

  render() {
    this._renderStatistics();
    this.addFilterChangeHandler();
  }

  _getStatisticChartElement() {
    return this.getElement().querySelector(`.statistic__chart`);
  }

  _renderStatistics() {
    const genres = this._filmsModel.getSortedGenres(this._filter);
    const BAR_HEIGHT = 50;

    this._statisticCtx = document.querySelector(`.statistic__chart`);

    if (this._chart) {
      this._chart.destroy();
    }

    this._statisticCtx.height = BAR_HEIGHT * Object.keys(genres).length;

    this._chart = new Chart(this._statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(genres),
        datasets: [{
          data: Object.values(genres),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  addFilterChangeHandler() {
    this
      .getElement()
      .querySelectorAll(`.statistic__filters-input`)
      .forEach((element) => {
        element.addEventListener(`change`, (evt) => {
          this._filter = evt.target.value;
          this.rerender();
        });
      });
  }
}
