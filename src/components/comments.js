import AbstractComponent from "./abstract-component.js";
import {DefaultData} from "../const.js";
import moment from "moment";

const createCommentTemplate = (comments, externalData) => {
  const {emotion, comment, author, date} = comments;
  const commentDate = moment(date).format(`YYYY/MM/DD HH:mm`);
  const deleteButtonText = externalData.deleteButtonText;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">${deleteButtonText}</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
    this._externalData = DefaultData;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, this._externalData);
  }

  getDeleteButton() {
    return this.getElement().querySelector(`.film-details__comment-delete`);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
  }

  setDeleteCommentHandler(handler) {
    this.getDeleteButton().addEventListener(`click`, handler);
  }
}
