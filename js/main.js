import { soundManager } from 'soundmanager2';

import Game from './components/Game';
import { preloadSounds } from './utils/sound';
import video from '../img/intro.mp4';

const SLIDE_MAP = {
  LEFT: 'left',
  RIGHT: 'right',
};

const SLIDE_CONFIG = {
  [SLIDE_MAP.LEFT]: {
    title: document.querySelector(`.slider-${SLIDE_MAP.LEFT} .slider-title`),
    data: document.querySelector(`.slider-${SLIDE_MAP.LEFT} .slider-data`),
  },
  [SLIDE_MAP.RIGHT]: {
    title: document.querySelector(`.slider-${SLIDE_MAP.RIGHT} .slider-title`),
    data: document.querySelector(`.slider-${SLIDE_MAP.RIGHT} .slider-data`),
  },
};

const snowBlock = document.querySelector('.snow');
const checkbox = document.querySelector('#checkbox');
const playButton = document.querySelector('#play');
const mainBlock = document.querySelector('.menu');

const hideMainBlock = () => {
  mainBlock.classList.add('fadeOut');

  setTimeout(() => mainBlock.classList.add('none'), 700);
};

const snowHandler = () => {
  if (snowBlock.style.display === 'block') snowBlock.style.display = 'none';
  else snowBlock.style.display = 'block';
};

const setSlides = (side, isHovered) => {
  const value = isHovered ? '50px' : 'calc(-40vw - 70px)';
  const direction = isHovered ? 'over' : 'out';

  const mouseMoveHandler = () => {
    SLIDE_CONFIG[side].data.style[side] = value;
  };

  SLIDE_CONFIG[side].title.addEventListener(
    `mouse${direction}`,
    mouseMoveHandler,
  );
};

const changeGameMode = (game) => {
  if (checkbox.checked) {
    snowBlock.classList.add('block');

    game.sounds.makeSound('ho_ho_ho');
    game.setToWinter();
  } else {
    snowBlock.classList.remove('block');

    game.setToVanilla();
  }
};

const stopMenuSounds = (game) => {
  soundManager.stopAll();
  game.disableMenuSounds();
};

const initializeSlides = () => {
  setSlides(SLIDE_MAP.LEFT, true);
  setSlides(SLIDE_MAP.LEFT, false);
  setSlides(SLIDE_MAP.RIGHT, true);
  setSlides(SLIDE_MAP.RIGHT, false);
};

const init = () => {
  const game = new Game();

  const checkboxHandler = () => {
    snowHandler();
    changeGameMode(game);
  };

  const gameHandler = () => {
    hideMainBlock();
    stopMenuSounds(game);

    game.loadGame();
  };

  checkbox.addEventListener('change', checkboxHandler);
  playButton.addEventListener('click', gameHandler);

  initializeSlides();
  preloadSounds();

  game.enableMenuSounds();
  game.setToVanilla();
};

document.addEventListener('DOMContentLoaded', init);
