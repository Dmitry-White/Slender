import { soundManager } from 'soundmanager2';

import { precreateSounds, SM_URL, playSM, stopSM } from '../utils/sound';
import SOUNDS from '../../data/sounds';

class Sounds {
  constructor(game) {
    this.game = game;
    this.sound_end = true;
    this.ending = {
      0: SOUNDS.END.COME_OUT.id,
      1: SOUNDS.END.LULU.id,
    };
    soundManager.setup({
      url: SM_URL,
      debugMode: false,
      preferFlash: false,
      useHighPerformance: true,
      onready: () => precreateSounds(),
    });
  }

  loopSound(soundId) {
    playSM(soundId, {
      multiShotEvents: true,
      onfinish: () => this.loopSound(soundId),
    });
  }

  static stopSound(soundId) {
    stopSM(soundId);
  }

  static muteSound(soundId) {
    soundManager.mute(soundId);
  }

  static unmuteSound(soundId) {
    soundManager.unmute(soundId);
  }

  makeSound(soundId) {
    this.sound_end = false;
    playSM(soundId, {
      multiShotEvents: true,
      onfinish: () => {
        this.obj_sound_end = true;
        this.sound_end = true;
      },
    });
  }

  static makeSoundV2(soundId, finishHandler) {
    playSM(soundId, {
      multiShotEvents: true,
      onfinish: finishHandler,
    });
  }

  playEnding(endingNum) {
    playSM(this.ending[endingNum], {
      onfinish: () => window.location.reload(),
    });
  }
}

export default Sounds;
