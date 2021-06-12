import Bitmap from '../Engine/Bitmap';

interface IEntityPosition {
  x: number;
  y: number;
  direction?: number;
}

interface IEntityAppearance {
  color?: string;
  texture: Bitmap;
  height: number;
  width: number;
  picNum?: number;
  floorOffset?: number;
}

interface IEntityState {
  position: IEntityPosition;
  appearance: IEntityAppearance;
}

interface IObjectParams {
  x: number;
  y: number;
  texture: Bitmap;
  height?: number;
}

export { IEntityAppearance, IEntityPosition, IEntityState, IObjectParams };
