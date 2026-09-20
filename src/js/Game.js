import { GameField } from "./GameField.js";
import { Goblin } from "./Goblin.js";
import { ScoreBoard } from "./ScoreBoard.js";

export class Game {
  constructor({
    fieldSelector,
    hitSelector,
    missSelector,
    overlaySelector,
    overlayTextSelector,
    restartSelector,
    maxMiss = 5,
    tick = 1000,
  }) {
    this.tick = tick;
    this.intervalId = null;

    this.field = new GameField(fieldSelector);
    this.goblin = new Goblin(this.field);
    this.board = new ScoreBoard({
      hitSelector,
      missSelector,
      maxMiss,
    });

    this.overlay = document.querySelector(overlaySelector);
    this.overlayText = document.querySelector(overlayTextSelector);
    this.restartBtn = document.querySelector(restartSelector);

    this.field.onClick((id) => this.handleClick(id));
    this.board.onLose(() => this.handleLose());
    this.restartBtn.addEventListener("click", () => this.start());
  }

  handleClick(id) {
    if (this.goblin.isAt(id)) {
      this.goblin.hide();
      this.board.addHit();
    } else {
      this.board.addMiss();
    }
  }

  handleLose() {
    this.stop();
    this.goblin.hide();
    this.overlayText.textContent = `Игра окончена! Попаданий: ${this.board.hits}`;
    this.overlay.hidden = false;
  }

  step() {
    // Если гоблин не пойман — он убежал, засчитываем промах
    if (this.goblin.visible) {
      this.board.addMiss();
      if (this.board.isLost()) return;
    }
    this.goblin.moveToRandomHole();
  }

  start() {
    this.stop();
    this.overlay.hidden = true;
    this.board.reset();
    this.goblin.hide();

    this.step();
    this.intervalId = setInterval(() => this.step(), this.tick);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
