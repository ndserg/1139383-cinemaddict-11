// Шаблон блока "Top rated" и "Most commented" карточек фильмов
export const createFilmsExtraBlockTemplate = (blockName) => {
  let topClass = ``;

  switch (true) {
    case (blockName === `Top rated`):
      topClass = `films-list--top_rated`;
      break;

    case (blockName === `Most commented`):
      topClass = `films-list--most_commented`;
      break;
    default:
      topClass = ``;
      break;
  }

  return (
    `<section class="films-list--extra ${topClass}">
      <h2 class="films-list__title">${blockName}</h2>
      <div class="films-list__container">
    </section>`
  );
};
