import GAME_OPTIONS from '../../core/config';
import { CIRCLE } from '../../utils/calc';
import NPC from '../Actors/NPC';
import Player from '../Actors/Player';
import Game from '../Game';
import Map from '../World/Map';
import { MapObject } from '../World/interface';

import Bitmap from './Bitmap';
import { Sprite } from './interface';

class Camera {
  ctx: CanvasRenderingContext2D;

  width: number;

  height: number;

  game: Game;

  mode: any;

  map: Map;

  resolution: number;

  fov: number;

  spacing: number;

  range: number;

  scale: number;

  shading: number;

  lightRange: number;

  constructor(canvas: HTMLCanvasElement, game: Game, mode: any, map: Map) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.game = game;
    this.mode = mode;
    this.map = map;
    this.resolution = GAME_OPTIONS.RESOLUTION;
    this.fov = GAME_OPTIONS.FOV;
    this.spacing = this.width / this.resolution;
    this.range = 14;
    this.scale = (this.width + this.height) / 1200;
  }

  render(player: Player, map: Map) {
    this.drawSky(player.state.position.direction, map.skybox, map.light);
    this.drawColumns(player, map);
    this.drawWeapon(
      player.leftHand,
      player.rightHand,
      player.state.movement.paces,
      player.state.movement.grabDistance,
      player.state.movement.putDistance,
    );
    this.drawMiniMap(player, map);

    this.game.gui.drawInfo();
    this.game.gui.drawMessage();
  }

  drawSky(direction: number, sky: any, ambient: number) {
    const width = sky.width * (this.height / sky.height) * 2;
    const left = (-width * direction) / CIRCLE;

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
  }

  drawColumn(column: number, ray: any, angle: number, map: Map) {
    this.lightRange = this.mode.lightRange;
    const { ctx } = this;
    const left = Math.floor(column * this.spacing);
    const width = Math.ceil(this.spacing);
    let { wallTexture } = map;
    let hit = -1;
    const objects = [];
    let hitDistance;
    let step;

    while (++hit < ray.length && ray[hit].height <= 0);

    for (let s = ray.length - 1; s >= 0; s--) {
      step = ray[s];
      if (step.height === 3) {
        wallTexture = map.fenceDoorTexture;
        step.height = 1;
      } else if (step.height === 2) {
        wallTexture = map.fenceTexture;
        step.height = 1;
      } else wallTexture = map.wallTexture;

      let drops_seed = 0;
      this.mode.winter ? (drops_seed = 3) : (drops_seed = s);

      let rainDrops =
        Math.pow(Math.random(), this.mode.drops_amount) * drops_seed;
      const rain = rainDrops > 0 && this.project(0.1, angle, step.distance);
      let textureX;
      let wall;

      if (s === hit) {
        textureX = Math.floor(wallTexture.width * step.offset);
        wall = this.project(step.height, angle, step.distance);

        ctx.globalAlpha = 1;
        ctx.drawImage(
          wallTexture.image,
          textureX,
          0,
          1,
          wallTexture.height,
          left,
          wall.top,
          width,
          wall.height,
        );

        ctx.fillStyle = this.mode.shadows;
        this.shading = step.shading;
        ctx.globalAlpha = Math.max(
          (step.distance + step.shading) / this.lightRange - map.light,
          0,
        );
        ctx.fillRect(left, wall.top, width, wall.height);
        hitDistance = step.distance;
      } else if (step.object) {
        objects.push({
          object: step.object,
          distance: step.distance,
          offset: step.offset,
          angle,
        });
      }
      ctx.fillStyle = this.mode.drops;
      ctx.globalAlpha = this.mode.drops_opacity;
      while (--rainDrops > 0)
        ctx.fillRect(
          left,
          Math.random() * rain.top,
          this.mode.particlesWidth,
          this.mode.particlesHeight,
        );
    }
    return {
      objects,
      hit: hitDistance,
    };
  }

  drawColumns(player: Player, map: Map) {
    this.ctx.save();
    const allObjects = [];
    for (let column = 0; column < this.resolution; column++) {
      const angle = this.fov * (column / this.resolution - 0.5);
      const ray = map.cast(
        player,
        player.state.position.direction + angle,
        this.range,
      );
      const columnProps = this.drawColumn(column, ray, angle, map);

      allObjects.push(columnProps);
    }
    this.drawSprites(player, map, allObjects);
    this.ctx.restore();
  }

  drawSprites(player: Player, map: Map, columnProps: any) {
    const { resolution } = this;
    const screenWidth = this.width;
    const screenHeight = this.height;
    const screenRatio = screenWidth / this.fov;

    const sprites = Array.prototype.slice
      .call(map.objects)
      .map((sprite: Sprite) => {
        const distX = sprite.state.position.x - player.state.position.x;
        const distY = sprite.state.position.y - player.state.position.y;
        const width =
          (sprite.state.appearance.width * screenWidth) /
          sprite.state.position.distanceFromPlayer;
        const height =
          (sprite.state.appearance.height * screenHeight) /
          sprite.state.position.distanceFromPlayer;
        const renderedFloorOffset =
          sprite.state.appearance.floorOffset /
          sprite.state.position.distanceFromPlayer;
        const angleToPlayer = Math.atan2(distY, distX);
        const top =
          (screenHeight / 2) *
            (1 + 1 / sprite.state.position.distanceFromPlayer) -
          height;
        const numColumns = (width / screenWidth) * resolution;
        let angleRelativeToPlayerView =
          player.state.position.direction - angleToPlayer;

        if (angleRelativeToPlayerView >= CIRCLE / 2) {
          angleRelativeToPlayerView -= CIRCLE;
        }

        const cameraXOffset =
          this.width / 2 - screenRatio * angleRelativeToPlayerView;
        const firstColumn = Math.floor(
          ((cameraXOffset - width / 2) / screenWidth) * resolution,
        );

        sprite.state.position.distanceFromPlayer = Math.sqrt(
          Math.pow(distX, 2) + Math.pow(distY, 2),
        );
        sprite.render = {
          width,
          height,
          angleToPlayer: angleRelativeToPlayerView,
          cameraXOffset,
          distanceFromPlayer: sprite.state.position.distanceFromPlayer,
          numColumns,
          firstColumn,
          top,
        };
        return sprite;
      })
      // sort sprites in distance order
      .sort((a, b) => {
        if (
          a.state.position.distanceFromPlayer <
          b.state.position.distanceFromPlayer
        )
          return 1;
        if (
          a.state.position.distanceFromPlayer >
          b.state.position.distanceFromPlayer
        )
          return -1;
        return 0;
      });

    this.ctx.save();
    for (let column = 0; column < this.resolution; column++) {
      this.drawSpriteColumn(player, map, column, columnProps[column], sprites);
    }
    this.ctx.restore();
  }

  drawSpriteColumn(
    player: Player,
    map: Map,
    column: number,
    columnProps: any,
    sprites: Sprite[],
  ) {
    const { ctx } = this;
    const left = Math.floor(column * this.spacing);
    const width = Math.ceil(this.spacing);
    const columnWidth = this.width / this.resolution;
    const angle = this.fov * (column / this.resolution - 0.5);
    let sprite;
    let props;
    let obj;
    let textureX;
    let height;
    let projection;
    let mappedColumnObj;
    let spriteIsInColumn;
    let top;

    sprites = sprites.filter((sprite: any) => {
      return (
        !columnProps.hit ||
        sprite.state.position.distanceFromPlayer < columnProps.hit
      );
    });

    for (let i = 0; i < sprites.length; i++) {
      sprite = sprites[i];
      spriteIsInColumn =
        left > sprite.render.cameraXOffset - sprite.render.width / 2 &&
        left < sprite.render.cameraXOffset + sprite.render.width / 2;

      if (spriteIsInColumn) {
        textureX = Math.floor(
          (sprite.state.appearance.texture.width / sprite.render.numColumns) *
            (column - sprite.render.firstColumn),
        );
        ctx.drawImage(
          sprite.state.appearance.texture.image,
          textureX,
          0,
          1,
          sprite.state.appearance.texture.height,
          left,
          sprite.render.top,
          width,
          sprite.render.height,
        );
        this.ctx.fillStyle = '#000';
        this.ctx.globalAlpha = 1;
      }
    }
  }

  drawWeapon(
    leftHand: Bitmap,
    rightHand: Bitmap,
    paces: number,
    grabDistance: number,
    putDistance: number,
  ) {
    const bobX = Math.cos(paces * 2) * this.scale * 6;
    const bobY = Math.sin(paces * 4) * this.scale * 6;
    const right = this.width * 0.6 + bobX;
    const left = this.width * 0.15 + bobX;
    const top = this.height * 0.6 + bobY;
    this.ctx.drawImage(
      leftHand.image,
      left + grabDistance,
      top + putDistance,
      leftHand.width * this.scale,
      leftHand.height * this.scale,
    );
    this.ctx.drawImage(
      rightHand.image,
      right - grabDistance,
      top + putDistance,
      rightHand.width * this.scale,
      rightHand.height * this.scale,
    );
  }

  drawMiniMap(player: Player, map: Map) {
    const { ctx } = this;
    const miniMapSize = this.width * 0.2;
    const x = this.width - miniMapSize - 10;
    const y = 10;
    const blockSize = miniMapSize / map.size;
    const triangleX = x + (player.state.position.x / map.size) * miniMapSize;
    const triangleY = y + (player.state.position.y / map.size) * miniMapSize;

    ctx.save();

    ctx.globalAlpha = 0.5; // map background
    ctx.fillRect(x, y, miniMapSize, miniMapSize);

    ctx.globalAlpha = 0.5; // blocks
    ctx.fillStyle = '#4c8847';

    for (let i = 0; i < map.size * map.size; i++) {
      if (map.wallGrid[i]) {
        if (map.wallGrid[i] === 2) {
          ctx.fillStyle = '#35384b';
        } else ctx.fillStyle = '#4c8847';
        const row = Math.floor(i / map.size);
        const col = i - map.size * row;
        ctx.fillRect(
          x + blockSize * col,
          y + blockSize * row,
          blockSize,
          blockSize,
        );
      }
    }
    ctx.save();

    for (let i = 0; i < map.objects.length; i++) {
      // sprites
      const item = map.objects[i];
      if (item) {
        ctx.globalAlpha = item instanceof NPC ? 0.8 : 0.3;
        if (!item.state.appearance.color) ctx.globalAlpha = 0;

        ctx.fillStyle = item.state.appearance.color || 'red';

        ctx.fillRect(
          x + blockSize * (item.state.position.x - 0.5) + blockSize * 0.25,
          y + blockSize * (item.state.position.y - 0.5) + blockSize * 0.25,
          blockSize * 0.5,
          blockSize * 0.5,
        );
      }
    }
    ctx.restore();

    ctx.globalAlpha = 1; // player
    ctx.fillStyle = '#fff';
    ctx.moveTo(triangleX, triangleY);
    ctx.translate(triangleX, triangleY);

    ctx.rotate(player.state.position.direction - Math.PI * 0.5);
    ctx.beginPath();
    ctx.lineTo(-2, -3); // bottom left of triangle
    ctx.lineTo(0, 2); // tip of triangle
    ctx.lineTo(2, -3); // bottom right of triangle
    ctx.fill();

    ctx.restore();
  }

  project(height: number, angle: number, distance: number) {
    const z = distance * Math.cos(angle);
    const wallHeight = (this.height * height) / z;
    const bottom = (this.height / 2) * (1 + 1 / z);
    return {
      top: bottom - wallHeight,
      bottom,
      height: wallHeight,
    };
  }
}

export default Camera;
