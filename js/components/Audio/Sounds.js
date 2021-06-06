import { soundManager } from 'soundmanager2';

import { precreateSounds, SM_URL, playSM, stopSM } from '../../utils/sound';

class Sounds {
  constructor(game) {
    this.game = game;
    this.sound_end = true;
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

  static makeSoundV2(soundId, finishHandler) {
    playSM(soundId, {
      multiShotEvents: true,
      onfinish: finishHandler,
    });
  }

  allSoundsEnded() {
    const soundStates = Object.values(this.state.sounds);
    const soundsEnded = soundStates.every((sound) => !!sound);
    return soundsEnded;
  }
}

export default Sounds;
