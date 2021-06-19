import Game from '../Game';

class GUI {
  game: Game;

  constructor(game: Game) {
    this.game = game;
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
