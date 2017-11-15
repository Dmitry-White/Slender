import { Player } from "./components/Player.js";
import { Map } from "./components/Map.js";
import { Controls } from "./components/Controls.js";
import { Camera } from "./components/Camera.js";
import { GameLoop } from "./components/GameLoop.js";

export const CIRCLE = Math.PI * 2;
export const MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)

let display = document.getElementById('display');
let player = new Player(15.3, -1.2, Math.PI * 0.3);
let map = new Map(32);
let controls = new Controls(player);
let camera = new Camera(display, MOBILE ? 160 : 320, 0.8);
let loop = new GameLoop();

map.randomize();

loop.start(function frame(seconds) {
    map.update(seconds);
    player.update(controls.states, map, seconds);
    camera.render(player, map);
});
