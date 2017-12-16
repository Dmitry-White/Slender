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

	enableMenuSounds(sounds);
	setToVanilla(state);

	document.getElementById('checkbox').addEventListener('change', function(){
		if (this.checked) {
			document.querySelector(`.snow`).style.display = 'block';
			sounds.makeSound("ho_ho_ho");
			setToWinter(state);
		} else {
		   	document.querySelector(`.snow`).style.display = 'none';
			setToVanilla(state);
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

		/*let intro = document.querySelector('.intro');
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
 		},28000);*/

		map.objects.forEach((item)=>{
			if(item instanceof Person && item.alive) {
				map.people++;
			}
		});

		startGame();

		function startGame() {
			document.querySelector('.text').style.display = 'none';
			document.querySelector('canvas').style.display = 'block';
			loop.start(function frame(seconds) {
				if (state.lightning) map.lightning(seconds);
				map.update();
				changeAmbient(noises, Calc);
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
			text.innerHTML = 'Is it enough blood for you today?';
			text.setAttribute('data-text','No one will help you.');
			document.querySelector('canvas').style.display = 'none';
		}
	};

};
