import { soundManager } from 'soundmanager2';

import SOUNDS from '../../data/sounds';

const SM_URL = 'node_modules/soundmanager2/swf';

const prepareFunc = (func: any, group: any) =>
  Object.entries(group).forEach(([_, val]) => func(val));

const precreateGroup = (group: any) =>
  prepareFunc(soundManager.createSound, group);
const preloadGroup = (group: any) => prepareFunc(soundManager.load, group);

const precreateSounds = () => prepareFunc(precreateGroup, SOUNDS);
const preloadSounds = () => prepareFunc(preloadGroup, SOUNDS);

const playSM = (id: string, config: any) => soundManager.play(id, config);
const stopSM = (id: string) => soundManager.stop(id);

export {
  precreateGroup,
  precreateSounds,
  preloadGroup,
  preloadSounds,
  playSM,
  stopSM,
  SM_URL,
  SOUNDS,
};
