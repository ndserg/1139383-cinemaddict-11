// Шаблон блока "Top rated" и "Most commented" карточек фильмов
export const createFilmsExtraBlockTemplate = (blockName) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${blockName}</h2>
      <div class="films-list__container">
    </section>`
  );
};
