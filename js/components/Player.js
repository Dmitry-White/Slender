import { Paper } from "./Paper.js";
import { Bitmap } from "./Bitmap.js";
import { Calc } from "./Calc.js";
import { Person } from "./Person.js";
import { Camera } from "./Camera.js";

export class Player {
    constructor(origin) {
        this.x = origin.x;
        this.y = origin.y;
        this.direction = origin.direction;
        this.CIRCLE = origin.game.CIRCLE;
        this.papers = origin.game.papers;
        this.map = origin.game.map;
        this.sounds = origin.game.sounds;
        this.obj_sounds = origin.game.obj_sounds;
        this.mode = origin.game.mode;
        this.game = origin.game
        this.right_hand = new Bitmap('img/slender/right_hand.png', 200, 200);
        this.left_hand = new Bitmap('img/slender/left_hand.png', 200, 200);
        this.paces = 0;
        this.prev_paper_place = [0, 0];
        this.speed = 1;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
        this.grab_dist = 0;
        this.grab_state = false;
        this.put_dist = 0;
        this.put_state = false;
    };

    rotate(angle) {
        this.direction = (this.direction + angle + this.CIRCLE) % (this.CIRCLE);
    };

    walk(distance, map, direction) {
        const dx = Math.cos(direction) * distance;
        const dy = Math.sin(direction) * distance;
        const in_the_x_way = map.get(this.x + dx, this.y);
        const in_the_y_way = map.get(this.x, this.y + dy);

        if (in_the_x_way == 2 || in_the_y_way == 2) {
            this.hitting_the_fence = true;
            this.hitObject();
            this.hitting_the_fence = false;
        } else if (in_the_x_way == 1 || in_the_y_way == 1) {
            this.hitting_the_wall = true;
            this.hitObject();
            this.hitting_the_wall = false;
        }

        if (in_the_x_way <= 0) this.x += dx;
        if (in_the_y_way <= 0) this.y += dy;
        this.paces += distance;
    };

    update(controls, map, seconds) {
        this.running = controls.shift;
        this.walking = (controls.forward || controls.backward ||
                        controls.sideLeft || controls.sideRight);
        if (controls.left) this.rotate(-Math.PI * seconds);
        if (controls.right) this.rotate(Math.PI * seconds);
        if (controls.forward) {
            this.walkSound();
            this.walk(this.speed * seconds, map, this.direction);
        }
        if (controls.backward) {
            this.walkSound();
            this.walk(-(this.speed) * seconds, map, this.direction);
        }
        if (controls.sideLeft) {
            this.dodgeSound();
            this.walk(this.speed/2 * seconds, map, this.direction - Math.PI/2);
        }
        if (controls.sideRight) {
            this.dodgeSound();
            this.walk(-(this.speed/2) * seconds, map, this.direction - Math.PI/2);
        }
        this.grab();
        this.put();

        (controls.shift) ? this.speed = 3 : this.speed = 1;
    };

    grab(){
        if (this.grab_state === true && this.grab_dist < 300){
            this.grab_dist+=50;
        } else {
            this.grab_state = false;
            if (this.grab_dist!=0){
            this.grab_dist-=25;
            }
        }
    }
    put(){
        if (this.put_state === true && this.put_dist < 400){
            this.put_dist+=30;
        } else {
            this.put_state = false;
            if (this.put_dist!=0){
            this.put_dist-=15;
            }
        }
    }
    snowWalkSound() {
        if (this.sounds.sound_end) {
            if (this.running) {
                this.sounds.makeSound('running');
            } else {
                (Math.random() > 0.5) ? this.sounds.makeSound('forward_step') :
                                        this.sounds.makeSound('backward_step');
            }
        }
    };

    snowDodgeSound() {
        if (this.sounds.sound_end) {
            (Math.random() > 0.5) ? this.sounds.makeSound('dodge_step_0') :
                                    this.sounds.makeSound('dodge_step_1');
        }
    };

    rainWalkSound() {
        if (this.sounds.sound_end) {
            if (this.running) {
                this.sounds.makeSound('rain_running');
            } else {
                if (Math.random() > 0.2) {
                    if (Math.random() > 0.5) {
                        this.sounds.makeSound('rain_forward_step');
                    } else {
                        this.sounds.makeSound('rain_backward_step');
                    }
                } else {
                    this.sounds.makeSound('rain_step');
                }
            }
        }

    };

    rainDodgeSound() {
        if (this.sounds.sound_end) {
            (Math.random() > 0.5) ? this.sounds.makeSound('rain_dodge_step_0') :
                                    this.sounds.makeSound('rain_dodge_step_1');
        }
    };

    hitObject() {
        (this.mode.winter) ? this.snowHit() : this.rainHit();
    };

    snowHit() {
        if (this.obj_sounds.obj_sound_end) {
            if (this.hitting_the_fence) {
                this.obj_sounds.makeSound('hitting_the_fence');
            } else if (this.hitting_the_wall) {
                this.obj_sounds.makeSound('hitting_the_wall');
            }
        }
    };

    rainHit() {
        if (this.obj_sounds.obj_sound_end) {
            if (this.hitting_the_fence) {
                this.obj_sounds.makeSound('hitting_the_rain_fence');
                this.hitting_the_fence = false;
            } else if (this.hitting_the_wall) {
                this.obj_sounds.makeSound('hitting_the_wall');
                this.hitting_the_wall = false;
            }
        }
    };

    walkSound() {
        (this.mode.winter) ? this.snowWalkSound() : this.rainWalkSound();
    };

    dodgeSound() {
        (this.mode.winter) ? this.snowDodgeSound() : this.rainDodgeSound();
    };

    dosmth(action){
        if (action === 'attack') {
            this.grab_state = true;
            this.attack();
        }
        if (action === 'space') {
            this.put_state = true;
            this.placePaper();
        }
        if (action === 'escape') location.reload();
    };

    attack() {
        let x, y;
        let victim;
        let nearVictim = false;
        this.map.objects.some((item)=>{
            if(item instanceof Person && item.alive) {
                victim = item;
                x = this.x - victim.x;
                y = this.y - victim.y;
                if (Math.sqrt(x*x+y*y) < 0.5) {
                    return nearVictim = true;
                }
            }
        });
        if(nearVictim) {
            this.eat(victim);
        } else if (this.obj_sounds.obj_sound_end) {
            this.obj_sounds.makeSound('slashing');
        }
    };

    eat(victim){
        this.obj_sounds.makeSound('killing');
        victim.alive = false;
        victim.color = undefined;
        victim.die();
        this.map.people--;
    }

    placePaper() {
        let same_place = this.prev_paper_place[0] === this.x &&
                         this.prev_paper_place[1] === this.y;
        if (!this.running && !this.walking && this.sounds.sound_end && !same_place) {
            const paper_type = Calc.getRandomInt(0,8);
            this.map.addObject(new Paper(this.x,this.y, new Bitmap(this.papers[paper_type].texture, this.papers[paper_type].width, this.papers[paper_type].height)));
            if (paper_type === 0) {
                this.obj_sounds.makeSound('placing_loo_paper')
            } else if (paper_type === 7) {
                this.obj_sounds.makeSound('placing_bomb');
            } else {
                this.obj_sounds.makeSound('placing_paper');
            }
            this.prev_paper_place = [this.x, this.y];
        } else {
            this.map.show_message = 1;
            setTimeout(()=>{
    			this.map.show_message = 0;
    		},3000);
        }
    }
}
