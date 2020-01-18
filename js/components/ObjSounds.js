import { Sounds } from "./Sounds.js";

import { playSM } from '../utils/sound';
import { END } from '../json/sounds.json'

class ObjSounds extends Sounds {
  constructor(game, map, mode) {
    super();
    this.game = game;
    this.map = map;
    this.mode = mode;
    this.obj_sound_end = true;
  };

  makeSound(sound_id) {
    this.obj_sound_end = false
    super.makeSound(sound_id);
  };

  playScream() {
    const { GHOST } = END;

    this.obj_sound_end = false;
    playSM(GHOST.id, {
      onfinish: () => this.game.game_ending = true
    });
  };
};

export { ObjSounds };
