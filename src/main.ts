import video from '../img/intro.mp4';

import { MenuSounds } from './components/Audio';
import Game from './components/Game';
import { SlideMap, SlideConfig } from './main.interface';
import { preloadSounds } from './utils/sound';

const SLIDE_CONFIG: SlideConfig = {
  [SlideMap.LEFT]: {
    title: document.querySelector(`.slider-${SlideMap.LEFT} .slider-title`),
    data: document.querySelector(`.slider-${SlideMap.LEFT} .slider-data`),
  },
  [SlideMap.RIGHT]: {
    title: document.querySelector(`.slider-${SlideMap.RIGHT} .slider-title`),
    data: document.querySelector(`.slider-${SlideMap.RIGHT} .slider-data`),
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

const setSlides = (side: SlideMap, isHovered: boolean): void => {
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
  setSlides(SlideMap.LEFT, true);
  setSlides(SlideMap.LEFT, false);
  setSlides(SlideMap.RIGHT, true);
  setSlides(SlideMap.RIGHT, false);
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
