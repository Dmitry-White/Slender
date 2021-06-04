import { playSM } from '../utils/sound';
import SOUNDS from '../../data/sounds.json';

import Sounds from './Sounds';

class ObjectSounds extends Sounds {
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
    const { GHOST } = SOUNDS.END;

    this.obj_sound_end = false;
    playSM(GHOST.id, {
      onfinish: () => {
        this.game.game_ending = true;
      },
    });
  }
}

export default ObjectSounds;
