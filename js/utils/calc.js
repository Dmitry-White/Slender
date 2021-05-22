const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
};

const getRandomFloat = (min, max) => {
  return min + Math.random() * (max + 1 - min);
};

export { getRandomInt, getRandomFloat };
