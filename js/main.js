import { Player } from "./components/Player.js";
import { Map } from "./components/Map.js";
import { MapObject } from "./components/MapObject.js";
import { Objects } from "./components/Objects.js";
import { Controls } from "./components/Controls.js";
import { Camera } from "./components/Camera.js";
import { GameLoop } from "./components/GameLoop.js";
import { Bitmap } from "./components/Bitmap.js";
export const CIRCLE = Math.PI * 2;
export let camera = new Camera(display,1280, 0.8);

document.getElementById('play').addEventListener('click', function(){
	document.querySelector('canvas').style.display = 'block';
	let btns = document.getElementsByClassName('slider-title');
	document.querySelector('.menu').classList.add('fadeOut');
	setTimeout(()=>{
		document.querySelector('.menu').style.display = 'none';
	},500);
	let player = new Player(1, 1, 1);
	let map = new Map(14);
	let objects = new Objects(map);
	let controls = new Controls(player);
	let loop = new GameLoop();

	map.buildMap();

	map.addObject({
		color: '#cf3c8c', //цвет для ребят. если куст - не указывать
		texture: new Bitmap('img/cowboy.png', 639, 1500),
		height: .7,
		width: .225,
		floorOffset: 0,
		speed: .1//,
		//logic: badGuyLogic()
	},5,5);

	map.addObject({
		color: '#cf3c8c',
		texture: new Bitmap('img/cowboy.png', 639, 1500),
		height: .7,
		width: .225,
		floorOffset: 0,
		speed: .1//,
		//logic: badGuyLogic()
	},3,9);

	loop.start(function frame(seconds) {
	    //map.update(seconds); //молнии
	    objects.update();
	    player.update(controls.states, map, seconds);
	    camera.render(player, map, objects);
	});
});
