import ASSETS from '../../../data/assets';
import Bitmap from '../Engine/Bitmap';

import { IEntityState, IObjectParams } from './interface';

class Objects {
  state: IEntityState;

  constructor(object: IObjectParams) {
    this.state = {
      position: {
        x: object.x,
        y: object.y,
      },
      appearance: {
        texture:
          object.texture || new Bitmap(ASSETS.trees[1].texture, 639, 1500),
        height: object.height || 1,
        width: 0.5,
      },
    };
  }
}

export default Objects;
