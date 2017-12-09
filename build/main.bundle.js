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
<<<<<<< Updated upstream
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Player_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Map_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Controls_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Camera_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_GameLoop_js__ = __webpack_require__(9);
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camera", function() { return camera; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Player_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Map_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MapObject_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Objects_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Controls_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Camera_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_GameLoop_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Bitmap_js__ = __webpack_require__(1);


>>>>>>> Stashed changes






const CIRCLE = Math.PI * 2;
/* harmony export (immutable) */ __webpack_exports__["CIRCLE"] = CIRCLE;

const MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
/* harmony export (immutable) */ __webpack_exports__["MOBILE"] = MOBILE;

let display = document.getElementById('display');
let player = new __WEBPACK_IMPORTED_MODULE_0__components_Player_js__["a" /* Player */](2, 2, 0);
let map = new __WEBPACK_IMPORTED_MODULE_1__components_Map_js__["a" /* Map */](12);
<<<<<<< Updated upstream
let controls = new __WEBPACK_IMPORTED_MODULE_2__components_Controls_js__["a" /* Controls */](player);
let camera = new __WEBPACK_IMPORTED_MODULE_3__components_Camera_js__["a" /* Camera */](display, MOBILE ? 160 : 320, 0.8);
let loop = new __WEBPACK_IMPORTED_MODULE_4__components_GameLoop_js__["a" /* GameLoop */]();

map.fillTheMap();
//map.randomize();
// tupo proverit push-push vaka-vaka

loop.start(function frame(seconds) {
    map.update(seconds); //молнии
    player.update(controls.states, map, seconds);
    camera.render(player, map);
=======
let objects = new __WEBPACK_IMPORTED_MODULE_3__components_Objects_js__["a" /* Objects */](map);
let controls = new __WEBPACK_IMPORTED_MODULE_4__components_Controls_js__["a" /* Controls */](player);
let camera = new __WEBPACK_IMPORTED_MODULE_5__components_Camera_js__["a" /* Camera */](display, MOBILE ? 160 : 320, 0.8);
let loop = new __WEBPACK_IMPORTED_MODULE_6__components_GameLoop_js__["a" /* GameLoop */]();
map.fillTheMap(); //map.randomize();

map.addObject({
  color: 'brown',
  texture: new __WEBPACK_IMPORTED_MODULE_7__components_Bitmap_js__["a" /* Bitmap */]('img/cowboy.png', 639, 1500),
  height: .7,
  width: .225,
  floorOffset: 0,
  speed: .1 //,
  //logic: badGuyLogic()

}, 5, 5);
map.addObject({
  color: 'green',
  texture: new __WEBPACK_IMPORTED_MODULE_7__components_Bitmap_js__["a" /* Bitmap */]('img/cowboy.png', 639, 1500),
  height: .7,
  width: .225,
  floorOffset: 0,
  speed: .1 //,
  //logic: badGuyLogic()

}, 3, 9);
loop.start(function frame(seconds) {
  map.update(seconds); //молнии

  objects.update();
  player.update(controls.states, map, seconds);
  camera.render(player, map, objects);
>>>>>>> Stashed changes
});

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
<<<<<<< Updated upstream
=======
class MapObject {
  constructor(object, x, y) {
    for (var prop in object) {
      this[prop] = object[prop];
    }

    this.x = x;
    this.y = y;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapObject;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
>>>>>>> Stashed changes
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Paper_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_js__ = __webpack_require__(0);



class Player {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.right_hand = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/knife_hand.png', 200, 200);
    this.left_hand = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/left_hand.png', 200, 200);
    this.paces = 0;
    this.paper = new __WEBPACK_IMPORTED_MODULE_1__Paper_js__["a" /* Paper */](0, 0);
  }

  rotate(angle) {
    this.direction = (this.direction + angle + __WEBPACK_IMPORTED_MODULE_2__main_js__["CIRCLE"]) % __WEBPACK_IMPORTED_MODULE_2__main_js__["CIRCLE"];
  }

  walk(distance, map, direction) {
    let dx = Math.cos(direction) * distance;
    let dy = Math.sin(direction) * distance;
    if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
    if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
    this.paces += distance;
  }

  update(controls, map, seconds) {
    if (controls.left) this.rotate(-Math.PI * seconds);
    if (controls.right) this.rotate(Math.PI * seconds);
    if (controls.forward) this.walk(3 * seconds, map, this.direction);
    if (controls.backward) this.walk(-3 * seconds, map, this.direction);
    if (controls.sideLeft) this.walk(3 * seconds, map, this.direction - Math.PI / 2);
    if (controls.sideRight) this.walk(-3 * seconds, map, this.direction - Math.PI / 2);
  }

  dosmth(action) {
    if (action === 'enter') console.log('Bam!');
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Paper {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Paper;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__ = __webpack_require__(1);

class Map {
<<<<<<< Updated upstream
    constructor(size) {
        this.size = size;
        this.autoFilledMap = this.autoFill(size);
        this.wallGrid = new Uint8Array(size * size);
        this.skybox = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/sky_panorama.jpg', 2000, 750);
        this.wallTexture = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/fence.png', 1024, 1024);
        this.light = 0;
    }

    get(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
        return this.wallGrid[y * this.size + x];
    }

    autoFill(size) {
        // size * size grid of 0 and 1
        //      111...111
        //      100...001
        //      .........
        //      100...001
        //      111...111
        let autoFilledMap = [];
        for (let i = 0; i < size; i++) {
            autoFilledMap.push(1);
        }
        for (let i = 0; i < size - 2; i++) {
            autoFilledMap.push(1);
            for (let j = 0; j < size - 2; j++) {
                autoFilledMap.push(0);
            }
            autoFilledMap.push(1);
        }
        for (let i = 0; i < size; i++) {
            autoFilledMap.push(1);
        }
        return autoFilledMap;
    }

    fillTheMap() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.wallGrid[i] = this.autoFilledMap[i]; //Math.random() < 0.3 ? 1 : 0;
        };
    }

    randomize() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
        };
    }

    cast(point, angle, range) {
        let self = this;
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        let noWall = { length2: Infinity };

        return ray({ x: point.x, y: point.y, height: 0, distance: 0 });

        function ray(origin) {
            let stepX = step(sin, cos, origin.x, origin.y);
            let stepY = step(cos, sin, origin.y, origin.x, true);
            let nextStep = stepX.length2 < stepY.length2 ? inspect(stepX, 1, 0, origin.distance, stepX.y) : inspect(stepY, 0, 1, origin.distance, stepY.x);
            if (nextStep.distance > range) return [origin];
            return [origin].concat(ray(nextStep));
        };

        function step(rise, run, x, y, inverted) {
            if (run === 0) return noWall;
            let dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
            let dy = dx * (rise / run);
            return {
                x: inverted ? y + dy : x + dx,
                y: inverted ? x + dx : y + dy,
                length2: dx * dx + dy * dy
            };
        };

        function inspect(step, shiftX, shiftY, distance, offset) {
            let dx = cos < 0 ? shiftX : 0;
            let dy = sin < 0 ? shiftY : 0;
            step.height = self.get(step.x - dx, step.y - dy);
            step.distance = distance + Math.sqrt(step.length2);
            if (shiftX) step.shading = cos < 0 ? 2 : 0;else step.shading = sin < 0 ? 2 : 1;
            step.offset = offset - Math.floor(offset);
            return step;
        };
    }

    update(seconds) {
        // --------------------- Random Lighting -------------------------------
        //if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
        //else if (Math.random() * 5 < seconds) this.light = 2;
        // ---------------------------------------------------------------------

        //this.light = Math.max(this.light - 10 * seconds, 0.4);  // nigth mode
        this.light = 2; //day mode
    }
=======
  constructor(size) {
    this.size = size;
    this.autoFilledMap = this.autoFill(size);
    this.wallGrid = new Uint8Array(size * size);
    this.skybox = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/sky_panorama.jpg', 2000, 750);
    this.wallTexture = new __WEBPACK_IMPORTED_MODULE_0__Bitmap_js__["a" /* Bitmap */]('img/fence.png', 1024, 1024);
    this.light = 0;
    this.objects = [];
  }

  get(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
    return this.wallGrid[y * this.size + x];
  }

  autoFill(size) {
    // size * size grid of 0 and 1
    //      111...111
    //      100...001
    //      .........
    //      100...001
    //      111...111
    let autoFilledMap = [];

    for (let i = 0; i < size; i++) {
      autoFilledMap.push(1);
    }

    for (let i = 0; i < size - 2; i++) {
      autoFilledMap.push(1);

      for (let j = 0; j < size - 2; j++) {
        autoFilledMap.push(0);
      }

      autoFilledMap.push(1);
    }

    for (let i = 0; i < size; i++) {
      autoFilledMap.push(1);
    }

    return autoFilledMap;
  }

  fillTheMap() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.wallGrid[i] = this.autoFilledMap[i]; //Math.random() < 0.3 ? 1 : 0;
    }

    ;
  }

  randomize() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
    }

    ;
  }

  cast(point, angle, range, objects) {
    var self = this,
        sin = Math.sin(angle),
        cos = Math.cos(angle),
        noWall = {
      length2: Infinity
    };
    return ray({
      x: point.x,
      y: point.y,
      height: 0,
      distance: 0
    });

    function ray(origin) {
      var stepX = step(sin, cos, origin.x, origin.y);
      var stepY = step(cos, sin, origin.y, origin.x, true);
      var nextStep = stepX.length2 < stepY.length2 ? inspect(stepX, 1, 0, origin.distance, stepX.y) : inspect(stepY, 0, 1, origin.distance, stepY.x);
      if (nextStep.distance > range) return [origin];
      return [origin].concat(ray(nextStep));
    }

    function step(rise, run, x, y, inverted) {
      if (run === 0) return noWall;
      var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
      var dy = dx * (rise / run);
      return {
        x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length2: dx * dx + dy * dy
      };
    }

    function inspect(step, shiftX, shiftY, distance, offset) {
      var dx = cos < 0 ? shiftX : 0;
      var dy = sin < 0 ? shiftY : 0;
      step.height = self.get(step.x - dx, step.y - dy);
      step.distance = distance + Math.sqrt(step.length2);
      step.object = self.getObject(step.x - dx, step.y - dy);
      if (shiftX) step.shading = cos < 0 ? 2 : 0;else step.shading = sin < 0 ? 2 : 1;
      step.offset = offset - Math.floor(offset);
      return step;
    }
  }

  update(seconds) {
    // --------------------- Random Lighting -------------------------------
    //if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
    //else if (Math.random() * 5 < seconds) this.light = 2;
    // ---------------------------------------------------------------------
    //this.light = Math.max(this.light - 10 * seconds, 0.4);  // nigth mode
    this.light = 2; //day mode
  }

  addObject(object, x, y) {
    this.objects.push(new __WEBPACK_IMPORTED_MODULE_1__MapObject_js__["a" /* MapObject */](object, x, y));
    console.log(this.objects);
  }

  getObject(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    return this.objects[y * this.size + x];
  }

>>>>>>> Stashed changes
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;


/***/ }),
<<<<<<< Updated upstream
/* 6 */,
=======
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Objects {
  constructor(map) {
    this.collection = [];
    this.map = map;
  }

  update() {
    this.map.objects.forEach(function (item) {
      item.logic && item.logic();
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Objects;


/***/ }),
>>>>>>> Stashed changes
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Controls {
  constructor(player) {
    this.player = player;
    this.codes = {
      37: 'left',
      39: 'right',
      38: 'forward',
      40: 'backward',
      65: 'sideLeft',
      68: 'sideRight',
      87: 'forward',
      83: 'backward',
      13: 'enter'
    };
    this.states = {
      'left': false,
      'right': false,
      'forward': false,
      'backward': false
    };
    this.actions = ['enter'];
    document.addEventListener('keydown', this.onKey.bind(this, true), false);
    document.addEventListener('keyup', this.onKey.bind(this, false), false);
    document.addEventListener('touchstart', this.onTouch.bind(this), false);
    document.addEventListener('touchmove', this.onTouch.bind(this), false);
    document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    document.addEventListener('mousemove', this.onMouseMovement.bind(this), false);
    document.body.onclick = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
  }

  onTouch(e) {
    let t = e.touches[0];
    this.onTouchEnd(e);
    if (t.pageY < window.innerHeight * 0.5) this.onKey(true, {
      keyCode: 38
    });else if (t.pageX < window.innerWidth * 0.5) this.onKey(true, {
      keyCode: 37
    });else if (t.pageY > window.innerWidth * 0.5) this.onKey(true, {
      keyCode: 39
    });
  }

  onTouchEnd(e) {
    this.states = {
      left: false,
      right: false,
      forward: false,
      backward: false,
      sideLeft: false,
      sideRight: false
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
    if (x > 0) this.player.rotate(Math.PI / 80);
    if (x < 0) this.player.rotate(-Math.PI / 80);
  }

<<<<<<< Updated upstream
    onMouseMovement(e) {
        let x = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        if (x > 0) this.player.rotate(Math.PI / 40);
        if (x < 0) this.player.rotate(-Math.PI / 40);
    }
=======
>>>>>>> Stashed changes
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controls;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);



class Camera {
<<<<<<< Updated upstream
    constructor(canvas, resolution, focalLength) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = window.innerWidth * 0.5;
        this.height = canvas.height = window.innerHeight * 0.5;
        this.resolution = resolution;
        this.spacing = this.width / resolution;
        this.focalLength = focalLength || 0.8;
        this.range = __WEBPACK_IMPORTED_MODULE_0__main_js__["MOBILE"] ? 8 : 14;
        this.lightRange = 5;
        this.scale = (this.width + this.height) / 1200;
    }

    render(player, map) {
        this.drawSky(player.direction, map.skybox, map.light);
        this.drawColumns(player, map);
        this.drawWeapon(player.left_hand, player.right_hand, player.paces);
    }

    drawSky(direction, sky, ambient) {
        let width = sky.width * (this.height / sky.height) * 2;
        let left = direction / __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] * -width;

        this.ctx.save();
        this.ctx.drawImage(sky.image, left, 0, width, this.height);
        if (left < width - this.width) {
            this.ctx.drawImage(sky.image, left + width, 0, width, this.height);
        }
        if (ambient > 0) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.globalAlpha = ambient * 0.1;
            this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
        }
        this.ctx.restore();
    }

    drawColumn(column, ray, angle, map) {
        let ctx = this.ctx;
        let texture = map.wallTexture;
        let left = Math.floor(column * this.spacing);
        let width = Math.ceil(this.spacing);
        let hit = -1;

        while (++hit < ray.length && ray[hit].height <= 0);

        for (let s = ray.length - 1; s >= 0; s--) {
            let step = ray[s];
            let rainDrops = Math.pow(Math.random(), 3) * s;
            let rain = rainDrops > 0 && this.project(0.006, angle, step.distance);

            if (s === hit) {
                let textureX = Math.floor(texture.width * step.offset);
                let wall = this.project(step.height, angle, step.distance);

                ctx.globalAlpha = 1;
                ctx.drawImage(texture.image, textureX, 0, 1, texture.height, left, wall.top, width, wall.height);

                ctx.fillStyle = '#2a3847';
                ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange - map.light, 0);
                ctx.fillRect(left, wall.top, width, wall.height);
            };

            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 1;
            while (--rainDrops > 0) ctx.fillRect(left, Math.random() * rain.top, 2, rain.height);
        };
    }

    drawColumns(player, map) {
        this.ctx.save();
        for (let column = 0; column < this.resolution; column++) {
            let x = column / this.resolution - 0.5;
            let angle = Math.atan2(x, this.focalLength);
            let ray = map.cast(player, player.direction + angle, this.range);
            this.drawColumn(column, ray, angle, map);
        };
        this.ctx.restore();
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

    project(height, angle, distance) {
        let z = distance * Math.cos(angle);
        let wallHeight = this.height * height / z;
        let bottom = this.height / 2 * (1 + 1 / z);
        return {
            top: bottom - wallHeight,
            height: wallHeight
        };
    }
=======
  constructor(canvas, resolution, fov) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.resolution = resolution;
    this.spacing = this.width / resolution;
    this.fov = fov;
    this.range = __WEBPACK_IMPORTED_MODULE_0__main_js__["MOBILE"] ? 8 : 14;
    this.lightRange = 5;
    this.scale = (this.width + this.height) / 1200;
  }

  render(player, map, objects) {
    this.drawSky(player.direction, map.skybox, map.light);
    this.drawColumns(player, map, objects);
    this.drawWeapon(player.left_hand, player.right_hand, player.paces);
    this.drawMiniMap(player, map);
  }

  drawSky(direction, sky, ambient) {
    var width = this.width * (__WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] / this.fov);
    var left = -width * direction / __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"];
    this.ctx.save();
    this.ctx.drawImage(sky.image, left, 0, width, this.height);

    if (left < width - this.width) {
      this.ctx.drawImage(sky.image, left + width, 0, width, this.height);
    }

    if (ambient > 0) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.globalAlpha = ambient * 0.1;
      this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
    }

    this.ctx.restore();
  }

  drawColumn(column, ray, angle, map) {
    var ctx = this.ctx,
        wallTexture = map.wallTexture,
        floorTexture = map.floorTexture,
        left = Math.floor(column * this.spacing),
        width = Math.ceil(this.spacing),
        hit = -1,
        objects = [],
        hitDistance;

    while (++hit < ray.length && ray[hit].height <= 0);

    for (var s = ray.length - 1; s >= 0; s--) {
      var step = ray[s];
      var rainDrops = Math.pow(Math.random(), 3) * s;
      var rain = rainDrops > 0 && this.project(0.1, angle, step.distance),
          textureX,
          wall;

      if (s === hit) {
        textureX = Math.floor(wallTexture.width * step.offset);
        wall = this.project(step.height, angle, step.distance);
        ctx.globalAlpha = 1;
        ctx.drawImage(wallTexture.image, textureX, 0, 1, wallTexture.height, left, wall.top, width, wall.height);
        ctx.fillStyle = '#000000';
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
      } //ctx.fillStyle = '#ffffff';
      //ctx.globalAlpha = 0.15;
      //while (--rainDrops > 0) ctx.fillRect(left, Math.random() * rain.top, 1, rain.height);

    }

    return {
      objects: objects,
      hit: hitDistance
    };
  }

  drawSprites(player, map, columnProps) {
    var screenWidth = this.width,
        screenHeight = this.height,
        screenRatio = screenWidth / this.fov,
        resolution = this.resolution; //probably should get these and pass them in, but modifying originals for now
    // also this limits size of world
    // calculate each sprite distance to player

    this.setSpriteDistances(map.objects, player);
    var sprites = Array.prototype.slice.call(map.objects).map(function (sprite) {
      var distX = sprite.x - player.x,
          distY = sprite.y - player.y,
          width = sprite.width * screenWidth / sprite.distanceFromPlayer,
          height = sprite.height * screenHeight / sprite.distanceFromPlayer,
          renderedFloorOffset = sprite.floorOffset / sprite.distanceFromPlayer,
          angleToPlayer = Math.atan2(distY, distX),
          angleRelativeToPlayerView = player.direction - angleToPlayer,
          top = screenHeight / 2 * (1 + 1 / sprite.distanceFromPlayer) - height;

      if (angleRelativeToPlayerView >= __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"] / 2) {
        angleRelativeToPlayerView -= __WEBPACK_IMPORTED_MODULE_0__main_js__["CIRCLE"];
      }

      var cameraXOffset = __WEBPACK_IMPORTED_MODULE_0__main_js__["camera"].width / 2 - screenRatio * angleRelativeToPlayerView,
          numColumns = width / screenWidth * resolution,
          firstColumn = Math.floor((cameraXOffset - width / 2) / screenWidth * resolution);
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
      }; // temp render red dot at item position
      //camera.ctx.fillStyle = 'red';
      //camera.ctx.fillRect(sprite.render.cameraXOffset, camera.height / 2, 3, 3);

      return sprite;
    }) // sort sprites in distance order
    .sort(function (a, b) {
      if (a.distanceFromPlayer < b.distanceFromPlayer) {
        return 1;
      }

      if (a.distanceFromPlayer > b.distanceFromPlayer) {
        return -1;
      }

      return 0;
    });

    if (sprites.length > 1) {//debugger;
    }

    this.ctx.save();

    for (var column = 0; column < this.resolution; column++) {
      this.drawSpriteColumn(player, map, column, columnProps[column], sprites);
    }

    this.ctx.restore();
  }

  drawSpriteColumn(player, map, column, columnProps, sprites) {
    var ctx = this.ctx,
        left = Math.floor(column * this.spacing),
        width = Math.ceil(this.spacing),
        angle = this.fov * (column / this.resolution - 0.5),
        columnWidth = this.width / this.resolution,
        sprite,
        props,
        obj,
        textureX,
        height,
        projection,
        mappedColumnObj,
        spriteIsInColumn,
        top; //todo: make rays check for objects, and return those that it actually hit
    //check if ray hit an object
    //if(!columnProps.objects.length){return;}

    sprites = sprites.filter(function (sprite) {
      return !columnProps.hit || sprite.distanceFromPlayer < columnProps.hit;
    });

    for (var i = 0; i < sprites.length; i++) {
      sprite = sprites[i]; //mappedColumnObj = columnProps.objects.filter(function(obj){
      //	return sprite === obj.object;
      //})[0];
      //if(!mappedColumnObj)return;
      //determine if sprite should be drawn based on current column position and sprite width

      spriteIsInColumn = left > sprite.render.cameraXOffset - sprite.render.width / 2 && left < sprite.render.cameraXOffset + sprite.render.width / 2; //console.log(spriteIsInColumn);

      if (spriteIsInColumn) {
        textureX = Math.floor(sprite.texture.width / sprite.render.numColumns * (column - sprite.render.firstColumn));
        this.ctx.fillStyle = 'black';
        this.ctx.globalAlpha = 1; //ctx.fillRect(left, top , 10, sprite.render.height);

        var brightness = Math.max(sprite.distanceFromPlayer / this.lightRange - map.light, 0) * 100;
        sprite.texture.image.style.webkitFilter = 'brightness(' + brightness + '%)';
        sprite.texture.image.style.filter = 'brightness(' + brightness + '%)';
        ctx.drawImage(sprite.texture.image, textureX, 0, 1, sprite.texture.height, left, sprite.render.top, width, sprite.render.height); //debugger;
        //ctx.fillRect(left, sprite.render.top, columnWidth, sprite.render.height);
        //debugger;
      }
    }

    ;
  }

  setSpriteDistances(objects, player) {
    let obj;

    for (let i = 0; i < objects.length; i++) {
      obj = objects[i];
    }
  }

  drawColumns(player, map, objects) {
    this.ctx.save();
    var allObjects = [];

    for (var column = 0; column < this.resolution; column++) {
      var angle = this.fov * (column / this.resolution - 0.5);
      var ray = map.cast(player, player.direction + angle, this.range);
      var columnProps = this.drawColumn(column, ray, angle, map);
      allObjects.push(columnProps);
    }

    this.ctx.restore();
    this.ctx.save();
    this.drawSprites(player, map, allObjects);
    this.ctx.restore();
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
        let row = Math.floor(i / map.size);
        let col = i - map.size * row;
        ctx.fillRect(x + blockSize * col, y + blockSize * row, blockSize, blockSize);
      }
    }

    ctx.save();
    /*for (let i = 0; i < map.objects.length; i++){ //спрайты
    	if(map.objects[i]){
    			ctx.fillStyle = map.objects[i].color || 'blue';
    			ctx.globalAlpha = .8;
    			ctx.fillRect(x + (blockSize * map.objects[i].x) + blockSize * .25, y + (blockSize * map.objects[i].y) + blockSize * .25, blockSize * .5, blockSize * .5);
    	}
    }*/

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
    var z = distance * Math.cos(angle);
    var wallHeight = this.height * height / z;
    var bottom = this.height / 2 * (1 + 1 / z);
    return {
      top: bottom - wallHeight,
      height: wallHeight
    };
  }

>>>>>>> Stashed changes
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameLoop {
  constructor() {
    this.frame = this.frame.bind(this);
    this.lastTime = 0;

    this.callback = function () {};
  }

  start(callback) {
    this.callback = callback;
    requestAnimationFrame(this.frame);
  }

  frame(time) {
    let seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < 0.2) this.callback(seconds);
    requestAnimationFrame(this.frame);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameLoop;


/***/ })
/******/ ]);