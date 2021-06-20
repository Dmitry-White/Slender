import GAME_OPTIONS from '../../core/config';
import { getRandomInt } from '../../utils/calc';
import Game from '../Game';

import { IGUIState } from './interface';

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

const INFO_MAP = {
  PAPERS: 'papers',
  HUMANS: 'humans',
};

class GUI {
  ctx: CanvasRenderingContext2D;

  width: any;

  height: any;

  game: Game;

  state: IGUIState;

  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.game = game;

    this.state = {
      appearance: {
        fontSize: '50px',
        fontFamily: 'DieDieDie',
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
      info: {
        [INFO_MAP.HUMANS]: {
          text: 'Humans: ',
          position: { x: 60, y: 80 },
          shown: false,
        },
        [INFO_MAP.PAPERS]: {
          text: 'Papers: ',
          position: { x: 60, y: 160 },
          shown: false,
        },
      },
    };
  }

  // TODO: Implement Strategy Pattern
  drawInfo() {
    this.drawHumanInfo();
    this.drawPaperInfo();
  }

  drawHumanInfo() {
    const { appearance, info } = this.state;
    const { fontSize, fontFamily } = appearance;
    const { text, position } = info[INFO_MAP.HUMANS];

    const finalText = `${text}${this.game.map.people}`;

    this.ctx.save();

    this.ctx.font = `${fontSize} ${fontFamily}`;
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText(finalText, position.x, position.y);

    this.ctx.restore();
  }

  drawPaperInfo() {
    const { appearance, info } = this.state;
    const { fontSize, fontFamily } = appearance;
    const { text, position } = info[INFO_MAP.PAPERS];

    const finalText = `${text}${GAME_OPTIONS.PAPER_NUM - this.game.map.papers}`;

    this.ctx.save();

    this.ctx.font = `${fontSize} ${fontFamily}`;
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText(finalText, position.x, position.y);

    this.ctx.restore();
  }

  // TODO: Implement Strategy Pattern
  showPlacementMessage() {
    if (this.game.player.state.inventory.paperType === 0) {
      this.showLooMessage();
    } else if (this.game.player.state.inventory.paperType === 7) {
      this.showBombMessage();
    } else {
      this.showPaperMessage();
    }
  }

  showLooMessage() {
    this.state.messages[MESSAGE_MAP.LOO].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.LOO].shown = false;
    }, 3000);
  }

  showBombMessage() {
    this.state.messages[MESSAGE_MAP.BOMB].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.BOMB].shown = false;
    }, 3000);
  }

  showPaperMessage() {
    this.state.messages[MESSAGE_MAP.TIP].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.TIP].shown = false;
    }, 3000);
  }

  showWarningMessage() {
    this.state.messages[MESSAGE_MAP.WARNING].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.WARNING].shown = false;
    }, 3000);
  }

  showNoPaperMessage() {
    this.state.messages[MESSAGE_MAP.NO_PAPER].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.NO_PAPER].shown = false;
    }, 3000);
  }

  showTakenMessage() {
    this.state.messages[MESSAGE_MAP.TAKEN].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.TAKEN].shown = false;
    }, 3000);
  }

  showDieMessage() {
    this.state.messages[MESSAGE_MAP.DIE].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.DIE].shown = false;
    }, 3000);
  }

  showAllDeadMessage() {
    this.state.messages[MESSAGE_MAP.ALL_DEAD].shown = true;
    setTimeout(() => {
      this.state.messages[MESSAGE_MAP.ALL_DEAD].shown = false;
    }, 3000);
  }

  // Implement Strategy Pattern
  drawMessage() {
    this.drawNoPaperMessage();
    this.drawLooMessage();
    this.drawBombMessage();
    this.drawTipMessage();
    this.drawWarningMessage();
    this.drawTakenMessage();
    this.drawAllDeadMessage();

    this.drawDie();
  }

  drawLooMessage() {
    this.ctx.save();

    this.ctx.font = '50px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.LOO].shown ? 1 : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText('Ooops, not this one :)', this.width / 3, 80);

    this.ctx.restore();
  }

  drawBombMessage() {
    this.ctx.save();

    this.ctx.font = '50px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.BOMB].shown ? 1 : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText('Rush B! Terrorists always win!', this.width / 4, 80);

    this.ctx.restore();
  }

  drawTipMessage() {
    this.ctx.save();

    this.ctx.font = '50px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.TIP].shown ? 1 : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText('Step back, let them approach.', this.width / 4, 80);

    this.ctx.restore();
  }

  drawNoPaperMessage() {
    this.ctx.save();

    this.ctx.font = '50px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.NO_PAPER].shown
      ? 1
      : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText('No papers left. Use your hands!', this.width / 4, 80);

    this.ctx.restore();
  }

  drawWarningMessage() {
    this.ctx.save();

    this.ctx.font = '50px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.WARNING].shown
      ? 1
      : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText('Stand still to place paper.', this.width / 3, 80);

    this.ctx.restore();
  }

  drawTakenMessage() {
    this.ctx.save();

    this.ctx.font = '50px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.TAKEN].shown ? 1 : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText('They took your paper!', this.width / 3, 80);

    this.ctx.restore();
  }

  drawAllDeadMessage() {
    this.ctx.save();

    this.ctx.font = '50px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.ALL_DEAD].shown
      ? 1
      : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    this.ctx.fillText(
      "They're all dead! Live another day...",
      this.width / 4,
      80,
    );

    this.ctx.restore();
  }

  // Move out of "messages" to "overlays/effects"
  drawDie() {
    this.ctx.save();

    this.ctx.font = '80px DieDieDie';
    this.ctx.globalAlpha = this.state.messages[MESSAGE_MAP.DIE].shown ? 1 : 0;
    this.ctx.fillStyle = this.game.mode.winter ? '#000' : '#fff';
    let w;
    let h;
    for (let i = 1; i < 30; i++) {
      w = getRandomInt(0, 11);
      h = getRandomInt(0, 9);
      this.ctx.fillText('Die!', (this.width / 10) * w, (this.height / 8) * h);
    }

    this.ctx.restore();
  }
}

export default GUI;
