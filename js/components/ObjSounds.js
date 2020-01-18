import { Sounds } from "./Sounds.js";
import { playSM } from '../utils/sound';

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
    this.obj_sound_end = false;
    playSM("ghost_scream", {
      onfinish: () => this.game.game_ending = true
    });
  };
};

export { ObjSounds };
