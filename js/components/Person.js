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
        this.count += getRandomFloat(5);

        if (this.count > 30 / this.speed){
            this.direction = getRandomFloat(CIRCLE);
            this.count = 0;
        }
        this.walk(0.04 * this.speed, this.map, this.direction);

        function getRandomFloat(max){
            return (0 + Math.random() * (max + 1 - 0));
        }
    }

    walk(distance, map, direction) {
        let dx = Math.cos(direction) * distance;
        let dy = Math.sin(direction) * distance;
        let in_the_x_way = map.get(this.x + dx, this.y);
        let in_the_y_way = map.get(this.x, this.y + dy);

        if (in_the_x_way == 2 || in_the_y_way == 2) {
            this.hitting_the_fence = true;
        } else if (in_the_x_way == 1 || in_the_y_way == 1) {
            this.hitting_the_wall = true;
        }
        if (in_the_x_way <= 0) this.x += dx;
        if (in_the_y_way <= 0) this.y += dy;
    };

}
