import {MONTHS} from "../const.js";

// Генератор случайного числа
const getRandomNumber = (min, max) => {
  return (min + (Math.random() * (max - min))).toFixed(1);
};

// Генератор случайного целого числа
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Генератор случайного элемента массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// Генератор случайного массива
const getRandomArray = (array, count) => {
  const randomArrayElements = [];

  while (count) {
    randomArrayElements.push(getRandomArrayItem(array));
    count--;
  }
  return randomArrayElements;
};

// Генератор случайной даты
const generateRandomDate = (start, end, format) => {
  const commentDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  switch (format) {
    case `2019/12/31 23:59`:
      return commentDate.getFullYear() + `/` + commentDate.getMonth() + `/` + commentDate.getDate() + ` ` + commentDate.getHours() + `:` + commentDate.getMinutes();
    case `01 April 1995`:
      return commentDate.getDate() + ` ` + `${MONTHS[commentDate.getMonth()]}` + ` ` + commentDate.getFullYear();
    default:
      return `empty date`;
  }
};

export {getRandomNumber, getRandomIntegerNumber, getRandomArrayItem, getRandomArray, generateRandomDate};
