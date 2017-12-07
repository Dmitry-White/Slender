export class Controls {
    constructor(player) {
        this.player = player;
        this.codes  = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward',
                        65: 'sideLeft', 68: 'sideRight', 87: 'forward', 83: 'backward', 13:'enter' };
        this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false};
        this.actions = ['enter'];
        document.addEventListener('keydown', this.onKey.bind(this, true), false);
        document.addEventListener('keyup', this.onKey.bind(this, false), false);
        document.addEventListener('touchstart', this.onTouch.bind(this), false);
        document.addEventListener('touchmove', this.onTouch.bind(this), false);
        document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
        document.addEventListener('mousemove', this.onMouseMovement.bind(this), false);
        document.body.onclick = document.body.requestPointerLock ||
                                document.body.mozRequestPointerLock ||
                                document.body.webkitRequestPointerLock;
    };

    onTouch(e) {
        let t = e.touches[0];
        this.onTouchEnd(e);
        if (t.pageY < window.innerHeight * 0.5) this.onKey(true, { keyCode: 38 });
        else if (t.pageX < window.innerWidth * 0.5) this.onKey(true, { keyCode: 37 });
        else if (t.pageY > window.innerWidth * 0.5) this.onKey(true, { keyCode: 39 });
    };

    onTouchEnd(e) {
        this.states = {
            left: false,
            right: false,
            forward: false,
            backward: false,
            sideLeft: false,
            sideRight: false
        };
        e.preventDefault();
        e.stopPropagation();
    };

    onKey(val, e) {
        let state = this.codes[e.keyCode];
        if (typeof state === 'undefined') return;
        if (typeof this.states[state]!== 'undefined') this.states[state] = val; //если не найдено в состояниях
        else if (val === true) this.player.dosmth(state); //искать в действиях; если кнопка опущена - выполнить
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    };

    onMouseMovement(e) {
        let x = (e.movementX || e.mozMovementX || e.webkitMovementX || 0);
        if (x > 0) this.player.rotate(Math.PI/40);
        if (x < 0) this.player.rotate(-Math.PI/40);
    };
}
