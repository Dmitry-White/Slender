import SOUNDS from '../../../data/sounds';

import { getRandomInt } from '../../utils/calc';

import Sounds from './Sounds';

const SOUND_MAP = {
  COME_OUT: 'come_out',
  LULULALA: 'lululala',
  GHOST_SCREAM: 'ghost_scream',
};

class GameSounds extends Sounds {
  constructor(game, mode) {
    super();
    this.game = game;
    this.mode = mode;
    this.state = {
      sounds: {
        [SOUND_MAP.COME_OUT]: true,
        [SOUND_MAP.LULULALA]: true,
        [SOUND_MAP.GHOST_SCREAM]: true,
      },
    };
  }

  makeSound(soundId) {
    if (this.state.sounds[soundId]) {
      this.startHandler(soundId);
      Sounds.makeSoundV2(soundId, () => this.finishHandler(soundId));
    }
  }

  startHandler(soundId) {
    this.state.sounds[soundId] = false;
  }

  finishHandler(soundId) {
    this.game.game_ending = true;
    this.state.sounds[soundId] = true;
  }

  scream() {
    this.makeSound(SOUND_MAP.GHOST_SCREAM);
  }

  ambient() {
    switch (this.mode.winter) {
      case true:
        this.ambientWinter();
        break;
      default:
        this.ambientRain();
        break;
    }
  }

  ambientWinter() {
    this.loopSound(SOUNDS.WINTER.WIND.id);
  }

  ambientRain() {
    this.loopSound(SOUNDS.VANILLA.RAIN.id);
  }

  ending() {
    const endingSong = getRandomInt(0, 2);
    switch (endingSong) {
      case 0:
        this.endingComeOut();
        break;
      case 1:
        this.endingLulu();
        break;
      default:
        this.endingComeOut();
        break;
    }
  }

  endingComeOut() {
    this.makeSound(SOUND_MAP.COME_OUT);
  }

  endingLulu() {
    this.makeSound(SOUND_MAP.LULULALA);
  }
}

export default GameSounds;
