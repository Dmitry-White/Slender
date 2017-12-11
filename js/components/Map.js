import { Bitmap } from "./Bitmap.js";
import { MapObject } from "./MapObject.js";

export class Map {
    constructor(size) {
        this.size = size;
        this.wallGrid = new Uint8Array(size * size);
        this.skybox = new Bitmap('img/sky_panorama.jpg', 2000, 750);
        this.fenceTexture = new Bitmap('img/fence.png', 1024, 1024);
        this.fenceDoorTexture = new Bitmap('img/fence_door_0.jpg', 2048, 1024);
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
        if (this.get(col, row) == 0) {
            let num = this.getRandomInt(0,4);
            this.addObject({
            	color: '',
            	texture: new Bitmap(trees[num].texture, trees[num].width, trees[num].height),
            	height: 1,
            	width: 0.5,
            },col,row);
        };
    };

    addBushes(bushes, col, row) {
        if (this.get(col, row) == 0) {
            let num = this.getRandomInt(0,5);
            this.addObject({
            	color: '',
            	texture: new Bitmap(bushes[num].texture, bushes[num].width, bushes[num].height),
            	height: 0.5,
            	width: 0.5,
            },col,row);
        };
    };

    buildMap(trees, bushes) {
        this.wallGrid.fill(0);
        for (let i = 0; i < this.size * this.size; i++) {
            let row = Math.floor(i/this.size);
            let col = i - this.size * row;
            // Generate the labirinth
            if((row !== 1) && (row !== this.size - 2)
            && (col !== 1) && (col !== this.size - 2)) {
                if (Math.random() > 0.2) {
                    Math.random() > 0.5 ? this.addBushes(bushes, col+1.5, row+1.5)
                                        : this.addTrees(trees, col+1.5, row+1.5);
                }
                if (Math.random() > 0.7) {
                    this.wallGrid[i] = 1;
                }
            }
            // Generate the fence
            if((row === 0) || (row === this.size - 1)
            || (col === 0) || (col === this.size - 1)) {
                this.wallGrid[i] = 2;
            }
        };
        this.wallGrid[1] = 3;
    };

    cast(point, angle, range, objects) {
    	let self = this;
    	let sin = Math.sin(angle);
    	let cos = Math.cos(angle);
    	let noWall = { length2: Infinity };

    	return ray({
    		x: point.x,
    		y: point.y,
    		height: 0,
    		distance: 0
    	});

    	function ray(origin) {
    		let stepX = step(sin, cos, origin.x, origin.y);
    		let stepY = step(cos, sin, origin.y, origin.x, true);
    		let nextStep = stepX.length2 < stepY.length2 ? inspect(stepX, 1, 0, origin.distance, stepX.y) : inspect(stepY, 0, 1, origin.distance, stepY.x);

    		if (nextStep.distance > range) return [origin];
    		return [origin].concat(ray(nextStep));
    	}

    	function step(rise, run, x, y, inverted) {
    		if (run === 0) return noWall;
    		let dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    		let dy = dx * (rise / run);
    		return {
    			x: inverted ? y + dy : x + dx,
    			y: inverted ? x + dx : y + dy,
    			length2: dx * dx + dy * dy
    		};
    	}

    	function inspect(step, shiftX, shiftY, distance, offset) {
    		let dx = cos < 0 ? shiftX : 0;
    		let dy = sin < 0 ? shiftY : 0;
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
