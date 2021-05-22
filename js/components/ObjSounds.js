import { playSM } from '../utils/sound';
import { END } from '../json/sounds.json';

import Sounds from './Sounds';

class ObjSounds extends Sounds {
  constructor(game, map, mode) {
    super();
    this.game = game;
    this.map = map;
    this.mode = mode;
    this.obj_sound_end = true;
  }

  makeSound(soundId) {
    this.obj_sound_end = false;
    super.makeSound(soundId);
  }

  playScream() {
    const { GHOST } = END;

    this.obj_sound_end = false;
    playSM(GHOST.id, {
      onfinish: () => {
        this.game.game_ending = true;
      },
    });
  }
}

export default ObjSounds;
