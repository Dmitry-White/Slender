import ASSETS from '../../data/assets';

import Bitmap from './Bitmap';

class Objects {
  constructor(object) {
    this.texture =
      object.texture || new Bitmap(ASSETS.trees[1].texture, 639, 1500);
    this.height = object.height || 1;
    this.width = 0.5;
    this.x = object.x;
    this.y = object.y;
  }
}

export default Objects;
