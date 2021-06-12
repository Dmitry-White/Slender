import SOUNDS from '../../../data/sounds';
import { getRandomInt } from '../../utils/calc';
import Game from '../Game';

import Sounds from './Sounds';

const SOUND_MAP = {
  COME_OUT: 'come_out',
  LULULALA: 'lululala',
  GHOST_SCREAM: 'ghost_scream',
};

class GameSounds extends Sounds {
  game: Game;

  mode: any;

  constructor(game: any) {
    super();
    this.game = game;
    this.mode = game.mode;
    this.state = {
      sounds: {
        [SOUND_MAP.COME_OUT]: true,
        [SOUND_MAP.LULULALA]: true,
        [SOUND_MAP.GHOST_SCREAM]: true,
      },
    };
  }

  makeSound(soundId: string, callback: Function) {
    if (this.state.sounds[soundId]) {
      this.startHandler(soundId);
      const finishHandler = callback
        ? () => callback(soundId)
        : () => this.finishHandler(soundId);
      Sounds.makeSoundV2(soundId, finishHandler);
    }
  }

  startHandler(soundId: string) {
    this.state.sounds[soundId] = false;
  }

  finishHandler(soundId: string) {
    this.state.sounds[soundId] = true;
  }

  scream() {
    this.makeSound(SOUND_MAP.GHOST_SCREAM, (soundId: string) => {
      this.game.state.gameFinished = true;
      this.state.sounds[soundId] = true;
    });
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
        break;
    }
  }

  endingComeOut() {
    this.makeSound(SOUND_MAP.COME_OUT, () => window.location.reload());
  }

  endingLulu() {
    this.makeSound(SOUND_MAP.LULULALA, () => window.location.reload());
  }
}

export default GameSounds;
