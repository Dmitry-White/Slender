import ASSETS from '../../data/assets';

import Bitmap from './Bitmap';

class Objects {
  x: number;

  y: number;

  height: number;

  width: number;

  texture: any;

  constructor(object: any) {
    this.x = object.x;
    this.y = object.y;
    this.height = object.height || 1;
    this.width = 0.5;
    this.texture =
      object.texture || new Bitmap(ASSETS.trees[1].texture, 639, 1500);
  }
}

export default Objects;
