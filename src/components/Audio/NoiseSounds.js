import { getRandomInt } from '../../utils/calc';

import Sounds from './Sounds';

const SOUND_MAP = {
  GHOST: 'ghost_in_the_house',
  JUST_HORROR: 'just_horror_ambient',
  WEIRD_NOISES: 'weird_noises',
  SCARY_PIANO: 'scary_piano',
};

class NoiseSounds extends Sounds {
  constructor() {
    super();
    this.state = {
      sounds: {
        [SOUND_MAP.GHOST]: true,
        [SOUND_MAP.JUST_HORROR]: true,
        [SOUND_MAP.WEIRD_NOISES]: true,
        [SOUND_MAP.SCARY_PIANO]: true,
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
    this.state.sounds[soundId] = true;
  }

  noise() {
    const noiseSong = getRandomInt(0, 4);
    switch (noiseSong) {
      case 0:
        this.noiseGhost();
        break;
      case 1:
        this.noiseHorror();
        break;
      case 2:
        this.noiseWeird();
        break;
      case 3:
        this.noisePiano();
        break;
      default:
        break;
    }
  }

  noiseGhost() {
    this.makeSound(SOUND_MAP.GHOST);
  }

  noiseHorror() {
    this.makeSound(SOUND_MAP.JUST_HORROR);
  }

  noiseWeird() {
    this.makeSound(SOUND_MAP.WEIRD_NOISES);
  }

  noisePiano() {
    this.makeSound(SOUND_MAP.SCARY_PIANO);
  }
}

export default NoiseSounds;
