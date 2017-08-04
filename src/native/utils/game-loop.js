export default class GameLoop {
  loop = (fpsLimit) => {
    this.subscribers.forEach((callback) => {
      callback.call();
    });

    if (this.fpsLimit && this.fpsLimit > 0) {
      setTimeout(() => {
        this.loopID = window.requestAnimationFrame(this.loop);
      }, 1000 / this.fpsLimit);
    } else {
      this.loopID = window.requestAnimationFrame(this.loop);
    }
  }
  constructor(fpsLimit) {
    this.subscribers = [];
    this.loopID = null;
    this.fpsLimit = fpsLimit;
  }
  start() {
    if (!this.loopID) {
      this.loop();
    }
  }
  stop() {
    window.cancelAnimationFrame(this.loop);
  }
  subscribe(callback) {
    return this.subscribers.push(callback);
  }
  unsubscribe(id) {
    delete this.subscribers[id - 1];
  }
}
