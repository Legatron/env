export class ScoreBoard {
  constructor({ hitSelector, missSelector, maxMiss = 5 }) {
    this.hitEl = document.querySelector(hitSelector);
    this.missEl = document.querySelector(missSelector);
    this.maxMiss = maxMiss;

    this.hits = 0;
    this.misses = 0;
    this._loseHandlers = [];

    this.reset();
  }

  addHit() {
    this.hits++;
    this._render();
  }

  addMiss() {
    this.misses++;
    this._render();
    if (this.isLost()) this._emitLose();
  }

  isLost() {
    return this.misses >= this.maxMiss;
  }

  onLose(cb) {
    this._loseHandlers.push(cb);
  }

  reset() {
    this.hits = 0;
    this.misses = 0;
    this._render();
  }

  _emitLose() {
    this._loseHandlers.forEach((cb) => cb());
  }

  _render() {
    this.hitEl.textContent = this.hits;
    this.missEl.textContent = this.misses;
  }
}
