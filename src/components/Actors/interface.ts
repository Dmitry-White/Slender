import { IEntityAppearance, IEntityPosition } from '../World/interface';

interface IActorMovement {
  paces: number;
  speed: number;
  grabDistance?: number;
  putDistance?: number;
  paperNearPerson?: number;
  count?: number;
}

interface IActorFSM {
  walking: boolean;
  running: boolean;
  putting?: boolean;
  grabbing?: boolean;
  taking?: boolean;
  foundPaper?: boolean;
  dead?: boolean;
}

interface IActorInventory {
  papers: any[];
  paperType: number;
  previosPaperPlace: IEntityPosition;
}

interface IActorState {
  position: IEntityPosition;
  movement: IActorMovement;
  FSM: IActorFSM;
  inventory?: IActorInventory;
  appearance?: IEntityAppearance;
}

export { IEntityAppearance, IEntityPosition, IActorState };
