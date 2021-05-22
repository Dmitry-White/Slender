import { soundManager } from 'soundmanager2';

import SOUNDS from '../json/sounds.json';

const SM_URL = 'node_modules/soundmanager2/swf';

const prepareFunc = (func, group) =>
  Object.entries(group).forEach(([_, val]) => func(val));

const precreateGroup = (group) => prepareFunc(soundManager.createSound, group);
const preloadGroup = (group) => prepareFunc(soundManager.load, group);

const precreateSounds = () => prepareFunc(precreateGroup, SOUNDS);
const preloadSounds = () => prepareFunc(preloadGroup, SOUNDS);

const playSM = (id, config) => soundManager.play(id, config);

export {
  precreateGroup,
  precreateSounds,
  preloadGroup,
  preloadSounds,
  playSM,
  SM_URL,
  SOUNDS,
};
