import Bitmap from './Bitmap';
import Objects from './Objects';
import Person from './Person';

import { getRandomInt } from '../utils/calc';

class Map {
  constructor(size, mode) {
    this.mode = mode;
    this.size = size;
    this.wallGrid = new Uint8Array(size * size);
    this.skybox = new Bitmap(mode.sky_texture, 2000, 750);
    this.fenceTexture = new Bitmap(mode.fence_texture, 512, 512);
    this.fenceDoorTexture = new Bitmap('img/fence_door_0.jpg', 512, 256);
    this.wallTexture = new Bitmap(mode.wall_texture, 512, 512);
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

  addTrees(trees, col, row) {
    if (this.get(col, row) === 0) {
      const num = getRandomInt(0, 4);
      this.addObject(
        new Objects({
          texture: new Bitmap(
            trees[num].texture,
            trees[num].width,
            trees[num].height,
          ),
          x: col,
          y: row,
        }),
      );
    }
  }

  addBushes(bushes, col, row) {
    if (this.get(col, row) === 0) {
      const num = getRandomInt(0, 5);
      this.addObject(
        new Objects({
          texture: new Bitmap(
            bushes[num].texture,
            bushes[num].width,
            bushes[num].height,
          ),
          height: 0.5,
          x: col,
          y: row,
        }),
      );
    }
  }

  buildMap(trees, bushes) {
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
            ? this.addBushes(bushes, col + 1.5, row + 1.5)
            : this.addTrees(trees, col + 1.5, row + 1.5);
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
  }

  cast(point, angle, range) {
    const self = this;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const noWall = { length2: Infinity };

    return ray({
      x: point.x,
      y: point.y,
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
      if (item instanceof Person) {
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

export default Map;
