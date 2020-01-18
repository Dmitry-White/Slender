import { SONGS, playSM } from '../utils/sound';

class Noises {
  constructor() {
    this.noises_end = true;
    this.noises = {
      0: SONGS.RANDOM.GHOST,
      1: SONGS.RANDOM.JUST_HORROR,
      2: SONGS.RANDOM.WEIRD_NOISES,
      3: SONGS.RANDOM.SCARY_PIANO,
    }
  }

  playNoises(noise_num) {
    this.noises_end = false;
    playSM(this.noises[noise_num], {
      multiShotEvents: true,
      onfinish: () => this.noises_end = true
    });
  };
}

export { Noises };
