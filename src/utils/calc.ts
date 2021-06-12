const CIRCLE = Math.PI * 2;

const getRandomInt = (min: number, max: number): number => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
};

const getRandomFloat = (min: number, max: number): number => {
  return min + Math.random() * (max + 1 - min);
};

export { CIRCLE, getRandomInt, getRandomFloat };
