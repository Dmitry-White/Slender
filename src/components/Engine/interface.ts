import { MapObject } from '../World/interface';

type Sprite = MapObject & {
  render: any;
};

export { Sprite };
