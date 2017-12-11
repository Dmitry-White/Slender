import { Bitmap } from "./Bitmap.js";
import { Paper } from "./Paper.js";
import { CIRCLE } from "../main.js";

export class Player {
    constructor(x, y, direction, papers, map, sounds) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.papers = papers;
        this.map = map;
        this.sounds = sounds;
        this.right_hand = new Bitmap('img/knife_hand.png', 200, 200);
        this.left_hand = new Bitmap('img/left_hand.png', 200, 200);
        this.paces = 0;
        this.paper = new Paper(0,0);
        this.speed = 1;
    };

    rotate(angle) {
        this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
    };

    walk(distance, map, direction) {
        let dx = Math.cos(direction) * distance;
        let dy = Math.sin(direction) * distance;
        if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
        if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
        this.paces += distance;
    };

    update(controls, map, seconds) {
        if (controls.left) this.rotate(-Math.PI * seconds);
        if (controls.right) this.rotate(Math.PI * seconds);
        if (controls.forward) {
            this.snowWalkSound()
            this.walk(this.speed * seconds, map, this.direction);
        }
        if (controls.backward) {
            this.snowWalkSound()
            this.walk(-(this.speed) * seconds, map, this.direction);
        }
        if (controls.sideLeft) {
            this.snowDodgeSound()
            this.walk(this.speed/2 * seconds, map, this.direction - Math.PI/2);
        }
        if (controls.sideRight) {
            this.snowDodgeSound()
            this.walk(-(this.speed/2) * seconds, map, this.direction - Math.PI/2);
        }
        if (controls.shift) this.speed = 4; else  this.speed = 1;
    };

    snowWalkSound() {
        if (this.sounds.sound_end) {
            (Math.random() > 0.5) ? this.sounds.makeSound('forward_step') :
                                    this.sounds.makeSound('backward_step');
        }
    }

    snowDodgeSound() {
        if (this.sounds.sound_end) {
            (Math.random() > 0.5) ? this.sounds.makeSound('dodge_step_0') :
                                    this.sounds.makeSound('dodge_step_1');
        }
    }

    dosmth(action){
        if(action === 'enter') console.log('Bam!');
        if(action === 'space') {
            console.log('The bomb has been planted!');
            this.paper.placePaper(this.papers, this.x, this.y, this.map);
        }
        if(action === 'escape') location.reload();
    }
}
