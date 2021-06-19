import Game from '../Game';

const MESSAGE_MAP = {
  NO_PAPER: 'no_paper',
  LOO: 'loo',
  BOMB: 'bomb',
  TIP: 'tip',
  WARNING: 'warning',
  DIE: 'die',
  TAKEN: 'taken',
  ALL_DEAD: 'all_dead',
};

class GUI {
  game: Game;

  state: any;

  constructor(game: Game) {
    this.game = game;

    this.state = {
      appearance: {
        font: '50px DieDieDie',
        color: '#000',
      },
      messages: {
        [MESSAGE_MAP.NO_PAPER]: {
          text: 'No papers left. Use your hands!',
          position: { x: 0, y: 0 },
          shown: false,
        },
        [MESSAGE_MAP.LOO]: {
          text: 'Ooops, not this one :)',
          position: { x: 0, y: 0 },
          shown: false,
        },
        [MESSAGE_MAP.BOMB]: {
          text: 'Rush B! Terrorists always win!',
          position: { x: 0, y: 0 },
          shown: false,
        },
        [MESSAGE_MAP.TIP]: {
          text: 'Step back, let them approach.',
          position: { x: 0, y: 0 },
          shown: false,
        },
        [MESSAGE_MAP.WARNING]: {
          text: 'Stand still to place paper.',
          position: { x: 0, y: 0 },
          shown: false,
        },
        [MESSAGE_MAP.DIE]: {
          text: 'Die!',
          position: { x: 0, y: 0 },
          shown: false,
        },
        [MESSAGE_MAP.TAKEN]: {
          text: 'They took your paper!',
          position: { x: 0, y: 0 },
          shown: false,
        },
        [MESSAGE_MAP.ALL_DEAD]: {
          text: "They're all dead! Live another day...",
          position: { x: 0, y: 0 },
          shown: false,
        },
      },
    };
  }

  showPlacementMessage() {
    if (this.game.player.state.inventory.paperType === 0) {
      this.showLooMessage();
    } else if (this.game.player.state.inventory.paperType === 7) {
      this.showBombMessage();
    } else {
      this.showPaperMessage();
    }
  }

  showNoPaperMessage() {
    this.game.map.show_no_paper = 1;
    this.game.map.show_loo = 0;
    this.game.map.show_bomb = 0;
    this.game.map.show_tip = 0;
    this.game.map.show_warning = 0;
    setTimeout(() => {
      this.game.map.show_no_paper = 0;
    }, 3000);
  }

  showLooMessage() {
    this.game.map.show_loo = 1;
    this.game.map.show_bomb = 0;
    this.game.map.show_tip = 0;
    this.game.map.show_warning = 0;
    setTimeout(() => {
      this.game.map.show_loo = 0;
    }, 3000);
  }

  showBombMessage() {
    this.game.map.show_loo = 0;
    this.game.map.show_bomb = 1;
    this.game.map.show_tip = 0;
    this.game.map.show_warning = 0;
    setTimeout(() => {
      this.game.map.show_bomb = 0;
    }, 3000);
  }

  showPaperMessage() {
    this.game.map.show_loo = 0;
    this.game.map.show_bomb = 0;
    this.game.map.show_tip = 1;
    this.game.map.show_warning = 0;
    setTimeout(() => {
      this.game.map.show_tip = 0;
    }, 3000);
  }

  showWarningMessage() {
    this.game.map.show_loo = 0;
    this.game.map.show_bomb = 0;
    this.game.map.show_tip = 0;
    this.game.map.show_warning = 1;
    setTimeout(() => {
      this.game.map.show_warning = 0;
    }, 3000);
  }

  showTakenMessage() {
    this.game.map.show_taken = 1;
    setTimeout(() => {
      this.game.map.show_taken = 0;
    }, 3000);
  }

  showDieMessage() {
    this.game.map.show_die = 1;
    setTimeout(() => {
      this.game.map.show_die = 0;
    }, 3000);
  }
}

export default GUI;
