import Sounds from './Sounds';

const SOUND_MAP = {
  PLACING_LOO_PAPER: 'placing_loo_paper',
  PLACING_BOMB: 'placing_bomb',
  PLACING_PAPER: 'placing_paper',
};

class PlayerSounds extends Sounds {
  player: any;

  constructor(player: any) {
    super();
    this.player = player;
    this.state = {
      sounds: {
        [SOUND_MAP.PLACING_LOO_PAPER]: true,
        [SOUND_MAP.PLACING_BOMB]: true,
        [SOUND_MAP.PLACING_PAPER]: true,
      },
    };
  }

  makeSound(soundId: string) {
    if (this.state.sounds[soundId]) {
      this.startHandler(soundId);
      Sounds.makeSoundV2(soundId, () => this.finishHandler(soundId));
    }
  }

  startHandler(soundId: string) {
    this.state.sounds[soundId] = false;
  }

  finishHandler(soundId: string) {
    this.state.sounds[soundId] = true;
  }

  place() {
    switch (this.player.state.inventory.paperType) {
      case 0:
        this.placeLoo();
        break;
      case 7:
        this.placeBomb();
        break;
      default:
        this.placeNormal();
        break;
    }
  }

  placeLoo() {
    this.makeSound(SOUND_MAP.PLACING_LOO_PAPER);
  }

  placeBomb() {
    this.makeSound(SOUND_MAP.PLACING_BOMB);
  }

  placeNormal() {
    this.makeSound(SOUND_MAP.PLACING_PAPER);
  }
}

export default PlayerSounds;
