import {getRandomArrayItem} from "../utils.js";
import {generateRandomDate} from "../utils.js";
import {getRandomIntegerNumber} from "../utils.js";
import {COMMENT_EMOJIS} from "../const.js";
import {COMMENT_TEXTS} from "../const.js";
import {COMMENT_AUTHORS} from "../const.js";

const COMMENTS_COUNT = getRandomIntegerNumber(0, 20);

const generateComment = () => {
  return {
    emoji: getRandomArrayItem(COMMENT_EMOJIS),
    text: getRandomArrayItem(COMMENT_TEXTS),
    author: getRandomArrayItem(COMMENT_AUTHORS),
    date: generateRandomDate(new Date(2012, 0, 1), new Date(2020, 0, 1), `2019/12/31 23:59`)
  };
};

const generateComments = () => {
  return new Array(COMMENTS_COUNT)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
