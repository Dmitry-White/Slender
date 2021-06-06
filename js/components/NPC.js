import { CIRCLE, getRandomFloat } from '../utils/calc';

import Paper from './Paper';
import Bitmap from './Bitmap';

class NPC {
  constructor(player, map, x, y, picNum) {
    this.player = player;
    this.map = map;
    this.x = x;
    this.y = y;
    this.picNum = picNum;
    this.color = '#cf3c8c';
    this.texture = new Bitmap(`assets/images/npc-${picNum}.png`, 114, 300);
    this.height = 0.6;
    this.width = 0.225;
    this.floorOffset = 0;
    this.count = 0;
    this.direction = 1;
    this.speed = 0.7;
    this.alive = true;
    // this.found_dead = false;
    this.found_paper = false;
    this.taking_paper = false;
    this.paperNearPerson = 0;
  }

  logic() {
    if (this.alive) {
      if (this.count > 270) {
        this.direction += getRandomFloat(-(CIRCLE / 6), CIRCLE / 6);
        this.count = 0;
      }

      // this.lookForDead()
      this.searchForPaper();
      if (!this.found_paper && !this.taking_paper) {
        this.wanderAround();
      }
    }
  }

  wanderAround() {
    this.count += 1;
    this.run();
    this.walk(0.05 * this.speed, this.direction);
  }

  run() {
    const distToPlayer = this.distTo(this.player);
    if (distToPlayer < 2) {
      this.speed = 3;
      this.direction = -this.player.direction;
    } else this.speed = 0.7;
  }

  walk(distance, direction) {
    const dx = Math.cos(direction) * distance;
    const dy = Math.sin(direction) * distance;
    const inDirectionX = this.map.get(this.x + dx, this.y);
    const inDirectionY = this.map.get(this.x, this.y + dy);

    if (
      inDirectionX === 2 ||
      inDirectionY === 2 ||
      inDirectionX === 1 ||
      inDirectionY === 1
    ) {
      this.direction = direction + CIRCLE / 6;
    }
    if (inDirectionX <= 0) this.x += dx;
    if (inDirectionY <= 0) this.y += dy;
    this.move('assets/images/npc');
  }

  move(url) {
    if (this.count % 10 === 0) {
      if (this.count % 20 === 0) {
        this.texture = new Bitmap(`${url}2-${this.picNum}.png`, 114, 300);
      } else this.texture = new Bitmap(`${url}-${this.picNum}.png`, 114, 300);
    }
  }

  searchForPaper() {
    let dx;
    let dy;
    let distToPaper;
    let paper;
    this.map.objects.some((item) => {
      if (item instanceof Paper) {
        paper = item;
        dx = this.x - paper.x;
        dy = this.y - paper.y;
        distToPaper = this.distTo(paper);
        this.isNearPaper(distToPaper, paper, dx, dy);
      }
    });
  }

  isNearPaper(distToPaper, paper, dx, dy) {
    if (distToPaper < 5 && this.distTo(this.player) > 3) {
      this.paper = paper;
      this.found_paper = true;
      if (distToPaper < 0.3) {
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
    this.paperNearPerson++;
    if (this.paperNearPerson === 70) {
      const idx = this.map.objects.indexOf(this.paper);
      if (idx !== -1) {
        this.map.objects.splice(idx, 1);
      }
      this.map.objects.forEach((item) => {
        if (item instanceof NPC) {
          item.found_paper = false;
          item.taking_paper = false;
          item.paperNearPerson = 0;
        }
      });
      this.showTakenMessage();
    }
  }

  approachPaper(dx, dy) {
    const distToWalk = 0.007 * this.speed;
    dx >= 0 ? (this.x -= distToWalk) : (this.x += distToWalk);
    dy >= 0 ? (this.y -= distToWalk) : (this.y += distToWalk);
    this.count += 0.5;
    this.move('assets/images/npc');
  }

  /*
  lookForDead() {
      let dead, dx_dead, dy_dead, dist_to_dead;
      this.map.objects.some((item)=>{
          if(item instanceof NPC && !item.alive) {
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
    this.texture = new Bitmap('assets/images/npc_die.gif', 114, 300);
    setTimeout(() => {
      this.texture = new Bitmap(
        `assets/images/npc3-${this.picNum}.png`,
        300,
        56,
      );
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

export default NPC;
