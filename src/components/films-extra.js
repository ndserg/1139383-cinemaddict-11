// Шаблон блока "Top rated" и "Most commented" карточек фильмов
export const createFilmsExtraBlockTemplate = (blockName) => {

  const getTopClass = (name) => {
    switch (name) {

      case `Top rated`:
        return `films-list--top_rated`;

      case `Most commented`:
        return `films-list--most_commented`;

      default:
        return ``;
    }
  };

  const topClass = getTopClass(blockName);

  return (
    `<section class="films-list--extra ${topClass}">
      <h2 class="films-list__title">${blockName}</h2>
      <div class="films-list__container">
    </section>`
  );
};
