import { soundManager } from 'soundmanager2';

import ASSETS from '../../data/assets';
import SOUNDS from '../../data/sounds';

import { playSM, preloadSounds } from '../utils/sound';

import Map from './Map';
import { NoiseSounds, GameSounds } from './Audio';
import Player from './Player';
import Camera from './Camera';
import Controls from './Controls';
import GameLoop from './GameLoop';

const videoBlock = document.querySelector('.intro');
const messageBlock = document.querySelector('.text');
const canvasBlock = document.querySelector('#display');
const messageChildBlock = document.querySelector('.text h1');

class Game {
  constructor() {
    this.mode = {};
    this.state = {
      gameFinished: false,
      trees: null,
      bushes: null,
    };
  }

  static prepareCanvas() {
    canvasBlock.width = window.innerWidth;
    canvasBlock.height = window.innerHeight;
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

  loadGame() {
    Game.prepareCanvas();

    this.gameLoop = new GameLoop();
    this.map = new Map(this);
    this.player = new Player(this);
    this.controls = new Controls(this.player);
    this.camera = new Camera(canvasBlock, this.mode, this.map);
    this.gameSounds = new GameSounds(this);
    this.noiseSounds = new NoiseSounds();

    this.setMode();
    this.map.buildMap();

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

    this.gameLoop.start((seconds) => {
      if (this.mode.lightning) this.map.lightning(seconds);

      this.map.update();
      this.player.update(this.controls.state, this.map, seconds);
      this.camera.render(this.player, this.map);

      this.updateNoise();
      this.checkEnding();
    });
  }

  checkEnding() {
    if (this.map.people === 0 && this.player.playerSounds.isKillingEnded()) {
      this.map.show_all_dead = 1;
      this.map.show_loo = 0;
      this.map.show_bomb = 0;
      this.map.show_tip = 0;
      this.map.show_warning = 0;

      this.makeEndmode();
      this.gameSounds.scream();
    }

    if (this.state.gameFinished) {
      this.endGame();
      this.gameLoop.stop();
    }
  }

  endGame() {
    soundManager.stopAll();
    this.gameSounds.ending();
    Game.showEndingScreen();
  }

  updateNoise() {
    if (this.noiseSounds.allSoundsEnded()) {
      this.noiseSounds.noise();
    }
  }

  setMode() {
    this.map.prepareAssets();
    this.gameSounds.ambient();
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
}

export default Game;
