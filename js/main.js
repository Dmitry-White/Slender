import Game from './components/Game';
import { preloadSounds } from './utils/sound';
import video from '../img/intro.mp4';
import { MenuSounds } from './components/Audio';

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

const changeGameMode = (game, menuSounds) => {
  if (checkbox.checked) {
    snowBlock.classList.add('block');

    menuSounds.winterModeSound();
    game.setToWinter();
  } else {
    snowBlock.classList.remove('block');

    game.setToVanilla();
  }
};

const initializeSlides = () => {
  setSlides(SLIDE_MAP.LEFT, true);
  setSlides(SLIDE_MAP.LEFT, false);
  setSlides(SLIDE_MAP.RIGHT, true);
  setSlides(SLIDE_MAP.RIGHT, false);
};

const init = () => {
  const game = new Game();
  const menuSounds = new MenuSounds();

  const checkboxHandler = () => {
    snowHandler();
    changeGameMode(game, menuSounds);
  };

  const gameHandler = () => {
    hideMainBlock();
    MenuSounds.disableMenuSounds();

    game.loadGame();
  };

  checkbox.addEventListener('change', checkboxHandler);
  playButton.addEventListener('click', gameHandler);

  initializeSlides();
  preloadSounds();

  menuSounds.enableMenuSounds();
  game.setToVanilla();
};

document.addEventListener('DOMContentLoaded', init);
