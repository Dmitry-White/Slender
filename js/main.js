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

const state = {}
export const CIRCLE = Math.PI * 2;
export const camera = new Camera(document.getElementById('display'), 640, 0.8, state);

window.onload = function() {

	const sounds = new Sounds();
	const noises = new Sounds();

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
		sounds.sound_end = true;

		document.querySelector('.menu').classList.add('fadeOut');
		setTimeout(()=>{
			document.querySelector('.menu').style.display = 'none';
		},700);

		loadGame();
	});

	function loadGame() {
		const papers = assets.papers;
		const map = new Map(32, state);
		const loop = new GameLoop(endGame);
		const obj_sounds = new Sounds(map, loop, state);
		const player = new Player({ x:1.5,
								   	y:1.5,
								   	direction:1,
								   	papers:papers,
								   	map:map,
								   	sounds:sounds,
								   	obj_sounds:obj_sounds,
							   	   	state:state });
		const controls = new Controls(player);
		let trees = assets.rain_trees;
		let bushes = assets.rain_bushes;

		setMode();

		addPeople();

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
			const end = Calc.getRandomInt(0,2)
			sounds.playEnding(end);
			document.querySelector('.text').style.display = 'flex';
			const text = document.querySelector('.text h1');
			text.innerHTML = 'Are you satisfied?';
			text.setAttribute('data-text','No No Nonono');
			document.querySelector('canvas').style.display = 'none';
		}

		function setMode() {
			if (state.winter) {
				sounds.loopSound('wind_ambient')
				trees = assets.trees;
				bushes = assets.bushes;
			} else sounds.loopSound('rain_ambient');
		};

		function addPeople() {
			for (let i = 0; i < 7; i++) {
				let x = Calc.getRandomInt(2,30)
				let y = Calc.getRandomInt(2,30)
				let pic_num = Calc.getRandomInt(1,5);
				console.log(pic_num);
				map.addObject(new Person(player,map,x,y,pic_num));
				map.people++;
			}
		};

	};

};
