import { soundManager } from 'soundmanager2';

import SOUNDS from '../../../data/sounds';

import Sounds from './Sounds';

const SOUND_MAP = {
  HO_HO_HO: 'ho_ho_ho',
  // PIANO_MENU: '',
  // STATIC_MENU: '',
  // SLENDER_LOGO: '',
  // PLAY_BUTTON: '',
  // ABOUT_US: '',
  // ABOUT_GAME: '',
};

const playButton = document.querySelector('#play');
const logoBlock = document.querySelector('#logo');
const aboutUsBlock = document.querySelector('#about_us');
const aboutGameBlock = document.querySelector('#about_game');

class MenuSounds extends Sounds {
  constructor(player) {
    super();
    this.player = player;

    this.state = {
      sounds: {
        [SOUND_MAP.HO_HO_HO]: true,
        // TODO: Rewrite manual logic to state logic
        // [SOUND_MAP.PIANO_MENU]: true,
        // [SOUND_MAP.STATIC_MENU]: true,
        // [SOUND_MAP.SLENDER_LOGO]: true,
        // [SOUND_MAP.PLAY_BUTTON]: true,
        // [SOUND_MAP.ABOUT_US]: true,
        // [SOUND_MAP.ABOUT_GAME]: true,
      },
    };
  }

  static disableMenuSounds() {
    soundManager.stopAll();
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

  startSoundHandler(nextSound, currentSound) {
    if (currentSound) {
      Sounds.muteSound(currentSound);
    }
    this.loopSound(nextSound);
  }

  stopSoundHandler(currentSound, nextSound) {
    if (nextSound) {
      Sounds.unmuteSound(nextSound);
    }
    Sounds.stopSound(currentSound);
  }

  startPlayHandler() {
    this.startSoundHandler(SOUNDS.MENU.PLAY_BUTTON.id);
  }

  stopPlayHandler() {
    this.stopSoundHandler(SOUNDS.MENU.PLAY_BUTTON.id);
  }

  startLogoHandler() {
    this.startSoundHandler(SOUNDS.MENU.SLENDER_LOGO.id);
  }

  stopLogoHandler() {
    this.stopSoundHandler(SOUNDS.MENU.SLENDER_LOGO.id);
  }

  startAboutUsHandler() {
    this.startSoundHandler(SOUNDS.MENU.ABOUT_US.id, SOUNDS.MENU.PIANO_MENU.id);
  }

  stopAboutUsHandler() {
    this.stopSoundHandler(SOUNDS.MENU.ABOUT_US.id, SOUNDS.MENU.PIANO_MENU.id);
  }

  startAboutGameHandler() {
    this.startSoundHandler(
      SOUNDS.MENU.ABOUT_GAME.id,
      SOUNDS.MENU.PIANO_MENU.id,
    );
  }

  stopAboutGameHandler() {
    this.stopSoundHandler(SOUNDS.MENU.ABOUT_GAME.id, SOUNDS.MENU.PIANO_MENU.id);
  }

  enableMenuSounds() {
    const { PIANO_MENU, STATIC_MENU } = SOUNDS.MENU;

    this.loopSound(PIANO_MENU.id);
    this.loopSound(STATIC_MENU.id);

    playButton.addEventListener('mouseover', this.startPlayHandler.bind(this));
    playButton.addEventListener('mouseout', this.stopPlayHandler.bind(this));

    logoBlock.addEventListener('mouseover', this.startLogoHandler.bind(this));
    logoBlock.addEventListener('mouseout', this.stopLogoHandler.bind(this));

    aboutUsBlock.addEventListener(
      'mouseover',
      this.startAboutUsHandler.bind(this),
    );
    aboutUsBlock.addEventListener(
      'mouseout',
      this.stopAboutUsHandler.bind(this),
    );

    aboutGameBlock.addEventListener(
      'mouseover',
      this.startAboutGameHandler.bind(this),
    );
    aboutGameBlock.addEventListener(
      'mouseout',
      this.stopAboutGameHandler.bind(this),
    );
  }

  winterModeSound() {
    this.makeSound(SOUND_MAP.HO_HO_HO);
  }
}

export default MenuSounds;
