import { Objects } from "./Objects.js";

export class Camera {
    constructor(canvas, resolution, fov, mode, CIRCLE) {
        this.CIRCLE = CIRCLE;
        this.mode = mode;
        this.ctx = canvas.getContext('2d');
    	this.width = canvas.width = window.innerWidth;
    	this.height = canvas.height = window.innerHeight;
    	this.resolution = resolution;
    	this.spacing = this.width / resolution;
    	this.fov = fov;
    	this.range = 14;
    	this.scale = (this.width + this.height) / 1200;
    };

    render(player, map) {
        this.drawSky(player.direction, map.skybox, map.light);
        this.drawColumns(player, map);
        this.drawWeapon(player.left_hand,player.right_hand, player.paces);
        this.drawMiniMap(player, map);
    };

    drawSky(direction, sky, ambient) {
        const width =  sky.width * (this.height / sky.height) * 2;
    	const left = -width * direction / this.CIRCLE ;

    	this.ctx.save();
    	this.ctx.drawImage(sky.image, left, 0, width, this.height);
    	if (left < width - this.width) {
    		this.ctx.drawImage(sky.image, left + width, 0, width, this.height);
    	}

    	if (ambient > 0) {
    		this.ctx.fillStyle = this.mode.ground;
    		this.ctx.globalAlpha = ambient * this.mode.param;
    		this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
    	}
    	this.ctx.restore();
    };

    drawColumn(column, ray, angle, map) {
        this.lightRange = this.mode.lightRange;
    	const ctx = this.ctx;
    	const left = Math.floor(column*this.spacing);
		const width = Math.ceil(this.spacing);
        let wallTexture = map.wallTexture;
    	let hit = -1;
        let objects = [];
    	let hitDistance;
        let step;

    	while (++hit < ray.length && ray[hit].height <= 0);

    	for (let s = (ray.length - 1); s >= 0; s--) {
    		step = ray[s];
            if (step.height === 3) {
                wallTexture = map.fenceDoorTexture;
                step.height = 1;
            } else if(step.height === 2){
                wallTexture = map.fenceTexture;
                step.height = 1;
            } else wallTexture = map.wallTexture;

            let drops_seed = 0;
            (this.mode.winter) ? drops_seed = 3 : drops_seed = s;

    		let rainDrops = Math.pow(Math.random(), this.mode.drops_amount) * drops_seed;
    		const rain = (rainDrops > 0) && this.project(0.1, angle, step.distance);
    		let textureX, wall;

    		if (s === hit) {
    			textureX = Math.floor(wallTexture.width * step.offset);
    			wall = this.project(step.height, angle, step.distance);

    			ctx.globalAlpha = 1;
    			ctx.drawImage(wallTexture.image, textureX, 0, 1, wallTexture.height, left, wall.top, width, wall.height);

    			ctx.fillStyle = this.mode.shadows;
                this.shading = step.shading;
    			ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange - map.light, 0);
    			ctx.fillRect(left, wall.top, width, wall.height);
    			hitDistance = step.distance;
    		} else if(step.object){

    			objects.push({
    				object: step.object,
    				distance: step.distance,
    				offset: step.offset,
    				angle: angle
    			});

    		}
    		ctx.fillStyle = this.mode.drops;
    		ctx.globalAlpha = this.mode.drops_opacity;
    		while (--rainDrops > 0) ctx.fillRect(left, Math.random() * rain.top,
                                                this.mode.particlesWidth,
                                                this.mode.particlesHeight);
    	}
    	return {
    		objects: objects,
    		hit: hitDistance
    	}
    };

    drawColumns(player, map) {
        this.ctx.save();
        let allObjects = [];
        for (let column = 0; column < this.resolution; column++) {
            let angle = this.fov * (column / this.resolution - 0.5);
            let ray = map.cast(player, player.direction + angle, this.range);
            let columnProps = this.drawColumn(column, ray, angle, map);

            allObjects.push(columnProps);
        }
        this.drawSprites(player,map,allObjects);
        this.ctx.restore();
    };

    drawSprites(player, map, columnProps) {
        const screenWidth = this.width;
    	const screenHeight = this.height;
    	const screenRatio = screenWidth / this.fov;
    	const resolution = this.resolution;

    	// calculate each sprite distance to player
    	this.setSpriteDistances(map.objects, player);

    	let sprites = Array.prototype.slice.call(map.objects)
    		.map((sprite) => {
    			const distX = sprite.x - player.x;
    			const distY = sprite.y - player.y;
    			const width = sprite.width * screenWidth / sprite.distanceFromPlayer;
    			const height = sprite.height * screenHeight /  sprite.distanceFromPlayer;
    			const renderedFloorOffset = sprite.floorOffset / sprite.distanceFromPlayer;
    			const angleToPlayer = Math.atan2(distY,distX);
                const top = (screenHeight / 2) * (1 + 1 / sprite.distanceFromPlayer) - height;
                const numColumns = width / screenWidth * resolution;
    			let angleRelativeToPlayerView = player.direction - angleToPlayer;

    			if(angleRelativeToPlayerView >= this.CIRCLE / 2){
    				angleRelativeToPlayerView -= this.CIRCLE;
    			}

                const cameraXOffset = ( this.width / 2 ) - (screenRatio * angleRelativeToPlayerView);
    			const firstColumn = Math.floor( (cameraXOffset - width/2 ) / screenWidth * resolution);

    			sprite.distanceFromPlayer = Math.sqrt( Math.pow( distX, 2) + Math.pow( distY, 2) );
    			sprite.render = {
    				width: width,
    				height: height,
    				angleToPlayer: angleRelativeToPlayerView,
    				cameraXOffset: cameraXOffset,
    				distanceFromPlayer: sprite.distanceFromPlayer,
    				numColumns: numColumns,
    				firstColumn: firstColumn,
    				top: top
    			};
    			return sprite;
    		})
    		// sort sprites in distance order
    		.sort((a,b) => {
    			if(a.distanceFromPlayer < b.distanceFromPlayer)	return 1;
    			if(a.distanceFromPlayer > b.distanceFromPlayer)	return -1;
    			return 0;
    		});

    	this.ctx.save();
    	for (let column = 0; column < this.resolution; column++) {
    		this.drawSpriteColumn(player,map,column,columnProps[column], sprites);
    	}
    	this.ctx.restore();
    }

    drawSpriteColumn(player, map, column, columnProps, sprites) {
        const ctx = this.ctx;
    	const left = Math.floor(column * this.spacing);
    	const width = Math.ceil(this.spacing);
        const columnWidth = this.width / this.resolution;
    	let angle = this.fov * (column / this.resolution - 0.5);
    	let sprite, props, obj, textureX, height, projection, mappedColumnObj, spriteIsInColumn, top;

    	sprites = sprites.filter((sprite) => {
            return !columnProps.hit || sprite.distanceFromPlayer < columnProps.hit;
    	});

    	for(let i = 0; i < sprites.length; i++){
    		sprite = sprites[i];
    		spriteIsInColumn =  left > sprite.render.cameraXOffset - ( sprite.render.width / 2 ) && left < sprite.render.cameraXOffset + ( sprite.render.width / 2 );

    		if(spriteIsInColumn){
                textureX = Math.floor( sprite.texture.width / sprite.render.numColumns * ( column - sprite.render.firstColumn ) );
                ctx.drawImage(sprite.texture.image, textureX, 0, 1, sprite.texture.height, left, sprite.render.top, width, sprite.render.height);
    			this.ctx.fillStyle = '#000';
    			this.ctx.globalAlpha = 1;
    		}
    	};
    }

    setSpriteDistances(objects, player) {
        let obj;
        for(let i = 0; i < objects.length; i++){
            obj = objects[i];
    	}
    }

    drawWeapon(left_hand,right_hand, paces) {
        const bobX = Math.cos(paces * 2) * this.scale * 6;
        const bobY = Math.sin(paces * 4) * this.scale * 6;
        const left_r = this.width * 0.6 + bobX;
        const left_l = this.width * 0.15 + bobX;
        const top = this.height * 0.6 + bobY;
        this.ctx.drawImage(left_hand.image, left_l, top, left_hand.width * this.scale, left_hand.height * this.scale);
        this.ctx.drawImage(right_hand.image, left_r, top, right_hand.width * this.scale, right_hand.height * this.scale);
    };

    drawMiniMap(player, map) {
    	const ctx = this.ctx;
    	const miniMapSize = this.width * .2;
    	const x = this.width - miniMapSize - 10;
    	const y = 10;
		const blockSize = miniMapSize / map.size;
    	const triangleX = x + (player.x / map.size * miniMapSize);
    	const triangleY = y + (player.y / map.size * miniMapSize);

    	ctx.save();

    	ctx.globalAlpha = .5; // map background
    	ctx.fillRect(x, y, miniMapSize, miniMapSize);

        ctx.globalAlpha = .5; // blocks
    	ctx.fillStyle = '#4c8847';

        for (let i = 0; i < map.size * map.size; i++) {
    		if (map.wallGrid[i]){
                if(map.wallGrid[i]===2){
                    ctx.fillStyle = '#35384b';
                } else ctx.fillStyle = '#4c8847';
                let row = Math.floor( i/map.size);
                let col = i - map.size * row;
    			ctx.fillRect(x + (blockSize * col), y + (blockSize * row), blockSize, blockSize);
            }
    	}
    	ctx.save();

    	for (let i = 0; i < map.objects.length; i++){ // sprites
    		if(map.objects[i]){
                if(map.objects[i]===1)
                    ctx.fillStyle = map.objects[i].color;
                    ctx.globalAlpha = map.objects[i].logic ? .8 : .3;
                    if (map.objects[i].color === undefined) ctx.globalAlpha = 0;
                    ctx.fillStyle = map.objects[i].color || 'red';

    				ctx.fillRect(x + (blockSize * (map.objects[i].x - 0.5)) + blockSize * .25, y + (blockSize * (map.objects[i].y - 0.5)) + blockSize * .25, blockSize * .5, blockSize * .5);
    		}
    	}
    	ctx.restore();

    	ctx.globalAlpha = 1; // player
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
    	const z = distance * Math.cos(angle);
    	const wallHeight = this.height * height / z;
    	const bottom = this.height / 2 * (1 + 1 / z);
    	return {
    		top: bottom - wallHeight,
            bottom: bottom,
    		height: wallHeight
    	};
    };

}
