import { preloadSounds, SM_URL, SONGS, playSM } from '../utils/sound';

class Sounds {
  constructor(game) {
    this.game = game;
    this.sound_end = true;
    this.ending = {
      0: SONGS.END.COME_OUT.id,
      1: SONGS.END.LULU.id
    };
    soundManager.setup({
      url: SM_URL,
      onready: () => preloadSounds()
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
