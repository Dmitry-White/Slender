import { MapObject } from '../World/interface';

type Sprite = MapObject & {
  render: any;
};

interface IGUIState {
  appearance: any;
  messages: any;
  info: any;
}

export { Sprite, IGUIState };
