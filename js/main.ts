import video from '../img/intro.mp4';

import Game from './components/Game';
import { MenuSounds } from './components/Audio';
import { preloadSounds } from './utils/sound';

import { SLIDE_MAP, SlideConfig } from './main.interface';

const SLIDE_CONFIG: SlideConfig = {
  [SLIDE_MAP.LEFT]: {
    title: document.querySelector(`.slider-${SLIDE_MAP.LEFT} .slider-title`),
    data: document.querySelector(`.slider-${SLIDE_MAP.LEFT} .slider-data`),
  },
  [SLIDE_MAP.RIGHT]: {
    title: document.querySelector(`.slider-${SLIDE_MAP.RIGHT} .slider-title`),
    data: document.querySelector(`.slider-${SLIDE_MAP.RIGHT} .slider-data`),
  },
};

const snowBlock: HTMLDivElement = document.querySelector('.snow');
const checkbox: HTMLInputElement = document.querySelector('#checkbox');
const playButton: HTMLDivElement = document.querySelector('#play');
const mainBlock: HTMLDivElement = document.querySelector('.menu');

const hideMainBlock = (): void => {
  mainBlock.classList.add('fadeOut');

  setTimeout((): void => mainBlock.classList.add('none'), 700);
};

const snowHandler = (): void => {
  if (snowBlock.style.display === 'block') snowBlock.style.display = 'none';
  else snowBlock.style.display = 'block';
};

const setSlides = (side: SLIDE_MAP, isHovered: boolean): void => {
  const value = isHovered ? '50px' : 'calc(-40vw - 70px)';
  const direction = isHovered ? 'over' : 'out';

  const mouseMoveHandler = (): void => {
    SLIDE_CONFIG[side].data.style[side] = value;
  };

  SLIDE_CONFIG[side].title.addEventListener(
    `mouse${direction}`,
    mouseMoveHandler,
  );
};

const changeGameMode = (game: any, menuSounds: any): void => {
  if (checkbox.checked) {
    snowBlock.classList.add('block');

    menuSounds.winterModeSound();
    game.setToWinter();
  } else {
    snowBlock.classList.remove('block');

    game.setToVanilla();
  }
};

const initializeSlides = (): void => {
  setSlides(SLIDE_MAP.LEFT, true);
  setSlides(SLIDE_MAP.LEFT, false);
  setSlides(SLIDE_MAP.RIGHT, true);
  setSlides(SLIDE_MAP.RIGHT, false);
};

const init = (): void => {
  const game = new Game();
  const menuSounds = new MenuSounds();

  const checkboxHandler = (): void => {
    snowHandler();
    changeGameMode(game, menuSounds);
  };

  const gameHandler = (): void => {
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
