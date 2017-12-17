import { Paper } from "./Paper.js";
import { Bitmap } from "./Bitmap.js";
import { Calc } from "./Calc.js";
import { Person } from "./Person.js";

export class Player {
    constructor(origin) {
        this.CIRCLE = origin.CIRCLE;
        this.x = origin.x;
        this.y = origin.y;
        this.direction = origin.direction;
        this.papers = origin.papers;
        this.map = origin.map;
        this.sounds = origin.sounds;
        this.obj_sounds = origin.obj_sounds;
        this.state = origin.state;
        this.right_hand = new Bitmap('img/slender/knife_hand.png', 200, 200);
        this.left_hand = new Bitmap('img/slender/left_hand.png', 200, 200);
        this.paces = 0;
        this.paper = new Paper(0,0);
        this.speed = 1;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
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
        (controls.shift) ? this.speed = 3 : this.speed = 1;
    };

    eat(person){
        const x = this.x - person.x;
        const y = this.y - person.y;
        if(Math.sqrt(x*x+y*y) < 0.5) {
            this.obj_sounds.makeSound('killing');
            person.alive = false;
            person.die();
            this.map.people--;
        } else this.obj_sounds.makeSound('slashing');
        console.log("To be eaten: ",this.map.people)

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
    }

    snowDodgeSound() {
        if (this.sounds.sound_end) {
            (Math.random() > 0.5) ? this.sounds.makeSound('dodge_step_0') :
                                    this.sounds.makeSound('dodge_step_1');
        }
    }

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
        (this.state.winter) ? this.snowHit() : this.rainHit();
    }

    snowHit () {
        if (this.obj_sounds.obj_sound_end) {
            if (this.hitting_the_fence) {
                this.obj_sounds.makeObjSound('hitting_the_fence');
            } else if (this.hitting_the_wall) {
                this.obj_sounds.makeObjSound('hitting_the_wall');
            }
        }
    };
    rainHit () {
        if (this.obj_sounds.obj_sound_end) {
            if (this.hitting_the_fence) {
                this.obj_sounds.makeObjSound('hitting_the_rain_fence');
                this.hitting_the_fence = false;
            } else if (this.hitting_the_wall) {
                this.obj_sounds.makeObjSound('hitting_the_wall');
                this.hitting_the_wall = false;
            }
        }
    };

    walkSound() {
        (this.state.winter) ? this.snowWalkSound() : this.rainWalkSound();
    }

    dodgeSound() {
        (this.state.winter) ? this.snowDodgeSound() : this.rainDodgeSound();
    }

    dosmth(action){
        if(action === 'atac') {
            this.map.objects.forEach((item)=>{
        		if(item instanceof Person && item.alive) {
                    this.eat(item);
                }
        	});
        }
        if(action === 'space') {
            if (!this.running && !this.walking && this.sounds.sound_end) {
                const paper_type = Calc.getRandomInt(0,8);
                this.map.addObject(new Paper(this.x,this.y, new Bitmap(this.papers[paper_type].texture, this.papers[paper_type].width, this.papers[paper_type].height)));
                if (paper_type === 0) {
                    this.sounds.makeSound('placing_loo_paper')
                } else if (paper_type === 7) {
                    this.sounds.makeSound('placing_bomb');
                } else {
                    this.sounds.makeSound('placing_paper');
                }
            }
        }
        if(action === 'escape') location.reload();
    }
}
