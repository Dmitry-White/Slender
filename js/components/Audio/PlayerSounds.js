import Sounds from './Sounds';

const SOUND_MAP = {
  BACKWARD_STEP: 'backward_step',
  DODGE_STEP_0: 'dodge_step_0',
  DODGE_STEP_1: 'dodge_step_1',
  FORWARD_STEP: 'forward_step',
  HITTING_THE_FENCE: 'hitting_the_fence',
  HITTING_THE_RAIN_FENCE: 'hitting_the_rain_fence',
  HITTING_THE_WALL: 'hitting_the_wall',
  KILLING: 'killing',
  RAIN_BACKWARD_STEP: 'rain_backward_step',
  RAIN_DODGE_STEP_0: 'rain_dodge_step_0',
  RAIN_DODGE_STEP_1: 'rain_dodge_step_1',
  RAIN_FORWARD_STEP: 'rain_forward_step',
  RAIN_RUNNING: 'rain_running',
  RAIN_STEP: 'rain_step',
  RUNNING: 'running',
  SLASHING: 'slashing',
};

class PlayerSounds extends Sounds {
  constructor(mode, player) {
    super();
    this.mode = mode;
    this.player = player;
    this.state = {
      sounds: {
        [SOUND_MAP.SLASHING]: true,
        [SOUND_MAP.KILLING]: true,
        [SOUND_MAP.RUNNING]: true,
        [SOUND_MAP.RAIN_RUNNING]: true,
        [SOUND_MAP.FORWARD_STEP]: true,
        [SOUND_MAP.BACKWARD_STEP]: true,
        [SOUND_MAP.RAIN_FORWARD_STEP]: true,
        [SOUND_MAP.RAIN_BACKWARD_STEP]: true,
        [SOUND_MAP.RAIN_STEP]: true,
        [SOUND_MAP.DODGE_STEP_0]: true,
        [SOUND_MAP.DODGE_STEP_1]: true,
        [SOUND_MAP.RAIN_DODGE_STEP_0]: true,
        [SOUND_MAP.RAIN_DODGE_STEP_1]: true,
        [SOUND_MAP.HITTING_THE_FENCE]: true,
        [SOUND_MAP.HITTING_THE_WALL]: true,
        [SOUND_MAP.HITTING_THE_RAIN_FENCE]: true,
      },
    };
  }

  makeSound(soundId) {
    if (this.state.sounds[soundId]) {
      this.startHandler(soundId);
      Sounds.makeSoundV2(soundId, () => this.finishHandler(soundId));
    }
  }

  startHandler(soundId) {
    this.state.sounds[soundId] = false;
  }

  finishHandler(soundId) {
    this.state.sounds[soundId] = true;
  }

  walk() {
    this.mode.winter ? this.snowWalk() : this.rainWalk();
  }

  dodge() {
    this.mode.winter ? this.snowDodge() : this.rainDodge();
  }

  hitWall() {
    this.makeSound(SOUND_MAP.HITTING_THE_WALL);
  }

  hitFence() {
    this.mode.winter ? this.snowFenceHit() : this.rainFenceHit();
  }

  attack() {
    this.makeSound(SOUND_MAP.SLASHING);
  }

  kill() {
    this.makeSound(SOUND_MAP.KILLING);
  }

  snowWalk() {
    if (this.player.state.FSM.running) {
      this.makeSound(SOUND_MAP.RUNNING);
    } else {
      Math.random() > 0.5
        ? this.makeSound(SOUND_MAP.FORWARD_STEP)
        : this.makeSound(SOUND_MAP.BACKWARD_STEP);
    }
  }

  rainWalk() {
    if (this.player.state.FSM.running) {
      this.makeSound(SOUND_MAP.RAIN_RUNNING);
    } else if (Math.random() > 0.2) {
      if (Math.random() > 0.5) {
        this.makeSound(SOUND_MAP.RAIN_FORWARD_STEP);
      } else {
        this.makeSound(SOUND_MAP.RAIN_BACKWARD_STEP);
      }
    } else {
      this.makeSound(SOUND_MAP.RAIN_STEP);
    }
  }

  snowDodge() {
    Math.random() > 0.5
      ? this.makeSound(SOUND_MAP.DODGE_STEP_0)
      : this.makeSound(SOUND_MAP.DODGE_STEP_1);
  }

  rainDodge() {
    Math.random() > 0.5
      ? this.makeSound(SOUND_MAP.RAIN_DODGE_STEP_0)
      : this.makeSound(SOUND_MAP.RAIN_DODGE_STEP_1);
  }

  snowFenceHit() {
    this.makeSound(SOUND_MAP.HITTING_THE_FENCE);
  }

  rainFenceHit() {
    this.makeSound(SOUND_MAP.HITTING_THE_RAIN_FENCE);
  }

  isKillingEnded() {
    const killingEnded = this.state.sounds[SOUND_MAP.KILLING];
    return killingEnded;
  }
}

export default PlayerSounds;
