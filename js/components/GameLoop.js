class GameLoop {
  constructor() {
    this.callback = () => {};
    this.previousTime = 0;
    this.frame = this.frame.bind(this);
    this.stopped = false;
  }

  start(callback) {
    this.callback = callback;
    this.loopId = requestAnimationFrame(this.frame);
  }

  frame(currentTime) {
    if (this.stopped) return;

    const seconds = (currentTime - this.previousTime) / 1000;
    if (seconds < 0.2) this.callback(seconds);

    this.previousTime = currentTime;
    this.loopId = requestAnimationFrame(this.frame);
  }

  stop() {
    if (this.stopped) return;

    cancelAnimationFrame(this.loopId);
    this.stopped = true;
  }
}

export default GameLoop;
