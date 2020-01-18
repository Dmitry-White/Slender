import { Map } from "./Map.js";
import { Sounds } from "./Sounds.js";
import { Noises } from "./Noises.js";
import { Person } from "./Person.js";
import { Player } from "./Player.js";
import { Camera } from "./Camera.js";
import { Controls } from "./Controls.js";
import { GameLoop } from "./GameLoop.js";
import { ObjSounds } from "./ObjSounds.js";

import { getRandomInt } from '../utils/calc';
import { playSM, preloadSounds } from '../utils/sound';

import { assets } from "../json/assets.json";
import { GENERAL, WINTER, VANILLA, MENU } from '../json/sounds.json'

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
    this.papers = assets.papers;
    this.trees = assets.rain_trees;
    this.bushes = assets.rain_bushes;
    this.sounds = new Sounds(this);
  };

  loadGame() {
    this.map = new Map(this.MAP_SIZE, this.mode);
    this.camera = new Camera(canvasBlock, this.RESOLUTION, 0.8, this.mode, this.CIRCLE, this.map, this.PAPER_NUM);
    this.loop = new GameLoop(this, this.endGame);
    this.noises = new Noises();
    this.obj_sounds = new ObjSounds(this, this.map, this.mode);
    this.player = new Player({ x: 1.5, y: 1.5, direction: 1.57, game: this });
    this.controls = new Controls(this.player);

    this.setMode();
    this.addPeople();
    this.map.buildMap(this.trees, this.bushes);

    // videoBlock.classList.add('block');
    // this.enterFS(videoBlock);
    // videoBlock.play();

    // setTimeout(() => {
    //   const { ENTERING } = GENERAL;

    //   this.exitFS(videoBlock);
    //   videoBlock.pause();
    //   videoBlock.classList.remove('block');

    //   messageBlock.classList.add('flex');
    //   this.mouseLock();
    //   playSM(ENTERING.id, {
    //     multiShotEvents: true,
    //     onfinish: () => this.startGame()
    //   });
    // }, 28000);

    this.startGame();
  };

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
  };

  endGame() {
    const end_song = getRandomInt(0, 2);
    soundManager.stopAll();
    this.game.sounds.playEnding(end_song);
    this.game.showEndingScreen();
  };

  makeEndmode() {
    this.map.light = 2;
    this.mode.param = 20;
    this.mode.drops = "#f00";
    this.mode.ground = "#f00";
    this.mode.lightning = false;
    this.mode.drops_opacity = 1;
    this.mode.particlesWidth = 10;
    this.mode.particlesHeight = 10;
  };

  checkEnding() {
    if (this.map.people == 0 && this.obj_sounds.obj_sound_end) {

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
    };
  }

  showEndingScreen() {
    messageBlock.classList.add('flex');
    messageChildBlock.innerHTML = 'Do you want to play more?';
    messageChildBlock.setAttribute('data-text', 'Do you want to kiLL more?');
    canvasBlock.classList.remove('block');
  };

  setMode() {
    const { winter } = this.mode;
    const { WIND } = WINTER;
    const { RAIN } = VANILLA;

    if (winter) {
      this.sounds.loopSound(WIND.id);
      this.trees = assets.trees;
      this.bushes = assets.bushes;
    } else this.sounds.loopSound(RAIN.id);
  };

  addPeople() {
    for (let i = 0; i < this.PPL_NUM; i++) {
      let x = getRandomInt(2, this.PPL_XY);
      let y = getRandomInt(2, this.PPL_XY);
      let pic_num = getRandomInt(1, 5);
      this.map.addObject(new Person(this.player, this.map, x, y, pic_num, this.CIRCLE));
      this.map.people++;
    }
  };

  changeAmbient() {
    if (this.noises.noises_end) {
      const next = getRandomInt(0, 4);
      this.noises.playNoises(next);
    };
  };

  enterFS(intro) {
    if (intro.requestFullscreen) {
      intro.requestFullscreen();
    } else if (intro.mozRequestFullScreen) {
      intro.mozRequestFullScreen();
    } else if (intro.webkitRequestFullscreen) {
      intro.webkitRequestFullscreen();
    }
  };

  exitFS(intro) {
    if (intro.exitFullscreen) {
      intro.exitFullscreen();
    } else if (intro.mozExitFullScreen) {
      intro.mozExitFullScreen();
    } else if (intro.webkitExitFullscreen) {
      intro.webkitExitFullscreen();
    }
  };

  mouseLock() {
    if (document.body.requestPointerLock) {
      document.body.requestPointerLock();
    } else if (document.body.mozRequestPointerLock) {
      document.body.mozRequestPointerLock();
    } else if (document.body.webkitRequestPointerLock) {
      document.body.webkitRequestPointerLock();
    }
  };

  setToWinter() {
    this.mode = {
      winter: true,
      light: 1,
      lightning: false,
      lightRange: 5,
      shadows: "#fff",
      drops: "#fff",
      drops_opacity: 1,
      drops_amount: 100,
      ground: "#fff",
      param: 0.5,
      particlesWidth: 6,
      particlesHeight: 6,
      fence_texture: "img/snow/fence_snow.png",
      sky_texture: "img/snow/sky_panorama_snow.jpg",
      wall_texture: "img/snow/wall_texture_snow.jpg",
    }
  };

  setToVanilla() {
    this.mode = {
      winter: false,
      light: 2,
      lightning: true,
      lightRange: 5,
      shadows: "#000",
      drops: "#fff",
      drops_opacity: 0.15,
      drops_amount: 30,
      ground: "#56361f",
      param: 0.1,
      particlesWidth: 2,
      particlesHeight: 20,
      sky_texture: "img/rain/rain_sky_panorama.jpg",
      fence_texture: "img/rain/rain_fence.jpg",
      wall_texture: "img/rain/rain_wall_texture.jpg",
    }
  };

  loadSounds() {
    preloadSounds();
  }

  enableMenuSounds() {
    const {
      PIANO_MENU,
      STATIC_MENU,
      SLENDER_LOGO,
      PLAY_BUTTON,
      ABOUT_US,
      ABOUT_GAME,
    } = MENU;

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

    const startAboutGameHandler = () => startHandler(ABOUT_GAME.id, PIANO_MENU.id);
    const stopAboutGameHandler = () => stopHandler(ABOUT_GAME.id, PIANO_MENU.id);

    playButton.addEventListener('mouseover', startPlayHandler);
    playButton.addEventListener('mouseout', stopPlayHandler);

    logoBlock.addEventListener('mouseover', startLogoHandler);
    logoBlock.addEventListener('mouseout', stopLogoHandler);

    aboutUsBlock.addEventListener('mouseover', startAboutUsHandler);
    aboutUsBlock.addEventListener('mouseout', stopAboutUsHandler);

    aboutGameBlock.addEventListener('mouseover', startAboutGameHandler);
    aboutGameBlock.addEventListener('mouseout', stopAboutGameHandler);
  };
}

export default Game;
