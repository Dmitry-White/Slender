import { playSM } from '../utils/sound';
import SOUNDS from '../json/sounds.json';

class Noises {
  constructor() {
    this.noises_end = true;
    this.noises = {
      0: SOUNDS.RANDOM.GHOST,
      1: SOUNDS.RANDOM.JUST_HORROR,
      2: SOUNDS.RANDOM.WEIRD_NOISES,
      3: SOUNDS.RANDOM.SCARY_PIANO,
    };
  }

  playNoises(noise_num) {
    this.noises_end = false;
    playSM(this.noises[noise_num], {
      multiShotEvents: true,
      onfinish: () => (this.noises_end = true),
    });
  }
}

export { Noises };
