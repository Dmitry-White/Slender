import ASSETS from '../../data/assets';

import { getRandomInt } from '../utils/calc';
import GAME_OPTIONS from '../core/config';

import Bitmap from './Bitmap';
import Objects from './Objects';
import NPC from './NPC';

class Map {
  constructor(game) {
    this.game = game;
    this.mode = game.mode;
    this.size = GAME_OPTIONS.MAP_SIZE;
    this.state = {
      trees: null,
      bushes: null,
    };
    this.wallGrid = new Uint8Array(this.size * this.size);
    this.skybox = new Bitmap(this.mode.sky_texture, 2000, 750);
    this.fenceTexture = new Bitmap(this.mode.fence_texture, 512, 512);
    this.fenceDoorTexture = new Bitmap(this.mode.fence_door, 512, 256);
    this.wallTexture = new Bitmap(this.mode.wall_texture, 512, 512);
    this.light = this.mode.light;
    this.objects = [];
    this.people = 0;
    this.papers = 0;
    this.show_no_paper = 0;
    this.show_loo = 0;
    this.show_bomb = 0;
    this.show_tip = 0;
    this.show_warning = 0;
    this.show_die = 0;
    this.show_taken = 0;
    this.show_all_dead = 0;
  }

  get(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
    return this.wallGrid[y * this.size + x];
  }

  addObject(object) {
    this.objects.push(object);
  }

  getObject(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    return this.objects[y * this.size + x];
  }

  prepareAssets() {
    switch (this.mode.winter) {
      case true:
        this.state.trees = ASSETS.trees;
        this.state.bushes = ASSETS.bushes;
        break;

      default:
        this.state.trees = ASSETS.rain_trees;
        this.state.bushes = ASSETS.rain_bushes;
        break;
    }
  }

  addTrees(col, row) {
    if (this.get(col, row) === 0) {
      const num = getRandomInt(0, 4);

      const treeBitmap = new Bitmap(
        this.state.trees[num].texture,
        this.state.trees[num].width,
        this.state.trees[num].height,
      );

      const tree = new Objects({
        texture: treeBitmap,
        x: col,
        y: row,
      });

      this.addObject(tree);
    }
  }

  addBushes(col, row) {
    if (this.get(col, row) === 0) {
      const num = getRandomInt(0, 5);

      const bushBitmap = new Bitmap(
        this.state.bushes[num].texture,
        this.state.bushes[num].width,
        this.state.bushes[num].height,
      );

      const bush = new Objects({
        texture: bushBitmap,
        height: 0.5,
        x: col,
        y: row,
      });

      this.addObject(bush);
    }
  }

  addPeople() {
    for (let i = 0; i < GAME_OPTIONS.PPL_NUM; i++) {
      const x = getRandomInt(2, GAME_OPTIONS.PPL_XY);
      const y = getRandomInt(2, GAME_OPTIONS.PPL_XY);
      const picNum = getRandomInt(1, 5);
      const npc = new NPC(this.game.player, this, x, y, picNum);
      this.addObject(npc);
      this.people++;
    }
  }

  buildMap() {
    let row;
    let col;
    this.wallGrid.fill(0);
    for (let i = 0; i < this.size * this.size; i++) {
      row = Math.floor(i / this.size);
      col = i - this.size * row;
      // Generate the labirinth
      if (
        row !== 1 &&
        row !== this.size - 2 &&
        col !== 1 &&
        col !== this.size - 2
      ) {
        if (Math.random() > 0.2) {
          Math.random() > 0.5
            ? this.addBushes(col + 1.5, row + 1.5)
            : this.addTrees(col + 1.5, row + 1.5);
        }
        if (Math.random() > 0.7) {
          this.wallGrid[i] = 1;
        }
      }
      // Generate the fence
      if (
        row === 0 ||
        row === this.size - 1 ||
        col === 0 ||
        col === this.size - 1
      ) {
        this.wallGrid[i] = 2;
      }
    }
    this.wallGrid[1] = 3;

    this.addPeople();
  }

  cast(player, angle, range) {
    const self = this;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const noWall = { length2: Infinity };

    return ray({
      x: player.state.position.x,
      y: player.state.position.y,
      height: 0,
      distance: 0,
    });

    function ray(origin) {
      const stepX = step(sin, cos, origin.x, origin.y);
      const stepY = step(cos, sin, origin.y, origin.x, true);
      const nextStep =
        stepX.length2 < stepY.length2
          ? inspect(stepX, 1, 0, origin.distance, stepX.y)
          : inspect(stepY, 0, 1, origin.distance, stepY.x);

      if (nextStep.distance > range) return [origin];
      return [origin].concat(ray(nextStep));
    }

    function step(rise, run, x, y, inverted) {
      if (run === 0) return noWall;
      const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
      const dy = dx * (rise / run);
      return {
        x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length2: dx * dx + dy * dy,
      };
    }

    function inspect(step, shiftX, shiftY, distance, offset) {
      const dx = cos < 0 ? shiftX : 0;
      const dy = sin < 0 ? shiftY : 0;
      step.height = self.get(step.x - dx, step.y - dy);
      step.distance = distance + Math.sqrt(step.length2);
      step.object = self.getObject(step.x - dx, step.y - dy);
      if (shiftX) step.shading = cos < 0 ? 2 : 0;
      else step.shading = sin < 0 ? 2 : 1;
      step.offset = offset - Math.floor(offset);
      return step;
    }
  }

  lightning(seconds) {
    if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
    else if (Math.random() * 5 < seconds) this.light = 2;
  }

  update() {
    this.objects.forEach((item) => {
      if (item instanceof NPC) {
        item.logic();
      }
    });
  }
}

export default Map;
