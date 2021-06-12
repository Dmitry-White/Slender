import { IEntityState, IObjectParams } from './interface';

class Paper {
  state: IEntityState;

  constructor(paper: IObjectParams) {
    this.state = {
      position: {
        x: paper.x,
        y: paper.y,
      },
      appearance: {
        color: '#fff',
        texture: paper.texture,
        height: 0.2,
        width: 0.2,
      },
    };
  }
}

export default Paper;
