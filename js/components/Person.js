import { Paper } from './Paper.js';
import { Bitmap } from './Bitmap.js';

import { getRandomFloat } from '../utils/calc';

export class Person {
  constructor(player, map, x, y, pic_num, CIRCLE) {
    this.CIRCLE = CIRCLE;
    this.player = player;
    this.map = map;
    this.x = x;
    this.y = y;
    this.pic_num = pic_num;
    (this.color = '#cf3c8c'),
      (this.texture = new Bitmap(`img/npc/npc-${pic_num}.png`, 114, 300)),
      (this.height = 0.6),
      (this.width = 0.225),
      (this.floorOffset = 0),
      (this.count = 0);
    this.direction = 1;
    this.speed = 0.7;
    this.alive = true;
    // this.found_dead = false;
    this.found_paper = false;
    this.taking_paper = false;
    this.paper_near_person = 0;
  }

  logic() {
    if (this.alive) {
      if (this.count > 270) {
        this.direction += getRandomFloat(-(this.CIRCLE / 6), this.CIRCLE / 6);
        this.count = 0;
      }

      // this.lookForDead()
      this.searchForPaper();
      if (!this.found_paper && !this.taking_paper) {
        this.wonderAround();
      }
    }
  }

  wonderAround() {
    this.count += 1;
    this.run();
    this.walk(0.05 * this.speed, this.direction);
  }

  run() {
    const dist_to_player = this.distTo(this.player);
    if (dist_to_player < 2) {
      this.speed = 3;
      this.direction = -this.player.direction;
    } else this.speed = 0.7;
  }

  walk(distance, direction) {
    const dx = Math.cos(direction) * distance;
    const dy = Math.sin(direction) * distance;
    const in_the_x_way = this.map.get(this.x + dx, this.y);
    const in_the_y_way = this.map.get(this.x, this.y + dy);

    if (
      in_the_x_way == 2 ||
      in_the_y_way == 2 ||
      in_the_x_way == 1 ||
      in_the_y_way == 1
    ) {
      this.direction = direction + this.CIRCLE / 6;
    }
    if (in_the_x_way <= 0) this.x += dx;
    if (in_the_y_way <= 0) this.y += dy;
    this.move('img/npc/npc');
  }

  move(url) {
    if (this.count % 10 === 0) {
      if (this.count % 20 === 0) {
        this.texture = new Bitmap(`${url}2-${this.pic_num}.png`, 114, 300);
      } else this.texture = new Bitmap(`${url}-${this.pic_num}.png`, 114, 300);
    }
  }

  searchForPaper() {
    let dx;
    let dy;
    let dist_to_paper;
    let paper;
    this.map.objects.some((item) => {
      if (item instanceof Paper) {
        paper = item;
        dx = this.x - paper.x;
        dy = this.y - paper.y;
        dist_to_paper = this.distTo(paper);
        this.isNearPaper(dist_to_paper, paper, dx, dy);
      }
    });
  }

  isNearPaper(dist_to_paper, paper, dx, dy) {
    if (dist_to_paper < 5 && this.distTo(this.player) > 3) {
      this.paper = paper;
      this.found_paper = true;
      if (dist_to_paper < 0.3) {
        this.takingPaper();
      } else {
        this.approachPaper(dx, dy);
      }
    } else this.found_paper = false;
  }

  takingPaper() {
    this.speed = 0;
    this.taking_paper = true;
    this.takePaper();
  }

  takePaper() {
    this.paper_near_person++;
    if (this.paper_near_person === 70) {
      const idx = this.map.objects.indexOf(this.paper);
      if (idx !== -1) {
        this.map.objects.splice(idx, 1);
      }
      this.map.objects.forEach((item) => {
        if (item instanceof Person) {
          item.found_paper = false;
          item.taking_paper = false;
          item.paper_near_person = 0;
        }
      });
      this.showTakenMessage();
    }
  }

  approachPaper(dx, dy) {
    let dist_to_walk;
    dist_to_walk = 0.007 * this.speed;
    dx >= 0 ? (this.x -= dist_to_walk) : (this.x += dist_to_walk);
    dy >= 0 ? (this.y -= dist_to_walk) : (this.y += dist_to_walk);
    this.count += 0.5;
    this.move('img/npc/npc');
  }

  /*
  lookForDead() {
      let dead, dx_dead, dy_dead, dist_to_dead;
      this.map.objects.some((item)=>{
          if(item instanceof Person && !item.alive) {
              dead = item;
              dist_to_dead = this.distTo(dead);
              this.isNearDead(dist_to_dead, dead);
          }
      });
  };

  isNearDead(dist_to_dead, dead) {
      if (dist_to_dead < 3) {
          console.log("OMG BODY!")
          this.dead = dead;
          this.found_dead = true;
          this.runFromDead();
      } else {
          this.stayCalm();
      }
  }

  /*
  runFromDead() {
      this.found_paper = false;
      this.taking_paper = false;
      this.speed = 3;
      this.direction = getRandomFloat(1,4);
  };

  stayCalm() {
      this.speed = .7;
      this.found_dead = false;
  }; */

  die() {
    this.texture = new Bitmap('img/npc/npc_die.gif', 114, 300);
    setTimeout(() => {
      this.texture = new Bitmap(`img/npc/npc3-${this.pic_num}.png`, 300, 56);
      this.height = 0.2;
      this.width = 0.7;
    }, 7000);
  }

  distTo(thing) {
    const x = thing.x - this.x;
    const y = thing.y - this.y;
    return Math.sqrt(x * x + y * y);
  }

  showTakenMessage() {
    this.map.show_taken = 1;
    setTimeout(() => {
      this.map.show_taken = 0;
    }, 3000);
  }
}
