import { Calc } from "./components/Calc.js";
import { Map } from "./components/Map.js";
import { assets } from "./json/assets.json";
import { Camera } from "./components/Camera.js";
import { Sounds } from "./components/Sounds.js";
import { Player } from "./components/Player.js";
import { Bitmap } from "./components/Bitmap.js";
import { Objects } from "./components/Objects.js";
import { Controls } from "./components/Controls.js";
import { GameLoop } from "./components/GameLoop.js";
import { Person } from "./components/Person.js";

let state = {}
export const CIRCLE = Math.PI * 2;
export let camera = new Camera(document.getElementById('display'), 640, 0.8, state);

window.onload = function() {

	let sounds = new Sounds();
	let noises = new Sounds();

	enableMenuSounds();
	changeToVanilla();

	document.getElementById('checkbox').addEventListener('change', function(){
		if (this.checked) {
			document.querySelector(`.snow`).style.display = 'block';
			sounds.makeSound("ho_ho_ho");
			changeToWinter();
		} else {
		   	document.querySelector(`.snow`).style.display = 'none';
			changeToVanilla();
	   }
	});

	document.getElementById('play').addEventListener('click', function(){
		soundManager.stopAll();

		document.querySelector('.menu').classList.add('fadeOut');
		setTimeout(()=>{
			document.querySelector('.menu').style.display = 'none';
		},700);

		loadGame();
	});

	function loadGame() {
		let papers = assets.papers;
		let map = new Map(32, state);
		let loop = new GameLoop(endGame);
		let obj_sounds = new Sounds(map, loop, state);
		let player = new Player( { x:1.5,
								   y:1.5,
								   direction:1,
								   papers:papers,
								   map:map,
								   sounds:sounds,
								   obj_sounds:obj_sounds,
							   	   state:state });
		let controls = new Controls(player);
		let trees = assets.rain_trees;
		let bushes = assets.rain_bushes;

		if (state.winter) {
			sounds.loopSound('wind_ambient')
			trees = assets.trees;
			bushes = assets.bushes;
		} else sounds.loopSound('rain_ambient');

		for (let i = 0; i < 7; i++) {
			let x = Calc.getRandomInt(2,30)
			let y = Calc.getRandomInt(2,30)
			map.addObject(new Person(player,map,x,y));
		}

		map.buildMap(trees, bushes);

		let intro = document.querySelector('.intro');
 		intro.style.display = 'block';
		enterFS(intro)
 		intro.play();

 		setTimeout(()=>{
			exitFS(intro);
 			intro.pause();
 			intro.style.display = 'none';
			document.querySelector('.text').style.display = 'flex';
			mouseLock();
 			soundManager.play("entering_area",{
 	            multiShotEvents: true,
 	            onfinish: ()=> {
 	 				startGame();
 	            }
 	        });
 		},28000);

		map.objects.forEach((item)=>{
			if(item instanceof Person && item.alive) {
				map.people++;
			}
		});

		//startGame();

		function startGame() {
			document.querySelector('.text').style.display = 'none';
			document.querySelector('canvas').style.display = 'block';
			loop.start(function frame(seconds) {
				if (state.lightning) map.lightning(seconds);
				map.update();
				changeAmbient();
				player.update(controls.states, map, seconds);
				camera.render(player, map);
			});
		}

		function endGame() {
			soundManager.stopAll();
			let end = Calc.getRandomInt(0,2)
			sounds.playEnding(end);
			document.querySelector('.text').style.display = 'flex';
			let text = document.querySelector('.text h1');
			text.innerHTML = 'Are you sure you win';
			text.setAttribute('data-text','No one will help you.');
			document.querySelector('canvas').style.display = 'none';
		}
	};

	function enterFS(intro) {
		if (intro.requestFullscreen) {
		  	intro.requestFullscreen();
		} else if (intro.mozRequestFullScreen) {
		  	intro.mozRequestFullScreen();
		} else if (intro.webkitRequestFullscreen) {
		  	intro.webkitRequestFullscreen();
		}
	}

	function exitFS(intro) {
		if (intro.exitFullscreen) {
			intro.exitFullscreen();
		} else if (intro.mozExitFullScreen) {
			intro.mozExitFullScreen();
		} else if (intro.webkitExitFullscreen) {
			intro.webkitExitFullscreen();
		}
	}

	function mouseLock() {
		if (document.body.requestPointerLock) {
		  	document.body.requestPointerLock();
		} else if (document.body.mozRequestPointerLock) {
		  	document.body.mozRequestPointerLock();
		} else if (document.body.webkitRequestPointerLock) {
		  	document.body.webkitRequestPointerLock();
		}
	}

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
		state.fence_texture = "img/snow/fence_snow.png";
		state.sky_texture = "img/snow/sky_panorama_snow.jpg";
		state.wall_texture = "img/snow/wall_texture_snow.jpg";
	};
	function changeToVanilla() {
		state.winter = false;
		state.light = 2;
		state.lightning = true;
		state.lightRange = 5;
		state.shadows = "#000";
		state.drops = "#fff";
		state.drops_opacity = 0.15;
		state.drops_amount = 30;
		state.ground = "#56361f";
		state.param = 0.1;
		state.particlesWidth = 2;
		state.particlesHeight = 20;
		state.sky_texture = "img/rain/rain_sky_panorama.jpg";
		state.fence_texture = "img/rain/rain_fence.jpg";
		state.wall_texture = "img/rain/rain_wall_texture.jpg";
	};

	function changeAmbient() {
		if (noises.noises_end) {
			let next = Calc.getRandomInt(0,4)
			noises.playNoises(next);
		}
	}

	function enableMenuSounds() {
		sounds.loopSound('piano_menu_ambient');
		sounds.loopSound('static_menu_ambient');

		document.getElementById('play').addEventListener('mouseover', function(e){
			if (e.target.id == 'play') {
				sounds.loopSound("play_button_hover");
			}
		});

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
};
