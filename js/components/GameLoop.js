export class GameLoop {
    constructor(game, endGame) {
        this.sounds = game.sounds;
        this.endGame = endGame;
        this.game_ending = false;
        this.frame = this.frame.bind(this);
        this.lastTime = 0;
        this.callback = () => {};
    };

    start(callback) {
        this.callback = callback;
        requestAnimationFrame(this.frame);
        return;
    };

    frame(time) {
        const seconds = (time - this.lastTime) / 1000;
        this.lastTime = time;
        if (seconds < 0.2) this.callback(seconds);
        if (this.game_ending) {
            this.endGame()
            return;
        }
        requestAnimationFrame(this.frame);
    };
}
