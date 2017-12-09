import { CIRCLE } from "../main.js";
import { MOBILE } from "../main.js";

export class Camera {
    constructor(canvas, resolution, focalLength) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = window.innerWidth * 0.5;
        this.height = canvas.height = window.innerHeight * 0.5;
        this.resolution = resolution;
        this.spacing = this.width / resolution;
        this.focalLength = focalLength || 0.8;
        this.range = MOBILE ? 8 : 14;
        this.lightRange = 5;
        this.scale = (this.width + this.height) / 1200;
    };

    render(player, map) {
        this.drawSky(player.direction, map.skybox, map.light);
        this.drawColumns(player, map);
        this.drawWeapon(player.left_hand,player.right_hand, player.paces);
        this.drawMiniMap(player, map);
    };

    drawSky(direction, sky, ambient) {
        let width = sky.width * (this.height / sky.height) * 2;
        let left = (direction / CIRCLE) * -width;

        this.ctx.save();
        this.ctx.drawImage(sky.image, left, 0, width, this.height);
        if (left < width - this.width) {
            this.ctx.drawImage(sky.image, left + width, 0, width, this.height);
        }
        if (ambient > 0) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.globalAlpha = ambient * 0.1;
            this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
        }
        this.ctx.restore();
    };

    drawColumn(column, ray, angle, map) {
        let ctx = this.ctx;
        let texture = map.wallTexture;
        let left = Math.floor(column * this.spacing);
        let width = Math.ceil(this.spacing);
        let hit = -1;

        while (++hit < ray.length && ray[hit].height <= 0);

        for (let s = ray.length - 1; s >= 0; s--) {
            let step = ray[s];
            let rainDrops = Math.pow(Math.random(), 3) * s;
            let rain = (rainDrops > 0) && this.project(0.006, angle, step.distance);

            if (s === hit) {
                let textureX = Math.floor(texture.width * step.offset);
                let wall = this.project(step.height, angle, step.distance);

                ctx.globalAlpha = 1;
                ctx.drawImage(texture.image, textureX, 0, 1, texture.height, left, wall.top, width, wall.height);

                ctx.fillStyle = '#2a3847';
                ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange - map.light, 0);
                ctx.fillRect(left, wall.top, width, wall.height);
            };

            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 1;
            while (--rainDrops > 0) ctx.fillRect(left, Math.random() * rain.top, 2, rain.height);
        };
    };

    drawColumns(player, map) {
        this.ctx.save();
        for (let column = 0; column < this.resolution; column++) {
            let x = column / this.resolution - 0.5;
            let angle = Math.atan2(x, this.focalLength);
            let ray = map.cast(player, player.direction + angle, this.range);
            this.drawColumn(column, ray, angle, map);
        };
        this.ctx.restore();
    };

    drawWeapon(left_hand,right_hand, paces) {
        let bobX = Math.cos(paces * 2) * this.scale * 6;
        let bobY = Math.sin(paces * 4) * this.scale * 6;
        let left_r = this.width * 0.6 + bobX;
        let left_l = this.width * 0.15 + bobX;
        let top = this.height * 0.6 + bobY;
        this.ctx.drawImage(left_hand.image, left_l, top, left_hand.width * this.scale, left_hand.height * this.scale);
        this.ctx.drawImage(right_hand.image, left_r, top, right_hand.width * this.scale, right_hand.height * this.scale);
    };

    drawMiniMap(player, map) {
    	let ctx = this.ctx;
    	let miniMapSize = this.width * .2;
    	let x = this.width - miniMapSize - 10;//отступы
    	let y = 10;//отступы
		let blockSize = miniMapSize / map.size;
    	let triangleX = x + (player.x / map.size * miniMapSize);
    	let triangleY = y + (player.y / map.size * miniMapSize);

    	ctx.save();

    	ctx.globalAlpha = .5; //фон карты
    	ctx.fillRect(x, y, miniMapSize, miniMapSize);

        ctx.globalAlpha = .5; //блоки
    	ctx.fillStyle = '#4c8847';

        for (let i = 0; i < map.size * map.size; i++) {
    		if (map.wallGrid[i]){
                let row = Math.floor( i/map.size);
                let col = i - map.size * row;
    			ctx.fillRect(x + (blockSize * col), y + (blockSize * row), blockSize, blockSize);
            }
    	}
    	ctx.save();

    	/*for (let i = 0; i < map.objects.length; i++){ //спрайты
    		if(map.objects[i]){
    				ctx.fillStyle = map.objects[i].color || 'blue';
    				ctx.globalAlpha = .8;
    				ctx.fillRect(x + (blockSize * map.objects[i].x) + blockSize * .25, y + (blockSize * map.objects[i].y) + blockSize * .25, blockSize * .5, blockSize * .5);
    		}
    	}*/
    	ctx.restore();

    	ctx.globalAlpha = 1; //игрок
    	ctx.fillStyle = '#fff';
    	ctx.moveTo(triangleX,triangleY);
    	ctx.translate(triangleX,triangleY);

    	ctx.rotate(player.direction - Math.PI * .5);
    	ctx.beginPath();
    	ctx.lineTo(-2, -3); // bottom left of triangle
    	ctx.lineTo(0, 2); // tip of triangle
    	ctx.lineTo(2,-3); // bottom right of triangle
    	ctx.fill();

    	ctx.restore();

    };

    project(height, angle, distance) {
        let z = distance * Math.cos(angle);
        let wallHeight = this.height * height / z;
        let bottom = this.height / 2 * (1 + 1 / z);
        return {
            top: bottom - wallHeight,
            height: wallHeight
        };
    };


}
