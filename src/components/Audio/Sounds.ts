import { soundManager } from 'soundmanager2';

import { precreateSounds, SM_URL, playSM, stopSM } from '../../utils/sound';

class Sounds {
  state: any;

  constructor() {
    this.state = {
      sounds: {},
    };
    soundManager.setup({
      url: SM_URL,
      debugMode: false,
      preferFlash: false,
      useHighPerformance: true,
      onready: () => precreateSounds(),
    });
  }

  loopSound(soundId: string) {
    playSM(soundId, {
      multiShotEvents: true,
      onfinish: () => this.loopSound(soundId),
    });
  }

  static stopSound(soundId: string) {
    stopSM(soundId);
  }

  static muteSound(soundId: string) {
    soundManager.mute(soundId);
  }

  static unmuteSound(soundId: string) {
    soundManager.unmute(soundId);
  }

  static makeSoundV2(soundId: string, finishHandler: Function) {
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
