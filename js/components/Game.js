import { Map } from "./Map.js";
import { Calc } from "./Calc.js";
import { Sounds } from "./Sounds.js";
import { Noises } from "./Noises.js";
import { Person } from "./Person.js";
import { Player } from "./Player.js";
import { Bitmap } from "./Bitmap.js";
import { Camera } from "./Camera.js";
import { Objects } from "./Objects.js";
import { Controls } from "./Controls.js";
import { GameLoop } from "./GameLoop.js";
import { ObjSounds } from "./ObjSounds.js";
import { assets } from "../json/assets.json";

export class Game {
    constructor() {
        this.CIRCLE = Math.PI * 2;
        this.PAPER_NUM = 8;
        this.PPL_NUM = 8;
        this.PPL_XY = 30;
        this.MAP_SIZE = 32;
        this.RESOLUTION = 640;
        this.video = document.querySelector('.intro');
        this.message = document.querySelector('.text');
        this.message_child = document.querySelector('.text h1');
        this.canvas = document.getElementById('display');
        this.mode = {};
        this.game_ending = false;
        this.papers = assets.papers;
        this.trees = assets.rain_trees;
		this.bushes = assets.rain_bushes;
        this.sounds = new Sounds(this);
    };

    loadGame() {
        this.map = new Map(this.MAP_SIZE, this.mode);
        this.camera = new Camera(this.canvas, this.RESOLUTION, 0.8, this.mode, this.CIRCLE, this.map, this.PAPER_NUM);
        this.loop = new GameLoop(this, this.endGame);
        this.noises = new Noises();
        this.obj_sounds = new ObjSounds(this, this.map, this.mode);
        this.player = new Player( {x : 1.5, y : 1.5, direction : 1.57, game : this} );
		this.controls = new Controls(this.player);

		this.setMode();
		this.addPeople();
		this.map.buildMap(this.trees, this.bushes);

 		this.video.classList.add('block');
		this.enterFS(this.video)
 		this.video.play();

 		setTimeout(()=>{
			this.exitFS(this.video);
 			this.video.pause();
 			this.video.classList.remove('block');
			this.message.classList.add('flex');
			this.mouseLock();
 			soundManager.play("entering_area",{
 	            multiShotEvents: true,
 	            onfinish: ()=> {
 	 				this.startGame();
 	            }
 	        });
 		},28000);

		//this.startGame();
	};

    startGame() {
        this.message.classList.remove('flex');
        this.canvas.classList.add('block');
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
        const end_song = Calc.getRandomInt(0,2);
        soundManager.stopAll();
        this.game.sounds.playEnding(end_song);
        this.game.showEndingScreen();
    };

    makeEndmode() {
        this.map.light = 2;
        this.mode.param = 20;
        this.mode.drops  = "#f00";
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
            setTimeout(()=>{
    			this.map.show_all_dead = 0;
    		},3000);
            this.makeEndmode();
            this.obj_sounds.playScream();
        };
    }

    showEndingScreen() {
        this.message.classList.add('flex');
        this.message_child.innerHTML = 'Do you want to play more?';
        this.message_child.setAttribute('data-text','Do you want to kiLL more?');
        this.canvas.classList.remove('block');
    };

    setMode() {
        if (this.mode.winter) {
            this.sounds.loopSound('wind_ambient');
            this.trees = assets.trees;
            this.bushes = assets.bushes;
        } else this.sounds.loopSound('rain_ambient');
    };

    addPeople() {
        for (let i = 0; i < this.PPL_NUM; i++) {
            let x = Calc.getRandomInt(2, this.PPL_XY);
            let y = Calc.getRandomInt(2, this.PPL_XY);
            let pic_num = Calc.getRandomInt(1, 5);
            this.map.addObject(new Person(this.player, this.map, x, y, pic_num, this.CIRCLE));
            this.map.people++;
        }
    };

    changeAmbient() {
        if (this.noises.noises_end) {
            const next = Calc.getRandomInt(0,4);
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
        this.mode.winter = true;
        this.mode.light = 1;
        this.mode.lightning = false;
        this.mode.lightRange = 5;
        this.mode.shadows = "#fff";
        this.mode.drops = "#fff";
        this.mode.drops_opacity = 1;
        this.mode.drops_amount = 100;
        this.mode.ground = "#fff";
        this.mode.param = 0.5;
        this.mode.particlesWidth = 6;
        this.mode.particlesHeight = 6;
        this.mode.fence_texture = "img/snow/fence_snow.png";
        this.mode.sky_texture = "img/snow/sky_panorama_snow.jpg";
        this.mode.wall_texture = "img/snow/wall_texture_snow.jpg";
    };

    setToVanilla() {
        this.mode.winter = false;
        this.mode.light = 2;
        this.mode.lightning = true;
        this.mode.lightRange = 5;
        this.mode.shadows = "#000";
        this.mode.drops = "#fff";
        this.mode.drops_opacity = 0.15;
        this.mode.drops_amount = 30;
        this.mode.ground = "#56361f";
        this.mode.param = 0.1;
        this.mode.particlesWidth = 2;
        this.mode.particlesHeight = 20;
        this.mode.sky_texture = "img/rain/rain_sky_panorama.jpg";
        this.mode.fence_texture = "img/rain/rain_fence.jpg";
        this.mode.wall_texture = "img/rain/rain_wall_texture.jpg";
    };

    loadSounds() {
        // ------------------ Menu ------------------------
        soundManager.load('piano_menu_ambient');
        soundManager.load('static_menu_ambient');
        soundManager.load('slender_logo_hover');
        soundManager.load('play_button_hover');
        soundManager.load('ho_ho_ho');
        soundManager.load('about_us');
        soundManager.load('about_game');
        // ------------------------------------------------

        // --------------- Winter Mode --------------------
        soundManager.load('wind_ambient');
        soundManager.load('forward_step');
        soundManager.load('backward_step');
        soundManager.load('dodge_step_0');
        soundManager.load('dodge_step_1');
        soundManager.load('running');
        // ------------------------------------------------

        // --------------- Vanilla Mode -------------------
        soundManager.load('rain_ambient');
        soundManager.load('rain_forward_step');
        soundManager.load('rain_backward_step');
        soundManager.load('rain_step');
        soundManager.load('rain_dodge_step_0');
        soundManager.load('rain_dodge_step_1');
        soundManager.load('rain_running');
        // ------------------------------------------------

        // --------------- General Stuff ------------------
        soundManager.load('entering_area');
        soundManager.load('hitting_the_fence');
        soundManager.load('hitting_the_rain_fence');
        soundManager.load('hitting_the_wall');
        soundManager.load('placing_paper');
        soundManager.load('placing_loo_paper');
        soundManager.load('placing_bomb');
        soundManager.load('slashing');
        soundManager.load('killing');
        // ------------------------------------------------

        // --------------- Random Ambient -----------------
        soundManager.load('ghost_in_the_house');
        soundManager.load('just_horror_ambient');
        soundManager.load('weird_noises');
        soundManager.load('scary_piano');
        // ------------------------------------------------

        // ------------------ End Game --------------------
        soundManager.load('ghost_scream');
        soundManager.load('come_out');
        soundManager.load('lululala');
        // ------------------------------------------------
    }

    enableMenuSounds() {
        this.sounds.loopSound('piano_menu_ambient');
        this.sounds.loopSound('static_menu_ambient');
        document.getElementById('play').addEventListener('mouseover', () => {
            this.sounds.loopSound("play_button_hover");
        });
        document.getElementById('play').addEventListener('mouseout', () => {
            soundManager.stop('play_button_hover');
        });
        document.getElementById('logo').addEventListener('mouseover', () => {
            this.sounds.loopSound("slender_logo_hover");
        });
        document.getElementById('logo').addEventListener('mouseout', () => {
            soundManager.stop('slender_logo_hover');
        });
        document.getElementById('about_us').addEventListener('mouseover', () => {
            this.sounds.loopSound("about_us");
            soundManager.mute('piano_menu_ambient');
        });
        document.getElementById('about_us').addEventListener('mouseout', () => {
            soundManager.stop('about_us');
            soundManager.unmute('piano_menu_ambient');
        });
        document.getElementById('about_game').addEventListener('mouseover', () => {
            this.sounds.loopSound("about_game");
            soundManager.mute('piano_menu_ambient');
        });
        document.getElementById('about_game').addEventListener('mouseout', () => {
            soundManager.stop('about_game');
            soundManager.unmute('piano_menu_ambient');
        });
    };
}
