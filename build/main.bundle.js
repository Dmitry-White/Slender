/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camera", function() { return camera; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Calc_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Map_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__json_assets_json__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__json_assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__json_assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Camera_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Sounds_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Player_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Bitmap_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Objects_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Controls_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_GameLoop_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Person_js__ = __webpack_require__(4);












let state = {};
const CIRCLE = Math.PI * 2;
/* harmony export (immutable) */ __webpack_exports__["CIRCLE"] = CIRCLE;

let camera = new __WEBPACK_IMPORTED_MODULE_3__components_Camera_js__["a" /* Camera */](document.getElementById('display'), 640, 0.8, state);

window.onload = function () {

	let sounds = new __WEBPACK_IMPORTED_MODULE_4__components_Sounds_js__["a" /* Sounds */]();
	let noises = new __WEBPACK_IMPORTED_MODULE_4__components_Sounds_js__["a" /* Sounds */]();

	enableMenuSounds();
	changeToVanilla();

	document.getElementById('checkbox').addEventListener('change', function () {
		if (this.checked) {
			document.querySelector(`.snow`).style.display = 'block';
			sounds.makeSound("ho_ho_ho");
			changeToWinter();
		} else {
			document.querySelector(`.snow`).style.display = 'none';
			changeToVanilla();
		}
	});

	document.getElementById('play').addEventListener('click', function () {
		soundManager.stopAll();

		document.querySelector('.menu').classList.add('fadeOut');
		setTimeout(() => {
			document.querySelector('.menu').style.display = 'none';
		}, 700);

		loadGame();
	});

	function loadGame() {
		let papers = __WEBPACK_IMPORTED_MODULE_2__json_assets_json__["assets"].papers;
		let map = new __WEBPACK_IMPORTED_MODULE_1__components_Map_js__["a" /* Map */](32, state);
		let loop = new __WEBPACK_IMPORTED_MODULE_9__components_GameLoop_js__["a" /* GameLoop */](endGame);
		let obj_sounds = new __WEBPACK_IMPORTED_MODULE_4__components_Sounds_js__["a" /* Sounds */](map, loop, state);
		let player = new __WEBPACK_IMPORTED_MODULE_5__components_Player_js__["a" /* Player */]({ x: 1.5,
			y: 1.5,
			direction: 1,
			papers: papers,
			map: map,
			sounds: sounds,
			obj_sounds: obj_sounds,
			state: state });
		let controls = new __WEBPACK_IMPORTED_MODULE_8__components_Controls_js__["a" /* Controls */](player);
		let trees = __WEBPACK_IMPORTED_MODULE_2__json_assets_json__["assets"].rain_trees;
		let bushes = __WEBPACK_IMPORTED_MODULE_2__json_assets_json__["assets"].rain_bushes;

		if (state.winter) {
			sounds.loopSound('wind_ambient');
			trees = __WEBPACK_IMPORTED_MODULE_2__json_assets_json__["assets"].trees;
			bushes = __WEBPACK_IMPORTED_MODULE_2__json_assets_json__["assets"].bushes;
		} else sounds.loopSound('rain_ambient');

		for (let i = 0; i < 7; i++) {
			let x = __WEBPACK_IMPORTED_MODULE_0__components_Calc_js__["a" /* Calc */].getRandomInt(2, 30);
			let y = __WEBPACK_IMPORTED_MODULE_0__components_Calc_js__["a" /* Calc */].getRandomInt(2, 30);
			map.addObject(new __WEBPACK_IMPORTED_MODULE_10__components_Person_js__["a" /* Person */](player, map, x, y));
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
  	mouseLock();
  		soundManager.play("entering_area",{
              multiShotEvents: true,
              onfinish: ()=> {
   				startGame();
              }
          });
  	},28000);
  */
		map.objects.forEach(item => {
			if (item instanceof __WEBPACK_IMPORTED_MODULE_10__components_Person_js__["a" /* Person */] && item.alive) {
				map.people++;
			}
		});

		startGame();

		function startGame() {
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
			console.log("The End!");
			soundManager.stopAll();
			let end = __WEBPACK_IMPORTED_MODULE_0__components_Calc_js__["a" /* Calc */].getRandomInt(0, 2);
			sounds.playEnding(end);
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
		console.log("!");
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
			let next = __WEBPACK_IMPORTED_MODULE_0__components_Calc_js__["a" /* Calc */].getRandomInt(0, 4);
			noises.playNoises(next);
		}
	}

	function enableMenuSounds() {
		sounds.loopSound('piano_menu_ambient');
		sounds.loopSound('static_menu_ambient');

		document.getElementById('play').addEventListener('mouseover', function (e) {
			if (e.target.id == 'play') {
				sounds.loopSound("play_button_hover");
			}
		});

		document.getElementById('play').addEventListener('mouseout', function (e) {
			if (e.target.id == 'play') {
				soundManager.stop('play_button_hover');
			}
		});

		document.getElementById('logo').addEventListener('mouseover', function () {
			sounds.loopSound("slender_logo_hover");
		});

		document.getElementById('logo').addEventListener('mouseout', function () {
			soundManager.stop('slender_logo_hover');
		});

		document.getElementById('about_us').addEventListener('mouseover', function () {
			sounds.loopSound("about_us");
			soundManager.mute('piano_menu_ambient');
		});

		document.getElementById('about_us').addEventListener('mouseout', function () {
			soundManager.stop('about_us');
			soundManager.unmute('piano_menu_ambient');
		});
		document.getElementById('about_game').addEventListener('mouseover', function () {
			sounds.loopSound("about_game");
			soundManager.mute('piano_menu_ambient');
		});

		document.getElementById('about_game').addEventListener('mouseout', function () {
			soundManager.stop('about_game');
			soundManager.unmute('piano_menu_ambient');
		});
	};
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Bitmap {
    constructor(src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bitmap;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Calc {
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    static getRandomFloat(min, max) {
        return min + Math.random() * (max + 1 - min);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Calc;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_js__ = __webpack_require__(0);



class Objects {
    constructor(object) {
        this.texture = object.texture || new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/trees/tree_1.png', 639, 1500), this.height = object.height || 1, this.width = 0.5, this.x = object.x, this.y = object.y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Objects;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bitmap_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Calc_js__ = __webpack_require__(2);




class Person {
    constructor(player, map, x, y) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.color = '#cf3c8c', this.texture = new __WEBPACK_IMPORTED_MODULE_1__Bitmap_js__["a" /* Bitmap */]('img/girl/girl.png', 639, 1500), this.height = .6, this.width = .225, this.floorOffset = 0, this.map = map;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
        this.count = 0;
        this.direction = 1;
        this.speed = .7;
        this.alive = true;
    }

    logic() {
        if (this.alive) {
            this.count += 1;

            if (this.count > 270) {
                this.direction = this.direction + __WEBPACK_IMPORTED_MODULE_2__Calc_js__["a" /* Calc */].getRandomFloat(-(__WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] / 6), __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] / 6);
                this.count = 0;
            }
            //this.turn();
            this.move('img/girl/girl');
            //this.run();
            this.walk(0.05 * this.speed, this.direction);
        }
    }
    /*turn(){
        let angle = this.direction;
        let url = 'img/girl/girl';
        if((angle < CIRCLE/4 && angle > 0) || (angle < CIRCLE && angle >= (CIRCLE - CIRCLE/4))){
            url = 'img/girl/girl_r';
        } else if(angle < (CIRCLE - CIRCLE/4) && angle >= CIRCLE/4){
            url = 'img/girl/girl_l';
        }
        this.move(url);
    }*/
    move(url) {
        if (this.count % 10 === 0) {
            if (this.count % 20 === 0) {
                this.texture = new __WEBPACK_IMPORTED_MODULE_1__Bitmap_js__["a" /* Bitmap */](url + '2.png', 639, 1500);
            } else this.texture = new __WEBPACK_IMPORTED_MODULE_1__Bitmap_js__["a" /* Bitmap */](url + '.png', 639, 1500);
        }
    }
    run() {
        let x = this.player.x - this.x;
        let y = this.player.y - this.y;
        if (Math.sqrt(x * x + y * y) < 2) {
            this.speed = 3;
            this.direction = -this.player.direction;
        } else this.speed = .7;
    }
    /*search(){
        let paper;
        this.map.objects.forEach((item)=>{
    		if(item instanceof Paper) paper = item;
    	});
        let x = this.x - paper.x;
        let y = this.y - paper.y;
        if(Math.sqrt(x*x+y*y) < 10){
          } else
    }*/

    walk(distance, direction) {
        let dx = Math.cos(direction) * distance;
        let dy = Math.sin(direction) * distance;
        let in_the_x_way = this.map.get(this.x + dx, this.y);
        let in_the_y_way = this.map.get(this.x, this.y + dy);

        if (in_the_x_way == 2 || in_the_y_way == 2) {
            this.hitting_the_fence = true;
            this.direction = direction + __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] / 6;
            this.walk(distance, this.map, this.direction);
        } else if (in_the_x_way == 1 || in_the_y_way == 1) {
            this.hitting_the_wall = true;
            this.direction = direction + __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] / 6;
            this.walk(distance, this.map, this.direction);
        }
        if (in_the_x_way <= 0) this.x += dx;
        if (in_the_y_way <= 0) this.y += dy;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Person;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Objects_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Person_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Calc_js__ = __webpack_require__(2);





class Map {
    constructor(size, state) {
        this.state = state;
        this.size = size;
        this.wallGrid = new Uint8Array(size * size);
        this.skybox = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */](state.sky_texture, 2000, 750);
        this.fenceTexture = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */](state.fence_texture, 1024, 1024);
        this.fenceDoorTexture = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/fence_door_0.jpg', 2048, 1024);
        this.wallTexture = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */](state.wall_texture, 1024, 1024);
        this.light = this.state.light;
        this.objects = [];
        this.people = 0;
    }

    get(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
        return this.wallGrid[y * this.size + x];
    }

    addTrees(trees, col, row) {
        if (this.get(col, row) == 0) {
            let num = __WEBPACK_IMPORTED_MODULE_3__Calc_js__["a" /* Calc */].getRandomInt(0, 4);
            this.addObject(new __WEBPACK_IMPORTED_MODULE_1__Objects_js__["a" /* Objects */]({
                texture: new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */](trees[num].texture, trees[num].width, trees[num].height),
                x: col,
                y: row
            }));
        };
    }

    addBushes(bushes, col, row) {
        if (this.get(col, row) == 0) {
            let num = __WEBPACK_IMPORTED_MODULE_3__Calc_js__["a" /* Calc */].getRandomInt(0, 5);
            this.addObject(new __WEBPACK_IMPORTED_MODULE_1__Objects_js__["a" /* Objects */]({
                texture: new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */](bushes[num].texture, bushes[num].width, bushes[num].height),
                height: 0.5,
                x: col,
                y: row
            }));
        };
    }

    buildMap(trees, bushes) {
        this.wallGrid.fill(0);
        for (let i = 0; i < this.size * this.size; i++) {
            let row = Math.floor(i / this.size);
            let col = i - this.size * row;
            // Generate the labirinth
            if (row !== 1 && row !== this.size - 2 && col !== 1 && col !== this.size - 2) {
                if (Math.random() > 0.2) {
                    Math.random() > 0.5 ? this.addBushes(bushes, col + 1.5, row + 1.5) : this.addTrees(trees, col + 1.5, row + 1.5);
                }
                if (Math.random() > 0.7) {
                    this.wallGrid[i] = 1;
                }
            }
            // Generate the fence
            if (row === 0 || row === this.size - 1 || col === 0 || col === this.size - 1) {
                this.wallGrid[i] = 2;
            }
        };
        this.wallGrid[1] = 3;
    }

    cast(point, angle, range) {
        let self = this;
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        let noWall = { length2: Infinity };

        return ray({
            x: point.x,
            y: point.y,
            height: 0,
            distance: 0
        });

        function ray(origin) {
            let stepX = step(sin, cos, origin.x, origin.y);
            let stepY = step(cos, sin, origin.y, origin.x, true);
            let nextStep = stepX.length2 < stepY.length2 ? inspect(stepX, 1, 0, origin.distance, stepX.y) : inspect(stepY, 0, 1, origin.distance, stepY.x);

            if (nextStep.distance > range) return [origin];
            return [origin].concat(ray(nextStep));
        }

        function step(rise, run, x, y, inverted) {
            if (run === 0) return noWall;
            let dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
            let dy = dx * (rise / run);
            return {
                x: inverted ? y + dy : x + dx,
                y: inverted ? x + dx : y + dy,
                length2: dx * dx + dy * dy
            };
        }

        function inspect(step, shiftX, shiftY, distance, offset) {
            let dx = cos < 0 ? shiftX : 0;
            let dy = sin < 0 ? shiftY : 0;
            step.height = self.get(step.x - dx, step.y - dy);
            step.distance = distance + Math.sqrt(step.length2);
            step.object = self.getObject(step.x - dx, step.y - dy);
            if (shiftX) step.shading = cos < 0 ? 2 : 0;else step.shading = sin < 0 ? 2 : 1;
            step.offset = offset - Math.floor(offset);
            return step;
        }
    }

    lightning(seconds) {
        // --------------------- Random Lighting -------------------------------
        if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);else if (Math.random() * 5 < seconds) this.light = 2;
        // ---------------------------------------------------------------------

        //this.light = Math.max(this.light - 10 * seconds, 0.4);  // nigth mode
        //this.light = 2; //day mode
    }

    update() {
        this.objects.forEach(function (item) {
            if (item instanceof __WEBPACK_IMPORTED_MODULE_2__Person_js__["a" /* Person */]) {
                item.logic();
            }
        });
    }

    addObject(object) {
        this.objects.push(object);
    }

    getObject(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        return this.objects[y * this.size + x];
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"assets":{"trees":{"0":{"texture":"img/trees/tree_0.png","width":200,"height":200},"1":{"texture":"img/trees/tree_1.png","width":200,"height":200},"2":{"texture":"img/trees/tree_2.png","width":200,"height":200},"3":{"texture":"img/trees/tree_3.png","width":200,"height":200}},"rain_trees":{"0":{"texture":"img/trees/rain_tree_0.png","width":200,"height":200},"1":{"texture":"img/trees/rain_tree_1.png","width":200,"height":200},"2":{"texture":"img/trees/rain_tree_2.png","width":200,"height":200},"3":{"texture":"img/trees/rain_tree_3.png","width":200,"height":200}},"bushes":{"0":{"texture":"img/bushes/bush_0.png","width":200,"height":109},"1":{"texture":"img/bushes/bush_1.png","width":200,"height":105},"2":{"texture":"img/bushes/bush_2.png","width":200,"height":311},"3":{"texture":"img/bushes/bush_3.png","width":200,"height":168},"4":{"texture":"img/bushes/bush_4.png","width":200,"height":278}},"rain_bushes":{"0":{"texture":"img/bushes/rain_bush_0.png","width":200,"height":152},"1":{"texture":"img/bushes/rain_bush_1.png","width":200,"height":138},"2":{"texture":"img/bushes/rain_bush_2.png","width":217,"height":200},"3":{"texture":"img/bushes/rain_bush_3.png","width":201,"height":200},"4":{"texture":"img/bushes/rain_bush_4.png","width":200,"height":200}},"papers":{"0":{"texture":"img/papers/paper_0.png","width":118,"height":100},"1":{"texture":"img/papers/paper_1.png","width":145,"height":100},"2":{"texture":"img/papers/paper_2.png","width":100,"height":100},"3":{"texture":"img/papers/paper_3.png","width":207,"height":100},"4":{"texture":"img/papers/paper_4.png","width":133,"height":100},"5":{"texture":"img/papers/paper_5.png","width":195,"height":100},"6":{"texture":"img/papers/paper_6.png","width":310,"height":100},"7":{"texture":"img/papers/paper_7.png","width":164,"height":100}}}}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Objects_js__ = __webpack_require__(3);




class Camera {
    constructor(canvas, resolution, fov, state) {
        this.state = state;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;
        this.resolution = resolution;
        this.spacing = this.width / resolution;
        this.fov = fov;
        this.range = 14;
        this.scale = (this.width + this.height) / 1200;
    }

    render(player, map) {
        this.drawSky(player.direction, map.skybox, map.light);
        this.drawColumns(player, map);
        this.drawWeapon(player.left_hand, player.right_hand, player.paces);
        this.drawMiniMap(player, map);
    }

    drawSky(direction, sky, ambient) {
        let width = sky.width * (this.height / sky.height) * 2;
        let left = -width * direction / __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"];

        this.ctx.save();
        this.ctx.drawImage(sky.image, left, 0, width, this.height);
        if (left < width - this.width) {
            this.ctx.drawImage(sky.image, left + width, 0, width, this.height);
        }

        if (ambient > 0) {
            this.ctx.fillStyle = this.state.ground;
            this.ctx.globalAlpha = ambient * this.state.param;
            this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
        }
        this.ctx.restore();
    }

    drawColumn(column, ray, angle, map) {
        this.lightRange = this.state.lightRange;
        let ctx = this.ctx;
        let wallTexture = map.wallTexture;
        let left = Math.floor(column * this.spacing);
        let width = Math.ceil(this.spacing);
        let hit = -1;
        let objects = [];
        let hitDistance;
        let step;

        while (++hit < ray.length && ray[hit].height <= 0);

        for (let s = ray.length - 1; s >= 0; s--) {
            step = ray[s];
            if (step.height === 3) {
                wallTexture = map.fenceDoorTexture;
                step.height = 1;
            } else if (step.height === 2) {
                wallTexture = map.fenceTexture;
                step.height = 1;
            } else wallTexture = map.wallTexture;

            let drops_seed = 0;
            this.state.winter ? drops_seed = 3 : drops_seed = s;

            let rainDrops = Math.pow(Math.random(), this.state.drops_amount) * drops_seed;
            let rain = rainDrops > 0 && this.project(0.1, angle, step.distance);
            let textureX, wall;

            if (s === hit) {
                textureX = Math.floor(wallTexture.width * step.offset);
                wall = this.project(step.height, angle, step.distance);

                ctx.globalAlpha = 1;
                ctx.drawImage(wallTexture.image, textureX, 0, 1, wallTexture.height, left, wall.top, width, wall.height);

                ctx.fillStyle = this.state.shadows;
                this.shading = step.shading;
                ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange - map.light, 0);
                ctx.fillRect(left, wall.top, width, wall.height);
                hitDistance = step.distance;
            } else if (step.object) {

                objects.push({
                    object: step.object,
                    distance: step.distance,
                    offset: step.offset,
                    angle: angle
                });
            }
            ctx.fillStyle = this.state.drops;
            ctx.globalAlpha = this.state.drops_opacity;
            while (--rainDrops > 0) ctx.fillRect(left, Math.random() * rain.top, this.state.particlesWidth, this.state.particlesHeight);
        }
        return {
            objects: objects,
            hit: hitDistance
        };
    }

    drawColumns(player, map) {
        this.ctx.save();
        let allObjects = [];
        for (let column = 0; column < this.resolution; column++) {
            let angle = this.fov * (column / this.resolution - 0.5);
            let ray = map.cast(player, player.direction + angle, this.range);
            let columnProps = this.drawColumn(column, ray, angle, map);

            allObjects.push(columnProps);
        }
        this.drawSprites(player, map, allObjects);
        this.ctx.restore();
    }

    drawSprites(player, map, columnProps) {
        let screenWidth = this.width;
        let screenHeight = this.height;
        let screenRatio = screenWidth / this.fov;
        let resolution = this.resolution;

        // calculate each sprite distance to player
        this.setSpriteDistances(map.objects, player);

        var sprites = Array.prototype.slice.call(map.objects).map(function (sprite) {
            let distX = sprite.x - player.x;
            let distY = sprite.y - player.y;
            let width = sprite.width * screenWidth / sprite.distanceFromPlayer;
            let height = sprite.height * screenHeight / sprite.distanceFromPlayer;
            let renderedFloorOffset = sprite.floorOffset / sprite.distanceFromPlayer;
            let angleToPlayer = Math.atan2(distY, distX);
            let angleRelativeToPlayerView = player.direction - angleToPlayer;
            let top = screenHeight / 2 * (1 + 1 / sprite.distanceFromPlayer) - height;

            if (angleRelativeToPlayerView >= __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] / 2) {
                angleRelativeToPlayerView -= __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"];
            }

            let cameraXOffset = __WEBPACK_IMPORTED_MODULE_0__main_js__["camera"].width / 2 - screenRatio * angleRelativeToPlayerView;
            let numColumns = width / screenWidth * resolution;
            let firstColumn = Math.floor((cameraXOffset - width / 2) / screenWidth * resolution);

            sprite.distanceFromPlayer = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            sprite.render = {
                width: width,
                height: height,
                angleToPlayer: angleRelativeToPlayerView,
                cameraXOffset: cameraXOffset,
                distanceFromPlayer: sprite.distanceFromPlayer,
                numColumns: numColumns,
                firstColumn: firstColumn,
                top: top
            };
            return sprite;
        })
        // sort sprites in distance order
        .sort(function (a, b) {
            if (a.distanceFromPlayer < b.distanceFromPlayer) {
                return 1;
            }
            if (a.distanceFromPlayer > b.distanceFromPlayer) {
                return -1;
            }
            return 0;
        });

        this.ctx.save();
        for (var column = 0; column < this.resolution; column++) {
            this.drawSpriteColumn(player, map, column, columnProps[column], sprites);
        }
        this.ctx.restore();
    }

    drawSpriteColumn(player, map, column, columnProps, sprites) {
        let ctx = this.ctx;
        let left = Math.floor(column * this.spacing);
        let width = Math.ceil(this.spacing);
        let angle = this.fov * (column / this.resolution - 0.5);
        let columnWidth = this.width / this.resolution;
        let sprite, props, obj, textureX, height, projection, mappedColumnObj, spriteIsInColumn, top;

        sprites = sprites.filter(function (sprite) {
            return !columnProps.hit || sprite.distanceFromPlayer < columnProps.hit;
        });

        for (let i = 0; i < sprites.length; i++) {
            sprite = sprites[i];
            spriteIsInColumn = left > sprite.render.cameraXOffset - sprite.render.width / 2 && left < sprite.render.cameraXOffset + sprite.render.width / 2;

            if (spriteIsInColumn) {
                textureX = Math.floor(sprite.texture.width / sprite.render.numColumns * (column - sprite.render.firstColumn));
                ctx.drawImage(sprite.texture.image, textureX, 0, 1, sprite.texture.height, left, sprite.render.top, width, sprite.render.height);
                this.ctx.fillStyle = '#000';
                this.ctx.globalAlpha = 1;
            }
        };
    }

    setSpriteDistances(objects, player) {
        let obj;
        for (let i = 0; i < objects.length; i++) {
            obj = objects[i];
        }
    }

    drawWeapon(left_hand, right_hand, paces) {
        let bobX = Math.cos(paces * 2) * this.scale * 6;
        let bobY = Math.sin(paces * 4) * this.scale * 6;
        let left_r = this.width * 0.6 + bobX;
        let left_l = this.width * 0.15 + bobX;
        let top = this.height * 0.6 + bobY;
        this.ctx.drawImage(left_hand.image, left_l, top, left_hand.width * this.scale, left_hand.height * this.scale);
        this.ctx.drawImage(right_hand.image, left_r, top, right_hand.width * this.scale, right_hand.height * this.scale);
    }

    drawMiniMap(player, map) {
        let ctx = this.ctx;
        let miniMapSize = this.width * .2;
        let x = this.width - miniMapSize - 10; //отступы
        let y = 10; //отступы
        let blockSize = miniMapSize / map.size;
        let triangleX = x + player.x / map.size * miniMapSize;
        let triangleY = y + player.y / map.size * miniMapSize;

        ctx.save();

        ctx.globalAlpha = .5; //фон карты
        ctx.fillRect(x, y, miniMapSize, miniMapSize);

        ctx.globalAlpha = .5; //блоки
        ctx.fillStyle = '#4c8847';

        for (let i = 0; i < map.size * map.size; i++) {
            if (map.wallGrid[i]) {
                if (map.wallGrid[i] === 2) {
                    ctx.fillStyle = '#35384b';
                } else ctx.fillStyle = '#4c8847';
                let row = Math.floor(i / map.size);
                let col = i - map.size * row;
                ctx.fillRect(x + blockSize * col, y + blockSize * row, blockSize, blockSize);
            }
        }
        ctx.save();

        for (let i = 0; i < map.objects.length; i++) {
            //спрайты
            if (map.objects[i]) {
                if (map.objects[i] === 1) ctx.fillStyle = map.objects[i].color; //не трогать, так надо!!!!
                ctx.globalAlpha = map.objects[i].logic ? .8 : .3;
                if (map.objects[i].color === undefined) ctx.globalAlpha = 0;
                ctx.fillStyle = map.objects[i].color || 'red'; //не трогать, так надо!!!!

                ctx.fillRect(x + blockSize * (map.objects[i].x - 0.5) + blockSize * .25, y + blockSize * (map.objects[i].y - 0.5) + blockSize * .25, blockSize * .5, blockSize * .5);
            }
        }
        ctx.restore();

        ctx.globalAlpha = 1; //игрок
        ctx.fillStyle = '#fff';
        ctx.moveTo(triangleX, triangleY);
        ctx.translate(triangleX, triangleY);

        ctx.rotate(player.direction - Math.PI * .5);
        ctx.beginPath();
        ctx.lineTo(-2, -3); // bottom left of triangle
        ctx.lineTo(0, 2); // tip of triangle
        ctx.lineTo(2, -3); // bottom right of triangle
        ctx.fill();

        ctx.restore();
    }

    project(height, angle, distance) {
        let z = distance * Math.cos(angle);
        let wallHeight = this.height * height / z;
        let bottom = this.height / 2 * (1 + 1 / z);
        return {
            top: bottom - wallHeight,
            bottom: bottom,
            height: wallHeight
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sounds {
    constructor(map = "", loop = "", state = "") {
        this.map = map;
        this.loop = loop;
        this.state = state;
        this.sound_end = true;
        this.obj_sound_end = true;
        this.noises_end = true;
        this.noises = {
            0: 'ghost_in_the_house',
            1: 'just_horror_ambient',
            2: 'weird_noises',
            3: 'scary_piano'
        };
        this.ending = {
            0: 'come_out',
            1: 'lululala'
        };
        soundManager.setup({
            url: './soundmanager2/',
            onready: function () {
                // ------------------ Menu ------------------------
                let piano_menu_ambient = soundManager.createSound({
                    id: 'piano_menu_ambient',
                    url: 'sounds/ambient/piano_menu_ambient.mp3'
                });
                let static_menu_ambient = soundManager.createSound({
                    id: 'static_menu_ambient',
                    url: 'sounds/ambient/static_menu_ambient.mp3',
                    volume: 50
                });
                let slender_logo_hover = soundManager.createSound({
                    id: 'slender_logo_hover',
                    url: 'sounds/menu/slender_logo_hover.mp3'
                });
                let play_button_hover = soundManager.createSound({
                    id: 'play_button_hover',
                    url: 'sounds/menu/play_button_hover.mp3'
                });
                let ho_ho_ho = soundManager.createSound({
                    id: 'ho_ho_ho',
                    url: 'sounds/menu/ho_ho_ho.mp3'
                });
                let about_us = soundManager.createSound({
                    id: 'about_us',
                    url: 'sounds/menu/about_us.mp3'
                });
                let about_game = soundManager.createSound({
                    id: 'about_game',
                    url: 'sounds/menu/about_game.mp3'
                });
                // ------------------------------------------------

                // --------------- Winter Mode --------------------
                let wind_ambient = soundManager.createSound({
                    id: 'wind_ambient',
                    url: 'sounds/ambient/wind_ambient.mp3'
                });
                let forward_step = soundManager.createSound({
                    id: 'forward_step',
                    url: 'sounds/walking/forward_step.mp3'
                });
                let backward_step = soundManager.createSound({
                    id: 'backward_step',
                    url: 'sounds/walking/backward_step.mp3'
                });
                let dodge_step_0 = soundManager.createSound({
                    id: 'dodge_step_0',
                    url: 'sounds/walking/dodge_step_0.mp3'
                });
                let dodge_step_1 = soundManager.createSound({
                    id: 'dodge_step_1',
                    url: 'sounds/walking/dodge_step_1.mp3'
                });
                let running = soundManager.createSound({
                    id: 'running',
                    url: 'sounds/walking/running.mp3'
                });
                // ------------------------------------------------

                // --------------- Vanilla Mode -------------------
                let rain_ambient = soundManager.createSound({
                    id: 'rain_ambient',
                    url: 'sounds/ambient/rain_ambient.mp3',
                    volume: 70
                });
                let rain_forward_step = soundManager.createSound({
                    id: 'rain_forward_step',
                    url: 'sounds/walking/rain_forward_step.mp3'
                });
                let rain_backward_step = soundManager.createSound({
                    id: 'rain_backward_step',
                    url: 'sounds/walking/rain_backward_step.mp3'
                });
                let rain_step = soundManager.createSound({
                    id: 'rain_step',
                    url: 'sounds/walking/rain_step.mp3'
                });
                let rain_dodge_step_0 = soundManager.createSound({
                    id: 'rain_dodge_step_0',
                    url: 'sounds/walking/rain_dodge_step_0.mp3'
                });
                let rain_dodge_step_1 = soundManager.createSound({
                    id: 'rain_dodge_step_1',
                    url: 'sounds/walking/rain_dodge_step_1.mp3'
                });
                let rain_running = soundManager.createSound({
                    id: 'rain_running',
                    url: 'sounds/walking/rain_running.mp3'
                });
                // ------------------------------------------------

                // --------------- General Stuff ------------------
                let entering_area = soundManager.createSound({
                    id: 'entering_area',
                    url: 'sounds/objects/entering_area.mp3'
                });
                let hitting_the_fence = soundManager.createSound({
                    id: 'hitting_the_fence',
                    url: 'sounds/objects/hitting_the_fence.mp3'
                });
                let hitting_the_rain_fence = soundManager.createSound({
                    id: 'hitting_the_rain_fence',
                    url: 'sounds/objects/hitting_the_rain_fence.mp3',
                    volume: 50
                });
                let hitting_the_wall = soundManager.createSound({
                    id: 'hitting_the_wall',
                    url: 'sounds/objects/hitting_the_wall.mp3'
                });
                let placing_paper = soundManager.createSound({
                    id: 'placing_paper',
                    url: 'sounds/objects/placing_paper.mp3'
                });
                let placing_loo_paper = soundManager.createSound({
                    id: 'placing_loo_paper',
                    url: 'sounds/objects/placing_loo_paper.mp3'
                });
                let placing_bomb = soundManager.createSound({
                    id: 'placing_bomb',
                    url: 'sounds/objects/placing_bomb.mp3'
                });
                let killing = soundManager.createSound({
                    id: 'killing',
                    url: 'sounds/objects/killing.mp3'
                });
                // ------------------------------------------------

                // --------------- Random Ambient -----------------
                let ghost_in_the_house = soundManager.createSound({
                    id: 'ghost_in_the_house',
                    url: 'sounds/ambient/ghost_in_the_house.mp3'
                });
                let just_horror_ambient = soundManager.createSound({
                    id: 'just_horror_ambient',
                    url: 'sounds/ambient/just_horror_ambient.mp3'
                });
                let weird_noises = soundManager.createSound({
                    id: 'weird_noises',
                    url: 'sounds/ambient/weird_noises.mp3'
                });
                let scary_piano = soundManager.createSound({
                    id: 'scary_piano',
                    url: 'sounds/ambient/scary_piano.mp3'
                });
                // ------------------------------------------------

                // ------------------ End Game --------------------
                let ghost_scream = soundManager.createSound({
                    id: 'ghost_scream',
                    url: 'sounds/ending/ghost_scream.mp3'
                });
                let come_out = soundManager.createSound({
                    id: 'come_out',
                    url: 'sounds/ending/come_out.mp3'
                });
                let lululala = soundManager.createSound({
                    id: 'lululala',
                    url: 'sounds/ending/lululala.mp3'
                });
                // ------------------------------------------------
            }
        });
    }

    loopSound(sound_id) {
        soundManager.play(sound_id, {
            multiShotEvents: true,
            onfinish: () => {
                this.loopSound(sound_id);
            }
        });
    }

    makeSound(sound_id) {
        this.sound_end = false;
        soundManager.play(sound_id, {
            multiShotEvents: true,
            onfinish: () => {
                this.sound_end = true;
                this.checkGameEnding();
            }
        });
    }

    makeObjSound(sound_id) {
        self = this;
        self.obj_sound_end = false;
        soundManager.play(sound_id, {
            multiShotEvents: true,
            onfinish: () => {
                self.obj_sound_end = true;
            }
        });
    }
    playNoises(noise_num) {
        this.noises_end = false;
        soundManager.play(this.noises[noise_num], {
            multiShotEvents: true,
            onfinish: () => {
                this.noises_end = true;
            }
        });
    }

    checkGameEnding() {
        if (this.map.people === 0) {
            this.state.drops = "#f00";
            this.state.ground = "#f00";
            this.state.lightning = false;
            this.map.light = 2;
            this.state.param = 20;
            this.state.drops_opacity = 1;
            this.state.particlesWidth = 10;
            this.state.particlesHeight = 10;
            soundManager.play("ghost_scream", {
                onfinish: () => {
                    this.loop.game_ending = true;
                }
            });
        }
    }

    playEnding(ending_num) {
        soundManager.play(this.ending[ending_num], {
            onfinish: () => {
                location.reload();
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sounds;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Paper_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bitmap_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Calc_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Person_js__ = __webpack_require__(4);






class Player {
    constructor(origin) {
        this.x = origin.x;
        this.y = origin.y;
        this.direction = origin.direction;
        this.papers = origin.papers;
        this.map = origin.map;
        this.sounds = origin.sounds;
        this.obj_sounds = origin.obj_sounds;
        this.state = origin.state;
        this.right_hand = new __WEBPACK_IMPORTED_MODULE_2__Bitmap_js__["a" /* Bitmap */]('img/slender/knife_hand.png', 200, 200);
        this.left_hand = new __WEBPACK_IMPORTED_MODULE_2__Bitmap_js__["a" /* Bitmap */]('img/slender/left_hand.png', 200, 200);
        this.paces = 0;
        this.paper = new __WEBPACK_IMPORTED_MODULE_0__Paper_js__["a" /* Paper */](0, 0);
        this.speed = 1;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
    }

    rotate(angle) {
        this.direction = (this.direction + angle + __WEBPACK_IMPORTED_MODULE_1__main_js__["CIRCLE"]) % __WEBPACK_IMPORTED_MODULE_1__main_js__["CIRCLE"];
    }

    walk(distance, map, direction) {
        let dx = Math.cos(direction) * distance;
        let dy = Math.sin(direction) * distance;
        let in_the_x_way = map.get(this.x + dx, this.y);
        let in_the_y_way = map.get(this.x, this.y + dy);

        if (in_the_x_way == 2 || in_the_y_way == 2) {
            this.hitting_the_fence = true;
            this.hitObject();
            this.hitting_the_fence = false;
        } else if (in_the_x_way == 1 || in_the_y_way == 1) {
            this.hitting_the_wall = true;
            this.hitObject();
            this.hitting_the_wall = false;
        }
        if (in_the_x_way <= 0) this.x += dx;
        if (in_the_y_way <= 0) this.y += dy;
        this.paces += distance;
    }

    update(controls, map, seconds) {
        this.running = controls.shift;
        this.walking = controls.forward || controls.backward || controls.sideLeft || controls.sideRight;
        if (controls.left) this.rotate(-Math.PI * seconds);
        if (controls.right) this.rotate(Math.PI * seconds);
        if (controls.forward) {
            this.walkSound();
            this.walk(this.speed * seconds, map, this.direction);
        }
        if (controls.backward) {
            this.walkSound();
            this.walk(-this.speed * seconds, map, this.direction);
        }
        if (controls.sideLeft) {
            this.dodgeSound();
            this.walk(this.speed / 2 * seconds, map, this.direction - Math.PI / 2);
        }
        if (controls.sideRight) {
            this.dodgeSound();
            this.walk(-(this.speed / 2) * seconds, map, this.direction - Math.PI / 2);
        }
        controls.shift ? this.speed = 3 : this.speed = 1;
    }

    eat(person) {
        let x = this.x - person.x;
        let y = this.y - person.y;
        if (Math.sqrt(x * x + y * y) < 0.2) {
            this.obj_sounds.makeSound('killing');
            person.alive = false;
            person.texture = new __WEBPACK_IMPORTED_MODULE_2__Bitmap_js__["a" /* Bitmap */]('img/girl/girl_f.png', 639, 1500);
            setTimeout(() => {
                person.texture = new __WEBPACK_IMPORTED_MODULE_2__Bitmap_js__["a" /* Bitmap */]('img/girl/girl3.png', 700, 900);
            }, 7000);
            this.map.people--;
        }
    }

    snowWalkSound() {
        if (this.sounds.sound_end) {
            if (this.running) {
                this.sounds.makeSound('running');
            } else {
                Math.random() > 0.5 ? this.sounds.makeSound('forward_step') : this.sounds.makeSound('backward_step');
            }
        }
    }

    snowDodgeSound() {
        if (this.sounds.sound_end) {
            Math.random() > 0.5 ? this.sounds.makeSound('dodge_step_0') : this.sounds.makeSound('dodge_step_1');
        }
    }

    rainWalkSound() {
        if (this.sounds.sound_end) {
            if (this.running) {
                this.sounds.makeSound('rain_running');
            } else {
                if (Math.random() > 0.2) {
                    if (Math.random() > 0.5) {
                        this.sounds.makeSound('rain_forward_step');
                    } else {
                        this.sounds.makeSound('rain_backward_step');
                    }
                } else {
                    this.sounds.makeSound('rain_step');
                }
            }
        }
    }

    rainDodgeSound() {
        if (this.sounds.sound_end) {
            Math.random() > 0.5 ? this.sounds.makeSound('rain_dodge_step_0') : this.sounds.makeSound('rain_dodge_step_1');
        }
    }

    hitObject() {
        this.state.winter ? this.snowHit() : this.rainHit();
    }

    snowHit() {
        if (this.obj_sounds.obj_sound_end) {
            if (this.hitting_the_fence) {
                this.obj_sounds.makeObjSound('hitting_the_fence');
            } else if (this.hitting_the_wall) {
                this.obj_sounds.makeObjSound('hitting_the_wall');
            }
        }
    }
    rainHit() {
        if (this.obj_sounds.obj_sound_end) {
            if (this.hitting_the_fence) {
                this.obj_sounds.makeObjSound('hitting_the_rain_fence');
                this.hitting_the_fence = false;
            } else if (this.hitting_the_wall) {
                this.obj_sounds.makeObjSound('hitting_the_wall');
                this.hitting_the_wall = false;
            }
        }
    }

    walkSound() {
        this.state.winter ? this.snowWalkSound() : this.rainWalkSound();
    }

    dodgeSound() {
        this.state.winter ? this.snowDodgeSound() : this.rainDodgeSound();
    }

    dosmth(action) {
        if (action === 'atac') {
            this.map.objects.forEach(item => {
                if (item instanceof __WEBPACK_IMPORTED_MODULE_4__Person_js__["a" /* Person */] && item.alive) {
                    this.eat(item);
                }
            });
        }
        if (action === 'space') {
            if (!this.running && !this.walking && this.sounds.sound_end) {
                let paper_type = __WEBPACK_IMPORTED_MODULE_3__Calc_js__["a" /* Calc */].getRandomInt(0, 8);
                this.map.addObject(new __WEBPACK_IMPORTED_MODULE_0__Paper_js__["a" /* Paper */](this.x, this.y, new __WEBPACK_IMPORTED_MODULE_2__Bitmap_js__["a" /* Bitmap */](this.papers[paper_type].texture, this.papers[paper_type].width, this.papers[paper_type].height)));
                if (paper_type === 0) {
                    this.sounds.makeSound('placing_loo_paper');
                } else if (paper_type === 7) {
                    this.sounds.makeSound('placing_bomb');
                } else {
                    this.sounds.makeSound('placing_paper');
                }
            } else console.log("You can't place a paper while moving!");
        }
        if (action === 'escape') location.reload();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Paper {
    constructor(x, y, texture) {
        this.color = '#fff', this.x = x, this.y = y, this.height = 0.2, this.width = 0.2, this.texture = texture;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Paper;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Controls {
    constructor(player) {
        this.player = player;
        this.codes = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward', 65: 'sideLeft',
            68: 'sideRight', 87: 'forward', 83: 'backward', 13: 'enter', 16: 'shift',
            32: "space", 27: 'escape', 69: 'atac' };
        this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false,
            'shift': false, 'sideLeft': false, 'sideRight': false };
        document.addEventListener('keydown', this.onKey.bind(this, true), false);
        document.addEventListener('keyup', this.onKey.bind(this, false), false);
        document.addEventListener('touchstart', this.onTouch.bind(this), false);
        document.addEventListener('touchmove', this.onTouch.bind(this), false);
        document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
        document.addEventListener('mousemove', this.onMouseMovement.bind(this), false);
        document.querySelector('canvas').onclick = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
    }

    onTouch(e) {
        let t = e.touches[0];
        this.onTouchEnd(e);
        if (t.pageY < window.innerHeight * 0.5) this.onKey(true, { keyCode: 38 });else if (t.pageX < window.innerWidth * 0.5) this.onKey(true, { keyCode: 37 });else if (t.pageY > window.innerWidth * 0.5) this.onKey(true, { keyCode: 39 });
    }

    onTouchEnd(e) {
        this.states = {
            left: false,
            right: false,
            forward: false,
            backward: false,
            sideLeft: false,
            sideRight: false,
            shift: false
        };
        e.preventDefault();
        e.stopPropagation();
    }

    onKey(val, e) {
        let state = this.codes[e.keyCode];
        if (typeof state === 'undefined') return;
        if (typeof this.states[state] !== 'undefined') this.states[state] = val; //если не найдено в состояниях
        else if (val === true) this.player.dosmth(state); //искать в действиях; если кнопка опущена - выполнить
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    }

    onMouseMovement(e) {
        let x = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        if (x > 0) this.player.rotate(Math.PI / 40);
        if (x < 0) this.player.rotate(-Math.PI / 40);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controls;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameLoop {
    constructor(endGame) {
        this.endGame = endGame;
        this.game_ending = false;
        this.frame = this.frame.bind(this);
        this.lastTime = 0;
        this.callback = function () {};
    }

    start(callback, endGame) {
        this.callback = callback;
        requestAnimationFrame(this.frame);
        return;
    }

    frame(time) {
        let seconds = (time - this.lastTime) / 1000;
        this.lastTime = time;
        if (seconds < 0.2) this.callback(seconds);
        if (this.game_ending) {
            this.endGame();
            return;
        }
        requestAnimationFrame(this.frame);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameLoop;


/***/ })
/******/ ]);