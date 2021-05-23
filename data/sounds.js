/* eslint-disable global-require */

const SOUNDS = {
  MENU: {
    PIANO_MENU: {
      id: 'piano_menu_ambient',
      url: require('../sounds/ambient/piano_menu_ambient.mp3').default,
    },
    STATIC_MENU: {
      id: 'static_menu_ambient',
      url: require('../sounds/ambient/static_menu_ambient.mp3').default,
      volume: 50,
    },
    SLENDER_LOGO: {
      id: 'slender_logo_hover',
      url: require('../sounds/menu/slender_logo_hover.mp3').default,
    },
    PLAY_BUTTON: {
      id: 'play_button_hover',
      url: require('../sounds/menu/play_button_hover.mp3').default,
    },
    HO_HO: {
      id: 'ho_ho_ho',
      url: require('../sounds/menu/ho_ho_ho.mp3').default,
    },
    ABOUT_US: {
      id: 'about_us',
      url: require('../sounds/menu/about_us.mp3').default,
    },
    ABOUT_GAME: {
      id: 'about_game',
      url: require('../sounds/menu/about_game.mp3').default,
    },
  },
  WINTER: {
    WIND: {
      id: 'wind_ambient',
      url: require('../sounds/ambient/wind_ambient.mp3').default,
    },
    FORWARD_STEP: {
      id: 'forward_step',
      url: require('../sounds/walking/forward_step.mp3').default,
    },
    BACKWARD_STEP: {
      id: 'backward_step',
      url: require('../sounds/walking/backward_step.mp3').default,
    },
    DODGE_STEP_0: {
      id: 'dodge_step_0',
      url: require('../sounds/walking/dodge_step_0.mp3').default,
    },
    DODGE_STEP_1: {
      id: 'dodge_step_1',
      url: require('../sounds/walking/dodge_step_1.mp3').default,
    },
    RUNNING: {
      id: 'running',
      url: require('../sounds/walking/running.mp3').default,
    },
  },
  VANILLA: {
    RAIN: {
      id: 'rain_ambient',
      url: require('../sounds/ambient/rain_ambient.mp3').default,
      volume: 80,
    },
    RAIN_FORWARD_STEP: {
      id: 'rain_forward_step',
      url: require('../sounds/walking/rain_forward_step.mp3').default,
    },
    RAIN_BACKWARD_STEP: {
      id: 'rain_backward_step',
      url: require('../sounds/walking/rain_backward_step.mp3').default,
    },
    RAIN_STEP: {
      id: 'rain_step',
      url: require('../sounds/walking/rain_step.mp3').default,
    },
    RAIN_DODGE_STEP_0: {
      id: 'rain_dodge_step_0',
      url: require('../sounds/walking/rain_dodge_step_0.mp3').default,
    },
    RAIN_DODGE_STEP_1: {
      id: 'rain_dodge_step_1',
      url: require('../sounds/walking/rain_dodge_step_1.mp3').default,
    },
    RAIN_RUNNING: {
      id: 'rain_running',
      url: require('../sounds/walking/rain_running.mp3').default,
    },
  },
  END: {
    GHOST: {
      id: 'ghost_scream',
      url: require('../sounds/ending/ghost_scream.mp3').default,
    },
    COME_OUT: {
      id: 'come_out',
      url: require('../sounds/ending/come_out.mp3').default,
    },
    LULU: {
      id: 'lululala',
      url: require('../sounds/ending/lululala.mp3').default,
    },
  },
  GENERAL: {
    ENTERING: {
      id: 'entering_area',
      url: require('../sounds/objects/entering_area.mp3').default,
    },
    HIT_FENCE: {
      id: 'hitting_the_fence',
      url: require('../sounds/objects/hitting_the_fence.mp3').default,
    },
    HIT_RAIN_FENCE: {
      id: 'hitting_the_rain_fence',
      url: require('../sounds/objects/hitting_the_rain_fence.mp3').default,
      volume: 50,
    },
    HIT_WALL: {
      id: 'hitting_the_wall',
      url: require('../sounds/objects/hitting_the_wall.mp3').default,
    },
    PLACE_PAPER: {
      id: 'placing_paper',
      url: require('../sounds/objects/placing_paper.mp3').default,
    },
    PLACE_LOO_PAPER: {
      id: 'placing_loo_paper',
      url: require('../sounds/objects/placing_loo_paper.mp3').default,
      volume: 40,
    },
    PLACE_BOMB: {
      id: 'placing_bomb',
      url: require('../sounds/objects/placing_bomb.mp3').default,
    },
    SLASHING: {
      id: 'slashing',
      url: require('../sounds/objects/slashing.mp3').default,
    },
    KILLING: {
      id: 'killing',
      url: require('../sounds/objects/killing.mp3').default,
    },
  },
  RANDOM: {
    GHOST: {
      id: 'ghost_in_the_house',
      url: require('../sounds/ambient/ghost_in_the_house.mp3').default,
    },
    JUST_HORROR: {
      id: 'just_horror_ambient',
      url: require('../sounds/ambient/just_horror_ambient.mp3').default,
    },
    WEIRD_NOISES: {
      id: 'weird_noises',
      url: require('../sounds/ambient/weird_noises.mp3').default,
    },
    SCARY_PIANO: {
      id: 'scary_piano',
      url: require('../sounds/ambient/scary_piano.mp3').default,
    },
  },
};

export default SOUNDS;
