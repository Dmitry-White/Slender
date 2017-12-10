import { Bitmap } from "./Bitmap.js";
import { MapObject } from "./MapObject.js";

export class Map {
    constructor(size) {
        this.size = size;
        this.wallGrid = new Uint8Array(size * size);
        this.skybox = new Bitmap('img/sky_panorama.jpg', 2000, 750);
        this.fenceTexture = new Bitmap('img/fence.png', 1024, 1024);
        this.wallTexture = new Bitmap('img/wall_texture_3.jpg', 1024, 1024);
        this.light = 2;
        this.objects = [];
    };

    get(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
        return this.wallGrid[y * this.size + x];
    };

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    addTrees(trees, col, row) {
        let num = this.getRandomInt(1,4);
        this.addObject({
        	color: '',
        	texture: new Bitmap(trees[num].texture, trees[num].width, trees[num].height),
        	height: 1,
        	width: 0.5,
        },col,row);
   }

    buildMap(trees) {
        this.wallGrid.fill(0);
        for (let i = 0; i < this.size * this.size; i++) {
            let row = Math.floor(i/this.size);
            let col = i - this.size * row;
            //генерация лабиринта
            if((row !== 1) && (row !== this.size - 2)
            && (col !== 1) && (col !== this.size - 2)) {
                if (Math.random() > 0.4) {
                    this.addTrees(trees, col+2, row+2);
                }
                if (Math.random() > 0.7) {
                    this.wallGrid[i] = 1;
                }
            }
            //генерация забора
            if((row === 0) || (row === this.size - 1)
            || (col === 0) || (col === this.size - 1)) {
                        this.wallGrid[i] = 2;
            }
        };
    };

    cast(point, angle, range, objects) {
    	var self = this,
    		sin = Math.sin(angle),
    		cos = Math.cos(angle),
    		noWall = {
    			length2: Infinity
    		};

    	return ray({
    		x: point.x,
    		y: point.y,
    		height: 0,
    		distance: 0
    	});

    	function ray(origin) {
    		var stepX = step(sin, cos, origin.x, origin.y);
    		var stepY = step(cos, sin, origin.y, origin.x, true);
    		var nextStep = stepX.length2 < stepY.length2 ? inspect(stepX, 1, 0, origin.distance, stepX.y) : inspect(stepY, 0, 1, origin.distance, stepY.x);

    		if (nextStep.distance > range) return [origin];
    		return [origin].concat(ray(nextStep));
    	}

    	function step(rise, run, x, y, inverted) {
    		if (run === 0) return noWall;
    		var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    		var dy = dx * (rise / run);
    		return {
    			x: inverted ? y + dy : x + dx,
    			y: inverted ? x + dx : y + dy,
    			length2: dx * dx + dy * dy
    		};
    	}

    	function inspect(step, shiftX, shiftY, distance, offset) {
    		var dx = cos < 0 ? shiftX : 0;
    		var dy = sin < 0 ? shiftY : 0;
    		step.height = self.get(step.x - dx, step.y - dy);
    		step.distance = distance + Math.sqrt(step.length2);
    		step.object = self.getObject(step.x - dx, step.y - dy);
    		if (shiftX) step.shading = cos < 0 ? 2 : 0;
    		else step.shading = sin < 0 ? 2 : 1;
    		step.offset = offset - Math.floor(offset);
    		return step;
    	}
    };

    /*update(seconds) {
        // --------------------- Random Lighting -------------------------------
        //if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
        //else if (Math.random() * 5 < seconds) this.light = 2;
        // ---------------------------------------------------------------------

        //this.light = Math.max(this.light - 10 * seconds, 0.4);  // nigth mode
        this.light = 2; //day mode
    };*/

    addObject(object,x,y) {
        this.objects.push( new MapObject(object,x,y) );
    }

    getObject(x,y) {
        x = Math.floor(x);
    	y = Math.floor(y);
    	return this.objects[y * this.size + x];
    }


}
