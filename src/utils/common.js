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
const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


export {getRandomNumber, getRandomIntegerNumber, getRandomArrayItem, getRandomArray, generateRandomDate};
