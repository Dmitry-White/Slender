import ASSETS from '../../data/assets';
import GAME_OPTIONS from '../core/config';
import { CIRCLE, getRandomInt } from '../utils/calc';

import { PlayerSounds, PaperSounds } from './Audio';
import Bitmap from './Bitmap';
import Game from './Game';
import Map from './Map';
import NPC from './NPC';
import Paper from './Paper';

class Player {
  game: Game;

  mode: any;

  map: Map;

  state: any;

  rightHand: Bitmap;

  leftHand: Bitmap;

  playerSounds: PlayerSounds;

  paperSounds: PaperSounds;

  constructor(game: Game) {
    this.game = game;
    this.map = game.map;
    this.mode = game.mode;

    this.state = {
      position: {
        x: 1.5,
        y: 1.5,
        direction: 1.57,
      },
      movement: {
        paces: 0,
        speed: 1,
        grabDistance: 0,
        putDistance: 0,
      },
      FSM: {
        walking: false,
        running: false,
        putting: false,
        grabbing: false,
      },
      inventory: {
        papers: ASSETS.papers,
        paperType: null,
        previosPaperPlace: { x: null, y: null },
      },
    };

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
  }

  rotate(angle: number) {
    const { direction } = this.state.position;
    const newDirection = (direction + angle + CIRCLE) % CIRCLE;

    this.state.position.direction = newDirection;
  }

  walk(distance: number, map: any, direction: number) {
    const dx = Math.cos(direction) * distance;
    const dy = Math.sin(direction) * distance;
    const inDirectionX = map.get(
      this.state.position.x + dx,
      this.state.position.y,
    );
    const inDirectionY = map.get(
      this.state.position.x,
      this.state.position.y + dy,
    );

    if (inDirectionX === 2 || inDirectionY === 2) this.playerSounds.hitFence();
    if (inDirectionX === 1 || inDirectionY === 1) this.playerSounds.hitWall();

    if (inDirectionX <= 0) this.state.position.x += dx;
    if (inDirectionY <= 0) this.state.position.y += dy;
    this.state.movement.paces += distance;
  }

  grab() {
    const { grabbing } = this.state.FSM;
    const { grabDistance } = this.state.movement;

    if (grabbing === true && grabDistance < 300) {
      this.state.movement.grabDistance += 50;
    } else {
      this.state.FSM.grabbing = false;
      if (grabDistance !== 0) {
        this.state.movement.grabDistance -= 25;
      }
    }
  }

  put() {
    const { putting } = this.state.FSM;
    const { putDistance } = this.state.movement;

    if (putting === true && putDistance < 400) {
      this.state.movement.putDistance += 30;
    } else {
      this.state.FSM.putting = false;
      if (putDistance !== 0) {
        this.state.movement.putDistance -= 15;
      }
    }
  }

  update(controls: any, map: any, seconds: number) {
    const { speed } = this.state.movement;
    const { direction } = this.state.position;

    const distance = speed * seconds;
    const halfDistance = distance / 2;
    const sideDirection = direction - Math.PI / 2;

    this.state.FSM.running = controls.shift;
    this.state.FSM.walking =
      controls.forward ||
      controls.backward ||
      controls.sideLeft ||
      controls.sideRight;

    if (controls.left) this.rotate(-Math.PI * seconds);
    if (controls.right) this.rotate(Math.PI * seconds);
    if (controls.forward) {
      this.playerSounds.walk();
      this.walk(distance, map, direction);
    }
    if (controls.backward) {
      this.playerSounds.walk();
      this.walk(-distance, map, direction);
    }
    if (controls.sideLeft) {
      this.playerSounds.dodge();
      this.walk(halfDistance, map, sideDirection);
    }
    if (controls.sideRight) {
      this.playerSounds.dodge();
      this.walk(-halfDistance, map, sideDirection);
    }
    this.grab();
    this.put();

    this.state.movement.speed = this.state.FSM.running ? 3 : 1;
  }

  eat(victim: NPC) {
    victim.die();
    this.map.people--;
    this.showDieMessage();
  }

  attack() {
    this.state.FSM.grabbing = true;

    // TODO: Reduce the Objects list to just NPC list
    const victim = this.map.objects.find((item: any) => {
      const isValidNPC = item instanceof NPC && item.alive;

      if (!isValidNPC) {
        return false;
      }

      const dX = this.state.position.x - item.x;
      const dY = this.state.position.y - item.y;
      const distanceToNpc = Math.sqrt(dX * dX + dY * dY);
      const isNearNPC = distanceToNpc < 0.5;

      return isNearNPC;
    });

    if (victim) {
      this.playerSounds.kill();
      this.eat(victim);
    } else {
      this.playerSounds.attack();
    }
  }

  placePaper() {
    this.state.FSM.putting = true;

    const noPapersToPlace = this.map.papers >= GAME_OPTIONS.PAPER_NUM;

    if (noPapersToPlace) {
      this.showNoPaperMessage();
    } else {
      const isSamePlace =
        this.state.inventory.previosPaperPlace.x === this.state.position.x &&
        this.state.inventory.previosPaperPlace.y === this.state.position.y;

      const readyToPlaceHere =
        !isSamePlace &&
        !this.state.FSM.running &&
        !this.state.FSM.walking &&
        this.playerSounds.allSoundsEnded();

      if (readyToPlaceHere) {
        this.state.inventory.paperType = getRandomInt(0, 8);

        const paperBitmap = new Bitmap(
          this.state.inventory.papers[this.state.inventory.paperType].texture,
          this.state.inventory.papers[this.state.inventory.paperType].width,
          this.state.inventory.papers[this.state.inventory.paperType].height,
        );

        const paper = new Paper(
          this.state.position.x,
          this.state.position.y,
          paperBitmap,
        );

        this.map.addObject(paper);

        this.paperSounds.place();

        this.showPlacementMessage();

        this.state.inventory.previosPaperPlace = {
          x: this.state.position.x,
          y: this.state.position.y,
        };
        this.map.papers++;
      } else {
        this.showWarningMessage();
      }
    }
  }

  showPlacementMessage() {
    if (this.state.inventory.paperType === 0) {
      this.showLooMessage();
    } else if (this.state.inventory.paperType === 7) {
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

  do(action: string) {
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
