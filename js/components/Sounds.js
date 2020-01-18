import { precreateSounds, SM_URL, playSM } from '../utils/sound';
import SOUNDS from '../json/sounds.json';

class Sounds {
  constructor(game) {
    this.game = game;
    this.sound_end = true;
    this.ending = {
      0: SOUNDS.END.COME_OUT.id,
      1: SOUNDS.END.LULU.id
    };
    soundManager.setup({
      url: SM_URL,
      onready: () => precreateSounds()
    });
  };

  loopSound(sound_id) {
    playSM(sound_id, {
      multiShotEvents: true,
      onfinish: () => this.loopSound(sound_id)
    });
  };

  makeSound(sound_id) {
    this.sound_end = false;
    playSM(sound_id, {
      multiShotEvents: true,
      onfinish: () => {
        this.obj_sound_end = true;
        this.sound_end = true;
      }
    });
  };

  playEnding(ending_num) {
    playSM(this.ending[ending_num], {
      onfinish: () => location.reload(),
    });
  };
};

export { Sounds };
