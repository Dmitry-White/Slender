import { Bitmap } from "./Bitmap.js";

export class Map {
    constructor(size) {
        this.size = size;
        this.autoFilledMap = this.autoFill(size);
        this.wallGrid = new Uint8Array(size * size);
        this.skybox = new Bitmap('img/sky_panorama.jpg', 2000, 750);
        this.wallTexture = new Bitmap('img/fence.png', 1024, 1024);
        this.light = 0;
    };

    get(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
        return this.wallGrid[y * this.size + x];
    };

    autoFill(size) {
        // size * size grid of 0 and 1
        //      111...111
        //      100...001
        //      .........
        //      100...001
        //      111...111
        let autoFilledMap = [];
        for (let i = 0; i < size; i++) {
            autoFilledMap.push(1);
        }
        for (let i = 0; i < size-2; i++) {
            autoFilledMap.push(1);
            for (let j = 0; j < size-2; j++) {
                autoFilledMap.push(0);
            }
            autoFilledMap.push(1);
        }
        for (let i = 0; i < size; i++) {
            autoFilledMap.push(1);
        }
        return autoFilledMap;
    }

    fillTheMap() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.wallGrid[i] = this.autoFilledMap[i];//Math.random() < 0.3 ? 1 : 0;
        };
    }

    randomize() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
        };
    };

    cast(point, angle, range) {
        let self = this;
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        let noWall = { length2: Infinity };

        return ray({ x: point.x, y: point.y, height: 0, distance: 0 });

        function ray(origin) {
            let stepX = step(sin, cos, origin.x, origin.y);
            let stepY = step(cos, sin, origin.y, origin.x, true);
            let nextStep = stepX.length2 < stepY.length2
                ? inspect(stepX, 1, 0, origin.distance, stepX.y)
                : inspect(stepY, 0, 1, origin.distance, stepY.x);
            if (nextStep.distance > range) return [origin];
            return [origin].concat(ray(nextStep));
        };

        function step(rise, run, x, y, inverted) {
            if (run === 0) return noWall;
            let dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
            let dy = dx * (rise / run);
            return {
                x: inverted ? y + dy : x + dx,
                y: inverted ? x + dx : y + dy,
                length2: dx * dx + dy * dy
            };
        };

        function inspect(step, shiftX, shiftY, distance, offset) {
            let dx = cos < 0 ? shiftX : 0;
            let dy = sin < 0 ? shiftY : 0;
            step.height = self.get(step.x - dx, step.y - dy);
            step.distance = distance + Math.sqrt(step.length2);
            if (shiftX) step.shading = cos < 0 ? 2 : 0;
            else step.shading = sin < 0 ? 2 : 1;
            step.offset = offset - Math.floor(offset);
            return step;
        };
    };

    update(seconds) {
        // --------------------- Random Lighting -------------------------------
        //if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
        //else if (Math.random() * 5 < seconds) this.light = 2;
        // ---------------------------------------------------------------------

        //this.light = Math.max(this.light - 10 * seconds, 0.4);  // nigth mode
        this.light = 2; //day mode
    };


}
