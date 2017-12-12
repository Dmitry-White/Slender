import { Map } from "./components/Map.js";
import { assets } from "./json/assets.json";
import { Camera } from "./components/Camera.js";
import { Sounds } from "./components/Sounds.js";
import { Player } from "./components/Player.js";
import { Bitmap } from "./components/Bitmap.js";
import { Objects } from "./components/Objects.js";
import { Controls } from "./components/Controls.js";
import { GameLoop } from "./components/GameLoop.js";


var state = {
	winter : false,
	light : 2,
	lightning : true,
	lightRange : 5,
	shadows : "#000",
	drops : "#fff",
	drops_opacity : 0.15,
	drops_amount : 30,
	ground : "56361f",
	param : 0.1,
	particlesWidth : 2,
	particlesHeight : 20,
	sky_texture : "img/sky_panorama.jpg",
	wall_texture : "img/wall_texture.jpg"
}

export const CIRCLE = Math.PI * 2;
export let camera = new Camera(document.getElementById('display'), 640, 0.8, state);
let sounds = new Sounds();

window.onload = function() {

	enableMenuSounds();

	document.getElementById('checkbox').addEventListener('change', function(){
		if (this.checked) {
			document.querySelector(`.snow`).style.display = 'block';
			sounds.makeSound("ho_ho_ho");
			changeToWinter();
			// Change to Winter Mode
		} else {
		   	document.querySelector(`.snow`).style.display = 'none';
		   	// Change to Vanilla Mode
			changeToVanilla();
	   }
	});

	document.getElementById('play').addEventListener('click', function(){
		disableMenuSounds();

		/*try {
			document.body.requestPointerLock();
		} catch (e) {
			document.body.webkitRequestPointerLock();
		}*/


		document.querySelector('.menu').classList.add('fadeOut');
		setTimeout(()=>{
			document.querySelector('.menu').style.display = 'none';
		},500);

		loadGame();
	});

	function loadGame() {

		let trees = assets.trees;
		let bushes = assets.bushes;
		let papers = assets.papers;

		let map = new Map(32, state);
		let objects = new Objects(map);
		let player = new Player(1, 1, 1, papers, map, sounds, state);
		let controls = new Controls(player);
		let loop = new GameLoop();

		(state.winter) ? sounds.loopSound('wind_ambient')
					   : sounds.loopSound('wind_ambient');
		map.buildMap(trees, bushes);

		 /* Comment this to skip intro
		soundManager.play("entering_area",{
            multiShotEvents: true,
            onfinish: ()=> {
				startGame();
            }
        });
		*/
		// Uncomment this to skip intro
		startGame();

		function startGame() {
			document.querySelector('canvas').style.display = 'block';
			loop.start(function frame(seconds) {
				if (state.lightning) map.update(seconds); //молнии
				objects.update();
				player.update(controls.states, map, seconds);
				camera.render(player, map, objects);
			});
		}
	};

	function changeToWinter() {
		state.winter = true;
		state.light = 1;
		state.lightning = false;
		state.lightRange = 5;
		state.shadows = "#fff";
		state.drops = "#fff";
		state.drops_opacity = 1;
		state.drops_amount = 100;
		state.ground = "#fff";
		state.param = 0.5;
		state.particlesWidth = 6;
		state.particlesHeight = 6;
		state.sky_texture = "img/sky_panorama_snow.jpg";
		state.wall_texture = "img/wall_texture_snow.jpg";
	};
	function changeToVanilla() {
		state.winter = false;
		state.light = 2;
		state.lightning = true;
		state.lightRange = 4;
		state.shadows = "#000";
		state.drops = "#fff";
		state.drops_opacity = 0.15;
		state.drops_amount = 30;
		state.ground = "56361f";
		state.param = 0.1;
		state.particlesWidth = 2;
		state.particlesHeight = 20;
		state.sky_texture = "img/sky_panorama.jpg";
		state.wall_texture = "img/wall_texture.jpg";
	}

	function enableMenuSounds() {
		sounds.loopSound('piano_menu_ambient');
		sounds.loopSound('static_menu_ambient');

		document.getElementById('play').addEventListener('mouseover', function(e){
			if (e.target.id == 'play') {
				sounds.loopSound("play_button_hover");
			}
		});

		document.getElementById('play_link').addEventListener('mouseover',function(e) {
    		e.stopPropagation();
		}, true);

		document.getElementById('play').addEventListener('mouseout', function(e){
			if (e.target.id == 'play') {
				soundManager.stop('play_button_hover');
			}
		});

		document.getElementById('logo').addEventListener('mouseover', function(){
			sounds.loopSound("slender_logo_hover");
		});

		document.getElementById('logo').addEventListener('mouseout', function(){
			soundManager.stop('slender_logo_hover');
		});

		document.getElementById('about_us').addEventListener('mouseover', function(){
			sounds.loopSound("about_us");
			soundManager.mute('piano_menu_ambient');
		});

		document.getElementById('about_us').addEventListener('mouseout', function(){
			soundManager.stop('about_us');
			soundManager.unmute('piano_menu_ambient');
		});
		document.getElementById('about_game').addEventListener('mouseover', function(){
			sounds.loopSound("about_game");
			soundManager.mute('piano_menu_ambient');
		});

		document.getElementById('about_game').addEventListener('mouseout', function(){
			soundManager.stop('about_game');
			soundManager.unmute('piano_menu_ambient');
		});
	};

	function disableMenuSounds() {
		soundManager.stop('slender_logo_hover');
		soundManager.stop('play_button_hover');
		soundManager.stop('piano_menu_ambient');
		soundManager.stop('static_menu_ambient');
	};
};
