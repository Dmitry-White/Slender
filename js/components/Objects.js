import { Bitmap } from "./Bitmap.js";

export class Objects {
    constructor(object,map,live) {
        for(let prop in object){
    		this[prop] = object[prop];
    	}
        //this.collection = [];
        this.map = map;
        this.logic = live ? this.badGuyLogic() : false;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
    };

    badGuyLogic(){
        walk(0.1, this.map, randomNum(max));
    }

    walk(distance, map, direction) {
        let dx = Math.cos(direction) * distance;
        let dy = Math.sin(direction) * distance;
        let in_the_x_way = map.get(this.x + dx, this.y);
        let in_the_y_way = map.get(this.x, this.y + dy);

        if (in_the_x_way == 2 || in_the_y_way == 2) {
            this.hitting_the_fence = true;
            this.snowWalkSound();
        } else if (in_the_x_way == 1 || in_the_y_way == 1) {
            this.hitting_the_wall = true;
            this.snowWalkSound();
        }
        if (in_the_x_way <= 0) this.x += dx;
        if (in_the_y_way <= 0) this.y += dy;
    };

    update() {
        this.map.objects.forEach(function(item){
            item.logic && item.logic();
        });
    }

    randomNum(max) {
        return Math.floor(0 + Math.random() * (max + 1 - 0));
    }
}
