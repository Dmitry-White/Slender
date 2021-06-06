import ASSETS from '../../data/assets';

import GAME_OPTIONS from '../core/config';
import { CIRCLE, getRandomInt } from '../utils/calc';

import Paper from './Paper';
import Bitmap from './Bitmap';
import NPC from './NPC';
import { PlayerSounds, PaperSounds } from './Audio';

class Player {
  constructor(game) {
    this.game = game;
    this.map = game.map;
    this.mode = game.mode;

    this.rightHand = new Bitmap(
      ASSETS.slender[0].texture,
      ASSETS.slender[0].width,
      ASSETS.slender[0].height,
    );
    this.leftHand = new Bitmap(
      ASSETS.slender[1].texture,
      ASSETS.slender[1].width,
      ASSETS.slender[1].height,
    );
    this.playerSounds = new PlayerSounds(this.mode, this);
    this.paperSounds = new PaperSounds(this);

    this.papers = ASSETS.papers;
    this.x = 1.5;
    this.y = 1.5;
    this.direction = 1.57;
    this.paces = 0;
    this.previosPaperPlace = { x: null, y: null };
    this.speed = 1;
    this.grabDistance = 0;
    this.grabState = false;
    this.putDistance = 0;
    this.putState = false;
    this.running = null;
    this.paperType = null;
  }

  rotate(angle) {
    this.direction = (this.direction + angle + CIRCLE) % CIRCLE;
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

  grab() {
    if (this.grabState === true && this.grabDistance < 300) {
      this.grabDistance += 50;
    } else {
      this.grabState = false;
      if (this.grabDistance !== 0) {
        this.grabDistance -= 25;
      }
    }
  }

  put() {
    if (this.putState === true && this.putDistance < 400) {
      this.putDistance += 30;
    } else {
      this.putState = false;
      if (this.putDistance !== 0) {
        this.putDistance -= 15;
      }
    }
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

  eat(victim) {
    victim.alive = false;
    victim.color = undefined;
    victim.die();
    this.map.people--;
    this.showDieMessage();
  }

  attack() {
    this.grabState = true;

    let x;
    let y;
    let victim;
    let nearVictim = false;

    // TODO: Reduce the Objects list to just NPC list
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
      this.playerSounds.kill();
      this.eat(victim);
    } else {
      this.playerSounds.attack();
    }
  }

  placePaper() {
    this.putState = true;

    const noPapersToPlace = this.map.papers >= GAME_OPTIONS.PAPER_NUM;

    if (noPapersToPlace) {
      this.showNoPaperMessage();
    } else {
      const isSamePlace =
        this.previosPaperPlace.x === this.x &&
        this.previosPaperPlace.y === this.y;

      const readyToPlaceHere =
        !isSamePlace &&
        !this.running &&
        !this.walking &&
        this.playerSounds.allSoundsEnded();

      if (readyToPlaceHere) {
        this.paperType = getRandomInt(0, 8);

        const paperBitmap = new Bitmap(
          this.papers[this.paperType].texture,
          this.papers[this.paperType].width,
          this.papers[this.paperType].height,
        );

        const paper = new Paper(this.x, this.y, paperBitmap);

        this.map.addObject(paper);

        this.paperSounds.place();

        this.showPlacementMessage();

        this.previosPaperPlace = { x: this.x, y: this.y };
        this.map.papers++;
      } else {
        this.showWarningMessage();
      }
    }
  }

  showPlacementMessage() {
    if (this.paperType === 0) {
      this.showLooMessage();
    } else if (this.paperType === 7) {
      this.showBombMessage();
    } else {
      this.showPaperMessage();
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

  do(action) {
    switch (action) {
      case 'attack':
        this.attack();
        break;
      case 'space':
        this.placePaper();
        break;
      case 'escape':
        window.location.reload();
        break;
      default:
        break;
    }
  }
}

export default Player;
