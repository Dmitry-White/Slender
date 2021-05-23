import { soundManager } from 'soundmanager2';

import Game from './components/Game';
import * as _ from './script';

const snowBlock = document.querySelector('.snow');
const checkbox = document.querySelector('#checkbox');
const playButton = document.querySelector('#play');
const mainBlock = document.querySelector('.menu');

const hideMainBlock = () => {
  mainBlock.classList.add('fadeOut');

  setTimeout(() => mainBlock.classList.add('none'), 700);
};

const init = () => {
  const game = new Game();

  Game.loadSounds();
  game.enableMenuSounds();
  game.setToVanilla();

  const changeGameMode = () => {
    if (checkbox.checked) {
      snowBlock.classList.add('block');

      game.sounds.makeSound('ho_ho_ho');
      game.setToWinter();
    } else {
      snowBlock.classList.remove('block');

      game.setToVanilla();
    }
  };

  const stopMenuSounds = () => {
    soundManager.stopAll();
    game.sounds.sound_end = true;
  };

  const initializeGame = () => {
    stopMenuSounds();

    hideMainBlock();

    game.loadGame();
  };

  checkbox.addEventListener('change', changeGameMode);
  playButton.addEventListener('click', initializeGame);
};

document.addEventListener('DOMContentLoaded', init);
