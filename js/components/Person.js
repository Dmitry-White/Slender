import { CIRCLE } from "../main.js";
import { Bitmap } from "./Bitmap.js";

export class Person {
    constructor(map,x,y) {
        this.x = x;
        this.y = y;
        this.color = '#cf3c8c',
        this.texture = new Bitmap('img/cowboy.png', 639, 1500),
        this.height = .6,
        this.width = .225,
        this.floorOffset = 0,
        this.map = map;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
        this.count = 0;
        this.direction = 1;
        this.speed = 0.5;
    };

    logic(){
        this.count += getRandomFloat(0, 5);

        if (this.count > 120 / this.speed){
            this.direction = this.direction + getRandomFloat(-(CIRCLE/6),CIRCLE/6);
            this.count = 0;
        }
        this.walk(0.04 * this.speed, this.map, this.direction);

        function getRandomFloat(min , max){
            return min + Math.random() * (max + 1 - min);
        }
    }

    walk(distance, map, direction) {
        let dx = Math.cos(direction) * distance;
        let dy = Math.sin(direction) * distance;
        let in_the_x_way = map.get(this.x + dx, this.y);
        let in_the_y_way = map.get(this.x, this.y + dy);

        if (in_the_x_way == 2 || in_the_y_way == 2) {
            this.hitting_the_fence = true;
            this.direction = direction + CIRCLE/6;
            this.walk(distance, map, this.direction);
        } else if (in_the_x_way == 1 || in_the_y_way == 1) {
            this.hitting_the_wall = true;
            this.direction = direction + CIRCLE/6;
            this.walk(distance, map, this.direction);
        }
        if (in_the_x_way <= 0) this.x += dx;
        if (in_the_y_way <= 0) this.y += dy;
    };

}
