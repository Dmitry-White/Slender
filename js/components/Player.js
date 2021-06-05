import ASSETS from '../../data/assets';

import { getRandomInt } from '../utils/calc';

import Paper from './Paper';
import Bitmap from './Bitmap';
import NPC from './NPC';
import { PlayerSounds } from './Audio';

class Player {
  constructor(origin) {
    this.x = origin.x;
    this.y = origin.y;
    this.direction = origin.direction;
    this.CIRCLE = origin.game.CIRCLE;
    this.PAPER_NUM = origin.game.PAPER_NUM;
    this.papers = origin.game.papers;
    this.map = origin.game.map;
    this.sounds = origin.game.sounds;
    this.obj_sounds = origin.game.obj_sounds;
    this.mode = origin.game.mode;
    this.game = origin.game;
    this.right_hand = new Bitmap(
      ASSETS.slender[0].texture,
      ASSETS.slender[0].width,
      ASSETS.slender[0].height,
    );
    this.left_hand = new Bitmap(
      ASSETS.slender[1].texture,
      ASSETS.slender[1].width,
      ASSETS.slender[1].height,
    );
    this.playerSounds = new PlayerSounds(origin.game.mode, this);
    this.paces = 0;
    this.prev_paper_place = [0, 0];
    this.speed = 1;
    this.grabDist = 0;
    this.grab_state = false;
    this.put_dist = 0;
    this.put_state = false;
    this.running = null;
  }

  rotate(angle) {
    this.direction = (this.direction + angle + this.CIRCLE) % this.CIRCLE;
  }

  walk(distance, map, direction) {
    const dx = Math.cos(direction) * distance;
    const dy = Math.sin(direction) * distance;
    const inDirectionX = map.get(this.x + dx, this.y);
    const inDirectionY = map.get(this.x, this.y + dy);

    if (inDirectionX === 2 || inDirectionY === 2) this.playerSounds.hitFence();
    if (inDirectionX === 1 || inDirectionY === 1) this.playerSounds.hitWall();

    if (inDirectionX <= 0) this.x += dx;
    if (inDirectionY <= 0) this.y += dy;
    this.paces += distance;
  }

  update(controls, map, seconds) {
    this.running = controls.shift;
    this.walking =
      controls.forward ||
      controls.backward ||
      controls.sideLeft ||
      controls.sideRight;
    if (controls.left) this.rotate(-Math.PI * seconds);
    if (controls.right) this.rotate(Math.PI * seconds);
    if (controls.forward) {
      this.playerSounds.walk();
      this.walk(this.speed * seconds, map, this.direction);
    }
    if (controls.backward) {
      this.playerSounds.walk();
      this.walk(-this.speed * seconds, map, this.direction);
    }
    if (controls.sideLeft) {
      this.playerSounds.dodge();
      this.walk((this.speed / 2) * seconds, map, this.direction - Math.PI / 2);
    }
    if (controls.sideRight) {
      this.playerSounds.dodge();
      this.walk(-(this.speed / 2) * seconds, map, this.direction - Math.PI / 2);
    }
    this.grab();
    this.put();

    controls.shift ? (this.speed = 3) : (this.speed = 1);
  }

  grab() {
    if (this.grab_state === true && this.grabDist < 300) {
      this.grabDist += 50;
    } else {
      this.grab_state = false;
      if (this.grabDist !== 0) {
        this.grabDist -= 25;
      }
    }
  }

  put() {
    if (this.put_state === true && this.put_dist < 400) {
      this.put_dist += 30;
    } else {
      this.put_state = false;
      if (this.put_dist !== 0) {
        this.put_dist -= 15;
      }
    }
  }

  dosmth(action) {
    if (action === 'attack') {
      this.grab_state = true;
      this.attack();
    }
    if (action === 'space') {
      this.put_state = true;
      this.placePaper();
    }
    if (action === 'escape') window.location.reload();
  }

  attack() {
    let x;
    let y;
    let victim;
    let nearVictim = false;
    this.map.objects.some((item) => {
      if (item instanceof NPC && item.alive) {
        victim = item;
        x = this.x - victim.x;
        y = this.y - victim.y;
        if (Math.sqrt(x * x + y * y) < 0.5) {
          return (nearVictim = true);
        }
      }
    });
    if (nearVictim) {
      this.eat(victim);
    } else if (this.obj_sounds.obj_sound_end) {
      this.playerSounds.attack();
    }
  }

  eat(victim) {
    this.playerSounds.kill();
    victim.alive = false;
    victim.color = undefined;
    victim.die();
    this.map.people--;
    this.showDieMessage();
  }

  placePaper() {
    if (this.map.papers >= this.PAPER_NUM) {
      this.showNoPaperMessage();
    } else {
      const samePlace =
        this.prev_paper_place[0] === this.x &&
        this.prev_paper_place[1] === this.y;
      if (
        !this.running &&
        !this.walking &&
        this.sounds.sound_end &&
        !samePlace
      ) {
        const paperType = getRandomInt(0, 8);
        this.map.addObject(
          new Paper(
            this.x,
            this.y,
            new Bitmap(
              this.papers[paperType].texture,
              this.papers[paperType].width,
              this.papers[paperType].height,
            ),
          ),
        );
        if (paperType === 0) {
          this.obj_sounds.makeSound('placing_loo_paper');
          this.showLooMessage();
        } else if (paperType === 7) {
          this.obj_sounds.makeSound('placing_bomb');
          this.showBombMessage();
        } else {
          this.obj_sounds.makeSound('placing_paper');
          this.showPaperMessage();
        }
        this.prev_paper_place = [this.x, this.y];
        this.map.papers++;
      } else {
        this.showWarningMessage();
      }
    }
  }

  showNoPaperMessage() {
    this.map.show_no_paper = 1;
    this.map.show_loo = 0;
    this.map.show_bomb = 0;
    this.map.show_tip = 0;
    this.map.show_warning = 0;
    setTimeout(() => {
      this.map.show_no_paper = 0;
    }, 3000);
  }

  showLooMessage() {
    this.map.show_loo = 1;
    this.map.show_bomb = 0;
    this.map.show_tip = 0;
    this.map.show_warning = 0;
    setTimeout(() => {
      this.map.show_loo = 0;
    }, 3000);
  }

  showBombMessage() {
    this.map.show_loo = 0;
    this.map.show_bomb = 1;
    this.map.show_tip = 0;
    this.map.show_warning = 0;
    setTimeout(() => {
      this.map.show_bomb = 0;
    }, 3000);
  }

  showPaperMessage() {
    this.map.show_loo = 0;
    this.map.show_bomb = 0;
    this.map.show_tip = 1;
    this.map.show_warning = 0;
    setTimeout(() => {
      this.map.show_tip = 0;
    }, 3000);
  }

  showWarningMessage() {
    this.map.show_loo = 0;
    this.map.show_bomb = 0;
    this.map.show_tip = 0;
    this.map.show_warning = 1;
    setTimeout(() => {
      this.map.show_warning = 0;
    }, 3000);
  }

  showDieMessage() {
    this.map.show_die = 1;
    setTimeout(() => {
      this.map.show_die = 0;
    }, 3000);
  }
}

export default Player;
