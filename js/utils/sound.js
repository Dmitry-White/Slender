import SOUNDS from '../json/sounds.json';

const SM_URL = './soundmanager2/';

const preloadGroup = (group) => {
  Object.entries(group).forEach(([_, val]) => {
    soundManager.createSound(val);
  });
};

const preloadSounds = () => {
  const { MENU, WINTER, VANILLA, END, GENERAL, RANDOM } = SOUNDS;

  preloadGroup(MENU);
  preloadGroup(WINTER);
  preloadGroup(VANILLA);
  preloadGroup(END);
  preloadGroup(GENERAL);
  preloadGroup(RANDOM);
};

const playSM = (id, config) => soundManager.play(id, config);

export {
  preloadGroup,
  preloadSounds,
  playSM,
  SM_URL,
  SOUNDS,
}