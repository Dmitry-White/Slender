import NPC from '../Actors/NPC';
import Bitmap from '../Engine/Bitmap';

import Objects from './Objects';
import Paper from './Paper';

interface IEntityPosition {
  x: number;
  y: number;
  direction?: number;
  distanceFromPlayer?: number;
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

type MapObject = Objects | Paper | NPC;

export {
  IEntityAppearance,
  IEntityPosition,
  IEntityState,
  IObjectParams,
  MapObject,
};
