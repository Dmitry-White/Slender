import { soundManager } from 'soundmanager2';

import Map from './Map';
import Sounds from './Sounds';
import Noises from './Noises';
import Person from './Person';
import Player from './Player';
import Camera from './Camera';
import Controls from './Controls';
import GameLoop from './GameLoop';
import ObjSounds from './ObjSounds';

import { getRandomInt } from '../utils/calc';
import { playSM, preloadSounds } from '../utils/sound';

import ASSETS from '../../data/assets';
import SOUNDS from '../../data/sounds';

const videoBlock = document.querySelector('.intro');
const messageBlock = document.querySelector('.text');
const canvasBlock = document.querySelector('#display');
const messageChildBlock = document.querySelector('.text h1');
const playButton = document.querySelector('#play');
const logoBlock = document.querySelector('#logo');
const aboutUsBlock = document.querySelector('#about_us');
const aboutGameBlock = document.querySelector('#about_game');

class Game {
  constructor() {
    this.CIRCLE = Math.PI * 2;
    this.PAPER_NUM = 8;
    this.PPL_NUM = 8;
    this.PPL_XY = 30;
    this.MAP_SIZE = 32;
    this.RESOLUTION = 640;
    this.mode = {};
    this.game_ending = false;
    this.papers = ASSETS.papers;
    this.trees = ASSETS.rain_trees;
    this.bushes = ASSETS.rain_bushes;
    this.sounds = new Sounds(this);
  }

  loadGame() {
    this.map = new Map(this.MAP_SIZE, this.mode);
    this.camera = new Camera(
      canvasBlock,
      this.RESOLUTION,
      0.8,
      this.mode,
      this.CIRCLE,
      this.map,
      this.PAPER_NUM,
    );
    this.loop = new GameLoop(this, this.endGame);
    this.noises = new Noises();
    this.obj_sounds = new ObjSounds(this, this.map, this.mode);
    this.player = new Player({ x: 1.5, y: 1.5, direction: 1.57, game: this });
    this.controls = new Controls(this.player);

    this.setMode();
    this.addPeople();
    this.map.buildMap(this.trees, this.bushes);

    // videoBlock.classList.add('block');
    // Game.enterFS(videoBlock);
    // videoBlock.play();

    // setTimeout(() => {
    //   const { ENTERING } = SOUNDS.GENERAL;

    //   Game.exitFS(videoBlock);
    //   videoBlock.pause();
    //   videoBlock.classList.remove('block');

    //   messageBlock.classList.add('flex');
    //   Game.mouseLock();
    //   playSM(ENTERING.id, {
    //     multiShotEvents: true,
    //     onfinish: () => this.startGame(),
    //   });
    // }, 28000);

    this.startGame();
  }

  startGame() {
    messageBlock.classList.remove('flex');
    canvasBlock.classList.add('block');

    this.loop.start((seconds) => {
      if (this.mode.lightning) this.map.lightning(seconds);
      this.map.update();
      this.changeAmbient();
      this.player.update(this.controls.states, this.map, seconds);
      this.camera.render(this.player, this.map);
      this.checkEnding();
    });
  }

  endGame() {
    const endSong = getRandomInt(0, 2);
    soundManager.stopAll();
    this.game.sounds.playEnding(endSong);
    Game.showEndingScreen();
  }

  checkEnding() {
    if (this.map.people === 0 && this.obj_sounds.obj_sound_end) {
      this.map.show_all_dead = 1;
      this.map.show_loo = 0;
      this.map.show_bomb = 0;
      this.map.show_tip = 0;
      this.map.show_warning = 0;

      setTimeout(() => {
        this.map.show_all_dead = 0;
      }, 3000);
      this.makeEndmode();
      this.obj_sounds.playScream();
    }
  }

  addPeople() {
    for (let i = 0; i < this.PPL_NUM; i++) {
      const x = getRandomInt(2, this.PPL_XY);
      const y = getRandomInt(2, this.PPL_XY);
      const picNum = getRandomInt(1, 5);
      this.map.addObject(
        new Person(this.player, this.map, x, y, picNum, this.CIRCLE),
      );
      this.map.people++;
    }
  }

  changeAmbient() {
    if (this.noises.noisesEnd) {
      const next = getRandomInt(0, 4);
      this.noises.playNoises(next);
    }
  }

  static enterFS(intro) {
    if (intro.requestFullscreen) {
      intro.requestFullscreen();
    } else if (intro.mozRequestFullScreen) {
      intro.mozRequestFullScreen();
    } else if (intro.webkitRequestFullscreen) {
      intro.webkitRequestFullscreen();
    }
  }

  static exitFS(intro) {
    if (intro.exitFullscreen) {
      intro.exitFullscreen();
    } else if (intro.mozExitFullScreen) {
      intro.mozExitFullScreen();
    } else if (intro.webkitExitFullscreen) {
      intro.webkitExitFullscreen();
    }
  }

  static mouseLock() {
    if (document.body.requestPointerLock) {
      document.body.requestPointerLock();
    } else if (document.body.mozRequestPointerLock) {
      document.body.mozRequestPointerLock();
    } else if (document.body.webkitRequestPointerLock) {
      document.body.webkitRequestPointerLock();
    }
  }

  static showEndingScreen() {
    messageBlock.classList.add('flex');
    messageChildBlock.innerHTML = 'Do you want to play more?';
    messageChildBlock.setAttribute('data-text', 'Do you want to kiLL more?');
    canvasBlock.classList.remove('block');
  }

  setMode() {
    const { winter } = this.mode;
    const { WIND } = SOUNDS.WINTER;
    const { RAIN } = SOUNDS.VANILLA;

    if (winter) {
      this.sounds.loopSound(WIND.id);
      this.trees = ASSETS.trees;
      this.bushes = ASSETS.bushes;
    } else this.sounds.loopSound(RAIN.id);
  }

  setToWinter() {
    this.mode = {
      winter: true,
      light: 1,
      lightning: false,
      lightRange: 5,
      shadows: '#fff',
      drops: '#fff',
      drops_opacity: 1,
      drops_amount: 100,
      ground: '#fff',
      param: 0.5,
      particlesWidth: 6,
      particlesHeight: 6,
      fence_door: ASSETS.mode.fenceDoor,
      fence_texture: ASSETS.mode.snow.fence,
      sky_texture: ASSETS.mode.snow.sky,
      wall_texture: ASSETS.mode.snow.wall,
    };
  }

  setToVanilla() {
    this.mode = {
      winter: false,
      light: 2,
      lightning: true,
      lightRange: 5,
      shadows: '#000',
      drops: '#fff',
      drops_opacity: 0.15,
      drops_amount: 30,
      ground: '#56361f',
      param: 0.1,
      particlesWidth: 2,
      particlesHeight: 20,
      fence_door: ASSETS.mode.fenceDoor,
      fence_texture: ASSETS.mode.rain.fence,
      sky_texture: ASSETS.mode.rain.sky,
      wall_texture: ASSETS.mode.rain.wall,
    };
  }

  makeEndmode() {
    this.map.light = 2;
    this.mode.param = 20;
    this.mode.drops = '#f00';
    this.mode.ground = '#f00';
    this.mode.lightning = false;
    this.mode.drops_opacity = 1;
    this.mode.particlesWidth = 10;
    this.mode.particlesHeight = 10;
  }

  enableMenuSounds() {
    const {
      PIANO_MENU,
      STATIC_MENU,
      SLENDER_LOGO,
      PLAY_BUTTON,
      ABOUT_US,
      ABOUT_GAME,
    } = SOUNDS.MENU;

    this.sounds.loopSound(PIANO_MENU.id);
    this.sounds.loopSound(STATIC_MENU.id);

    const startHandler = (name, mute) => {
      this.sounds.loopSound(name);
      mute && soundManager.mute(mute);
    };
    const stopHandler = (name, unmute) => {
      soundManager.stop(name);
      unmute && soundManager.unmute(unmute);
    };

    const startPlayHandler = () => startHandler(PLAY_BUTTON.id);
    const stopPlayHandler = () => stopHandler(PLAY_BUTTON.id);

    const startLogoHandler = () => startHandler(SLENDER_LOGO.id);
    const stopLogoHandler = () => stopHandler(SLENDER_LOGO.id);

    const startAboutUsHandler = () => startHandler(ABOUT_US.id, PIANO_MENU.id);
    const stopAboutUsHandler = () => stopHandler(ABOUT_US.id, PIANO_MENU.id);

    const startAboutGameHandler = () =>
      startHandler(ABOUT_GAME.id, PIANO_MENU.id);
    const stopAboutGameHandler = () =>
      stopHandler(ABOUT_GAME.id, PIANO_MENU.id);

    playButton.addEventListener('mouseover', startPlayHandler);
    playButton.addEventListener('mouseout', stopPlayHandler);

    logoBlock.addEventListener('mouseover', startLogoHandler);
    logoBlock.addEventListener('mouseout', stopLogoHandler);

    aboutUsBlock.addEventListener('mouseover', startAboutUsHandler);
    aboutUsBlock.addEventListener('mouseout', stopAboutUsHandler);

    aboutGameBlock.addEventListener('mouseover', startAboutGameHandler);
    aboutGameBlock.addEventListener('mouseout', stopAboutGameHandler);
  }

  disableMenuSounds() {
    this.sounds.sound_end = true;
  }
}

export default Game;
