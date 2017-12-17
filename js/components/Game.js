import { Map } from "./Map.js";
import { Calc } from "./Calc.js";
import { Sounds } from "./Sounds.js";
import { Person } from "./Person.js";
import { Player } from "./Player.js";
import { Bitmap } from "./Bitmap.js";
import { Camera } from "./Camera.js";
import { Objects } from "./Objects.js";
import { Controls } from "./Controls.js";
import { GameLoop } from "./GameLoop.js";
import { assets } from "../json/assets.json";

export class Game {
    constructor() {
        this.state = {}
        this.CIRCLE = Math.PI * 2;
        this.papers = assets.papers;
        this.trees = assets.rain_trees;
		this.bushes = assets.rain_bushes;
        this.sounds = new Sounds();
        this.noises = new Sounds();
        this.loop = new GameLoop(this, this.endGame);
        this.camera = new Camera(document.getElementById('display'), 640, 0.8, this.state, this.CIRCLE);
    };

    loadGame() {
        this.obj_sounds = new Sounds(this.map, this.loop, this.state);
        this.map = new Map(32, this.state);
        this.player = new Player( { x : 1.5,
								   	y : 1.5,
								   	direction : 1,
								   	papers : this.papers,
								   	map : this.map,
								   	sounds : this.sounds,
								   	obj_sounds : this.obj_sounds,
							   	   	state : this.state,
                                    CIRCLE : this.CIRCLE });
		this.controls = new Controls(this.player);
		this.setMode();

		this.addPeople();

		this.map.buildMap(this.trees, this.bushes);

		/*let intro = document.querySelector('.intro');
 		intro.style.display = 'block';
		this.enterFS(intro)
 		intro.play();

 		setTimeout(()=>{
			this.exitFS(intro);
 			intro.pause();
 			intro.style.display = 'none';
			document.querySelector('.text').style.display = 'flex';
			this.mouseLock();
 			soundManager.play("entering_area",{
 	            multiShotEvents: true,
 	            onfinish: ()=> {
 	 				this.startGame();
 	            }
 	        });
 		},28000);*/

		this.startGame();
	};

    startGame() {
        document.querySelector('.text').style.display = 'none';
        document.querySelector('canvas').style.display = 'block';
        this.loop.start((seconds) => {
            if (this.state.lightning) this.map.lightning(seconds);
            this.map.update();
            this.changeAmbient();
            this.player.update(this.controls.states, this.map, seconds);
            this.camera.render(this.player, this.map);
        });
    };

    endGame() {
        soundManager.stopAll();
        const end = Calc.getRandomInt(0,2);
        this.sounds.playEnding(end);
        document.querySelector('.text').style.display = 'flex';
        const text = document.querySelector('.text h1');
        text.innerHTML = 'Do you want to play more?';
        text.setAttribute('data-text','Do you want to kiLL more?');
        document.querySelector('canvas').style.display = 'none';
    };

    setMode() {
        if (this.state.winter) {
            this.sounds.loopSound('wind_ambient')
            this.trees = assets.trees;
            this.bushes = assets.bushes;
        } else this.sounds.loopSound('rain_ambient');
    };

    addPeople() {
        for (let i = 0; i < 7; i++) {
            let x = Calc.getRandomInt(2,30)
            let y = Calc.getRandomInt(2,30)
            let pic_num = Calc.getRandomInt(1,5);
            console.log(pic_num);
            this.map.addObject(new Person(this.player, this.map , x, y, pic_num, this.CIRCLE));
            this.map.people++;
        }
    };

    changeAmbient() {
        if (this.noises.noises_end) {
            const next = Calc.getRandomInt(0,4)
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
        this.state.winter = true;
        this.state.light = 1;
        this.state.lightning = false;
        this.state.lightRange = 5;
        this.state.shadows = "#fff";
        this.state.drops = "#fff";
        this.state.drops_opacity = 1;
        this.state.drops_amount = 100;
        this.state.ground = "#fff";
        this.state.param = 0.5;
        this.state.particlesWidth = 6;
        this.state.particlesHeight = 6;
        this.state.fence_texture = "img/snow/fence_snow.png";
        this.state.sky_texture = "img/snow/sky_panorama_snow.jpg";
        this.state.wall_texture = "img/snow/wall_texture_snow.jpg";
    };

    setToVanilla() {
        this.state.winter = false;
        this.state.light = 2;
        this.state.lightning = true;
        this.state.lightRange = 5;
        this.state.shadows = "#000";
        this.state.drops = "#fff";
        this.state.drops_opacity = 0.15;
        this.state.drops_amount = 30;
        this.state.ground = "#56361f";
        this.state.param = 0.1;
        this.state.particlesWidth = 2;
        this.state.particlesHeight = 20;
        this.state.sky_texture = "img/rain/rain_sky_panorama.jpg";
        this.state.fence_texture = "img/rain/rain_fence.jpg";
        this.state.wall_texture = "img/rain/rain_wall_texture.jpg";
    };

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
