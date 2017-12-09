import { CIRCLE } from "../main.js";
import { MOBILE } from "../main.js";
import { camera } from "../main.js";

export class Camera {
    constructor(canvas, resolution, fov) {
        this.ctx = canvas.getContext('2d');
    	this.width = canvas.width = window.innerWidth;
    	this.height = canvas.height = window.innerHeight;
    	this.resolution = resolution;
    	this.spacing = this.width / resolution;
    	this.fov = fov;
    	this.range = MOBILE ? 8 : 14;
    	this.lightRange = 5;
    	this.scale = (this.width + this.height) / 1200;
    };

    render(player, map, objects) {
        this.drawSky(player.direction, map.skybox, map.light);
        this.drawColumns(player, map, objects);
        this.drawWeapon(player.left_hand,player.right_hand, player.paces);
    };

    drawSky(direction, sky, ambient) {
        var width = this.width * (CIRCLE / this.fov);
    	var left = -width * direction / CIRCLE;

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
    	var ctx = this.ctx,
    		wallTexture = map.wallTexture,
    		floorTexture = map.floorTexture,
    		left = Math.floor(column * this.spacing),
    		width = Math.ceil(this.spacing),
    		hit = -1,
    		objects = [],
    		hitDistance;

    	while (++hit < ray.length && ray[hit].height <= 0);

    	for (var s = ray.length - 1; s >= 0; s--) {
    		var step = ray[s];
    		var rainDrops = Math.pow(Math.random(), 3) * s;
    		var rain = (rainDrops > 0) && this.project(0.1, angle, step.distance),
    		textureX,wall;

    		if (s === hit) {
    			textureX = Math.floor(wallTexture.width * step.offset);
    			wall = this.project(step.height, angle, step.distance);

    			ctx.globalAlpha = 1;
    			ctx.drawImage(wallTexture.image, textureX, 0, 1, wallTexture.height, left, wall.top, width, wall.height);

    			ctx.fillStyle = '#000000';
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

    		//ctx.fillStyle = '#ffffff';
    		//ctx.globalAlpha = 0.15;
    		//while (--rainDrops > 0) ctx.fillRect(left, Math.random() * rain.top, 1, rain.height);
    	}
    	return {
    		objects: objects,
    		hit: hitDistance
    	}
    };

    drawSprites(player,map,columnProps) {
        var screenWidth = this.width,
    		screenHeight = this.height,
    		screenRatio = screenWidth / this.fov,
    		resolution = this.resolution;

    	//probably should get these and pass them in, but modifying originals for now
    	// also this limits size of world

    	// calculate each sprite distance to player
    	this.setSpriteDistances(map.objects, player);


    	var sprites = Array.prototype.slice.call(map.objects)
    		.map(function(sprite){

    			var distX = sprite.x - player.x,
    				distY = sprite.y - player.y,
    				width = sprite.width * screenWidth / sprite.distanceFromPlayer,
    				height = sprite.height * screenHeight /  sprite.distanceFromPlayer,
    				renderedFloorOffset = sprite.floorOffset / sprite.distanceFromPlayer,
    				angleToPlayer = Math.atan2(distY,distX),
    				angleRelativeToPlayerView = player.direction - angleToPlayer,
    				top = (screenHeight / 2) * (1 + 1 / sprite.distanceFromPlayer) - height;

    			if(angleRelativeToPlayerView >= CIRCLE / 2){
    				angleRelativeToPlayerView -= CIRCLE;
    			}

    			var cameraXOffset = ( camera.width / 2 ) - (screenRatio * angleRelativeToPlayerView),
    				numColumns = width / screenWidth * resolution,
    				firstColumn = Math.floor( (cameraXOffset - width/2 ) / screenWidth * resolution);

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
    			// temp render red dot at item position
    			//camera.ctx.fillStyle = 'red';
    			//camera.ctx.fillRect(sprite.render.cameraXOffset, camera.height / 2, 3, 3);
    			return sprite;
    		})
    		// sort sprites in distance order
    		.sort(function(a,b){
    			if(a.distanceFromPlayer < b.distanceFromPlayer){
    				return 1;
    			}
    			if(a.distanceFromPlayer > b.distanceFromPlayer){
    				return -1;
    			}
    			return 0;
    		});

    		if(sprites.length > 1 ){
    			//debugger;
    		}
    	this.ctx.save();
    	for (var column = 0; column < this.resolution; column++) {
    		this.drawSpriteColumn(player,map,column,columnProps[column], sprites);
    	}
    	this.ctx.restore();
    }

    drawSpriteColumn(player,map,column,columnProps,sprites) {
        var ctx = this.ctx,
    		left = Math.floor(column * this.spacing),
    		width = Math.ceil(this.spacing),
    		angle = this.fov * (column / this.resolution - 0.5),
    		columnWidth = this.width / this.resolution,
    		sprite,props,obj,textureX,height,projection, mappedColumnObj,spriteIsInColumn,top;

    	//todo: make rays check for objects, and return those that it actually hit

    	//check if ray hit an object
    	//if(!columnProps.objects.length){return;}

    	sprites = sprites.filter(function(sprite){
    	 return !columnProps.hit || sprite.distanceFromPlayer < columnProps.hit;
    	});

    	for(var i = 0; i < sprites.length; i++){
    		sprite = sprites[i];

    		//mappedColumnObj = columnProps.objects.filter(function(obj){
    		//	return sprite === obj.object;
    		//})[0];

    		//if(!mappedColumnObj)return;

    		//determine if sprite should be drawn based on current column position and sprite width
    		spriteIsInColumn =  left > sprite.render.cameraXOffset - ( sprite.render.width / 2 ) && left < sprite.render.cameraXOffset + ( sprite.render.width / 2 );

    		//console.log(spriteIsInColumn);

    		if(spriteIsInColumn){
    			textureX = Math.floor( sprite.texture.width / sprite.render.numColumns * ( column - sprite.render.firstColumn ) );

    			this.ctx.fillStyle = 'black';
    			this.ctx.globalAlpha = 1;
    			//ctx.fillRect(left, top , 10, sprite.render.height);

    			var brightness = Math.max(sprite.distanceFromPlayer / this.lightRange - map.light, 0) * 100;

    			sprite.texture.image.style.webkitFilter = 'brightness(' + brightness + '%)';
    			sprite.texture.image.style.filter = 'brightness(' + brightness  + '%)';

    			ctx.drawImage(sprite.texture.image, textureX, 0, 1, sprite.texture.height, left, sprite.render.top, width, sprite.render.height);

    			//debugger;
    			//ctx.fillRect(left, sprite.render.top, columnWidth, sprite.render.height);
    			//debugger;
    		}
    	};
    }

    setSpriteDistances(objects, player) {
        let obj;
        for(let i = 0; i < objects.length; i++){
    		obj = objects[i];
    	}
    }

    drawColumns(player, map, objects) {
    	this.ctx.save();
    	var allObjects = [];
    	for (var column = 0; column < this.resolution; column++) {
    		var angle = this.fov * (column / this.resolution - 0.5);
    		var ray = map.cast(player, player.direction + angle, this.range);
    		var columnProps = this.drawColumn(column, ray, angle, map);

    		allObjects.push(columnProps);
    	}
    	this.ctx.restore();
    	this.ctx.save();
    	this.drawSprites(player,map,allObjects);
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

    project(height, angle, distance) {
    	var z = distance * Math.cos(angle);
    	var wallHeight = this.height * height / z;
    	var bottom = this.height / 2 * (1 + 1 / z);
    	return {
    		top: bottom - wallHeight,
    		height: wallHeight
    	};
    };

}
