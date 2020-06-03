export default class CommentsModel {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
  }

  static parseComments(commentsData) {
    const parsedComments = commentsData.map((comment) => {
      return {
        id: comment[`id`],
        author: comment[`author`],
        comment: comment[`comment`],
        date: new Date(comment[`date`]),
        emotion: comment[`emotion`],
      };
    });
    return parsedComments;
  }

  static commentToRaw(comment) {
    return {
      "comment": comment.comment,
      "date": comment.date.toISOString(),
      "emotion": comment.emotion
    };
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(comment) {
    this._comments = [].concat(this._comments, comment);
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
