const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomFloat = (min, max) => {
  return min + Math.random() * (max + 1 - min);
};

export { getRandomInt, getRandomFloat };
