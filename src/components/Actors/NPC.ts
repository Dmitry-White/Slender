import { CIRCLE, getRandomFloat } from '../../utils/calc';
import Bitmap from '../Engine/Bitmap';
import Game from '../Game';
import Map from '../World/Map';
import Paper from '../World/Paper';

import Player from './Player';
import { IActorState } from './interface';

class NPC {
  game: Game;

  player: Player;

  map: Map;

  paper: Paper;

  state: IActorState;

  constructor(
    game: Game,
    player: Player,
    map: Map,
    x: number,
    y: number,
    picNum: number,
  ) {
    this.game = game;
    this.player = player;
    this.map = map;
    this.paper = null;
    this.state = {
      position: {
        x,
        y,
        direction: 1,
      },
      movement: {
        paces: 0,
        speed: 0.7,
        paperNearPerson: 0,
        count: 0,
      },
      FSM: {
        walking: false,
        running: false,
        taking: false,
        foundPaper: false,
        dead: false,
      },
      appearance: {
        picNum,
        color: '#cf3c8c',
        texture: new Bitmap(`assets/images/npc-${picNum}.png`, 114, 300),
        height: 0.6,
        width: 0.225,
        floorOffset: 0,
      },
    };

    // this.found_dead = false;
  }

  logic() {
    if (!this.state.FSM.dead) {
      if (this.state.movement.count > 270) {
        this.state.position.direction += getRandomFloat(
          -(CIRCLE / 6),
          CIRCLE / 6,
        );
        this.state.movement.count = 0;
      }

      // this.lookForDead()
      this.searchForPaper();
      if (!this.state.FSM.foundPaper && !this.state.FSM.taking) {
        this.wanderAround();
      }
    }
  }

  wanderAround() {
    this.state.movement.count += 1;
    this.run();
    this.walk(0.05 * this.state.movement.speed, this.state.position.direction);
  }

  run() {
    const distToPlayer = this.distTo(this.player);
    if (distToPlayer < 2) {
      this.state.movement.speed = 3;
      this.state.position.direction = -this.player.state.position.direction;
    } else this.state.movement.speed = 0.7;
  }

  walk(distance: number, direction: number) {
    const dx = Math.cos(direction) * distance;
    const dy = Math.sin(direction) * distance;
    const inDirectionX = this.map.get(
      this.state.position.x + dx,
      this.state.position.y,
    );
    const inDirectionY = this.map.get(
      this.state.position.x,
      this.state.position.y + dy,
    );

    if (
      inDirectionX === 2 ||
      inDirectionY === 2 ||
      inDirectionX === 1 ||
      inDirectionY === 1
    ) {
      this.state.position.direction = direction + CIRCLE / 6;
    }
    if (inDirectionX <= 0) this.state.position.x += dx;
    if (inDirectionY <= 0) this.state.position.y += dy;
    this.move();
  }

  move() {
    const NPC_URL = 'assets/images/npc';
    if (this.state.movement.count % 10 === 0) {
      if (this.state.movement.count % 20 === 0) {
        this.state.appearance.texture = new Bitmap(
          `${NPC_URL}2-${this.state.appearance.picNum}.png`,
          114,
          300,
        );
      } else
        this.state.appearance.texture = new Bitmap(
          `${NPC_URL}-${this.state.appearance.picNum}.png`,
          114,
          300,
        );
    }
  }

  searchForPaper() {
    let dx;
    let dy;
    let distToPaper;
    let paper;
    this.map.objects.some((item: any) => {
      if (item instanceof Paper) {
        paper = item;
        dx = this.state.position.x - paper.state.position.x;
        dy = this.state.position.y - paper.state.position.y;
        distToPaper = this.distTo(paper);
        this.isNearPaper(distToPaper, paper, dx, dy);
      }
    });
  }

  isNearPaper(distToPaper: number, paper: Paper, dx: number, dy: number) {
    if (distToPaper < 5 && this.distTo(this.player) > 3) {
      this.paper = paper;
      this.state.FSM.foundPaper = true;
      if (distToPaper < 0.3) {
        this.takingPaper();
      } else {
        this.approachPaper(dx, dy);
      }
    } else this.state.FSM.foundPaper = false;
  }

  takingPaper() {
    this.state.movement.speed = 0;
    this.state.FSM.taking = true;
    this.takePaper();
  }

  takePaper() {
    this.state.movement.paperNearPerson++;
    if (this.state.movement.paperNearPerson === 70) {
      const idx = this.map.objects.indexOf(this.paper);
      if (idx !== -1) {
        this.map.objects.splice(idx, 1);
      }
      this.map.objects.forEach((item: any) => {
        if (item instanceof NPC) {
          const npc = item as NPC;
          npc.state.FSM.foundPaper = false;
          npc.state.FSM.taking = false;
          npc.state.movement.paperNearPerson = 0;
        }
      });
      this.game.gui.showTakenMessage();
    }
  }

  approachPaper(dx: number, dy: number) {
    const distToWalk = 0.007 * this.state.movement.speed;
    dx >= 0
      ? (this.state.position.x -= distToWalk)
      : (this.state.position.x += distToWalk);
    dy >= 0
      ? (this.state.position.y -= distToWalk)
      : (this.state.position.y += distToWalk);
    this.state.movement.count += 0.5;
    this.move();
  }

  /*
  lookForDead() {
      let dead, dx_dead, dy_dead, dist_to_dead;
      this.map.objects.some((item)=>{
          if(item instanceof NPC && item.state.FSM.dead) {
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
      this.state.FSM.foundPaper = false;
      this.state.FSM.taking = false;
      this.state.movement.speed = 3;
      this.state.position.direction = getRandomFloat(1,4);
  };

  stayCalm() {
      this.state.movement.speed = .7;
      this.found_dead = false;
  }; */

  die() {
    this.state.FSM.dead = true;
    this.state.appearance.color = undefined;
    this.state.appearance.texture = new Bitmap(
      'assets/images/npc_die.gif',
      114,
      300,
    );
    setTimeout(() => {
      this.state.appearance.texture = new Bitmap(
        `assets/images/npc3-${this.state.appearance.picNum}.png`,
        300,
        56,
      );
      this.state.appearance.height = 0.2;
      this.state.appearance.width = 0.7;
    }, 7000);
  }

  distTo(thing: any) {
    // TODO: Doesn't work for player currently
    const x = thing.x - this.state.position.x;
    const y = thing.y - this.state.position.y;
    return Math.sqrt(x * x + y * y);
  }
}

export default NPC;
