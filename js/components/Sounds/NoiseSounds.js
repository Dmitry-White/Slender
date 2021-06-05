import SOUNDS from '../../../data/sounds.json';

import { playSM } from '../../utils/sound';

class NoiseSounds {
  constructor() {
    this.noisesEnd = true;
    this.noises = {
      0: SOUNDS.RANDOM.GHOST,
      1: SOUNDS.RANDOM.JUST_HORROR,
      2: SOUNDS.RANDOM.WEIRD_NOISES,
      3: SOUNDS.RANDOM.SCARY_PIANO,
    };
  }

  playNoises(noiseNum) {
    this.noisesEnd = false;
    playSM(this.noises[noiseNum], {
      multiShotEvents: true,
      onfinish: () => {
        this.noisesEnd = true;
      },
    });
  }
}

export default NoiseSounds;
