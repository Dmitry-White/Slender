import { Bitmap } from "./Bitmap.js";
import { CIRCLE } from "../main.js";

export class Objects {
    constructor(object,live) {
        //this.collection = [];
        this.color = object.color|| '', //цвет для ребят. если куст - не указывать
        this.texture = object.texture || new Bitmap('img/trees/tree_1.png', 639, 1500),
        this.height = object.height || 1,
        this.width = object.width || 0.5,
        this.floorOffset = object.floorOffset || 0,
        this.map;
        this.logic = live ? this.badGuyLogic : false;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
        this.count = 0;
        this.direction = 1;
        this.speed = 0.5;

        for(let prop in object){
    		this[prop] = object[prop];
    	}
    };

    badGuyLogic(){
        this.count += this.randomNum(5);

        if (this.count > 30 / this.speed){
            console.log(this.count);
            this.direction = this.randomNum(CIRCLE);
            this.count = 0;
        }
        this.walk(0.04 * this.speed, this.map, this.direction);
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

    randomNum(max) {
        return Math.floor(0 + Math.random() * (max + 1 - 0));
    }
}
