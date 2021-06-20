import { soundManager } from 'soundmanager2';

import ASSETS from '../../data/assets';
import SOUNDS from '../../data/sounds';
import { playSM, preloadSounds } from '../utils/sound';

import Player from './Actors/Player';
import { NoiseSounds, GameSounds } from './Audio';
import Camera from './Engine/Camera';
import Controls from './Engine/Controls';
import GUI from './Engine/GUI';
import GameLoop from './Engine/GameLoop';
import Map from './World/Map';

const videoBlock: HTMLVideoElement = document.querySelector('.intro');
const messageBlock: HTMLDivElement = document.querySelector('.text');
const canvasBlock: HTMLCanvasElement = document.querySelector('#display');
const messageChildBlock: HTMLHeadingElement =
  document.querySelector('.text h1');

class Game {
  mode: any;

  state: any;

  gameLoop: GameLoop;

  map: Map;

  player: Player;

  controls: Controls;

  gui: GUI;

  camera: Camera;

  gameSounds: GameSounds;

  noiseSounds: NoiseSounds;

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

  static enterFS(intro: HTMLVideoElement) {
    if (!document.fullscreenElement && intro.requestFullscreen) {
      intro.requestFullscreen();
    }
  }

  static exitFS() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  static mouseLock() {
    if (!document.pointerLockElement && document.body.requestPointerLock) {
      document.body.requestPointerLock();
    } else {
      document.exitPointerLock();
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
    this.gui = new GUI(canvasBlock, this);
    this.camera = new Camera(canvasBlock, this, this.mode, this.map);
    this.gameSounds = new GameSounds(this);
    this.noiseSounds = new NoiseSounds();

    this.setMode();
    this.map.buildMap();

    // videoBlock.classList.add('block');
    // Game.enterFS(videoBlock);
    // videoBlock.play();

    // setTimeout(() => {
    //   const { ENTERING } = SOUNDS.GENERAL;

    //   Game.exitFS();
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

    this.gameLoop.start((seconds: number) => {
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
      this.gui.showAllDeadMessage();

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
