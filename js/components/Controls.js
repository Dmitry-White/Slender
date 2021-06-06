const canvasBlock = document.querySelector('#display');
const lockHandler =
  document.body.requestPointerLock ||
  document.body.mozRequestPointerLock ||
  document.body.webkitRequestPointerLock;

const KEY_MAP = {
  37: 'left',
  39: 'right',
  38: 'forward',
  40: 'backward',
  65: 'sideLeft',
  68: 'sideRight',
  87: 'forward',
  83: 'backward',
  13: 'enter',
  16: 'shift',
  32: 'space',
  27: 'escape',
  69: 'attack',
};

const MOUSE_SENSITIVITY = 100;

class Controls {
  constructor(player) {
    this.player = player;
    this.state = {
      left: false,
      right: false,
      forward: false,
      backward: false,
      shift: false,
      sideLeft: false,
      sideRight: false,
    };
    document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    document.addEventListener('touchstart', this.onTouch.bind(this), false);
    document.addEventListener('touchmove', this.onTouch.bind(this), false);
    document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    document.addEventListener(
      'mousemove',
      this.onMouseMovement.bind(this),
      false,
    );
    canvasBlock.addEventListener('click', lockHandler);
  }

  onTouch(e) {
    const t = e.touches[0];
    this.onTouchEnd(e);
    if (t.pageY < window.innerHeight * 0.5) this.onKey(true, { keyCode: 38 });
    else if (t.pageX < window.innerWidth * 0.5)
      this.onKey(true, { keyCode: 37 });
    else if (t.pageY > window.innerWidth * 0.5)
      this.onKey(true, { keyCode: 39 });
  }

  onTouchEnd(e) {
    this.state = {
      left: false,
      right: false,
      forward: false,
      backward: false,
      sideLeft: false,
      sideRight: false,
      shift: false,
    };
    e.preventDefault();
    e.stopPropagation();
  }

  onKeyDown(e) {
    e.preventDefault();
    e.stopPropagation();

    const action = KEY_MAP[e.keyCode];

    if (!action) return;

    this.state[action] = true;

    this.player.do(action);
  }

  onKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();

    const action = KEY_MAP[e.keyCode];

    if (!action) return;

    this.state[action] = false;
  }

  onMouseMovement(e) {
    const x = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    const angle = Math.PI / MOUSE_SENSITIVITY;
    if (x > 0) this.player.rotate(angle);
    if (x < 0) this.player.rotate(-angle);
  }
}

export default Controls;
