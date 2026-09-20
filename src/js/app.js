import { Game } from "./Game.js";

export function bootstrap() {
  const game = new Game({
    fieldSelector: ".goblin_game",
    hitSelector: "#hit",
    missSelector: "#miss",
    overlaySelector: "#overlay",
    overlayTextSelector: "#overlay-text",
    restartSelector: "#restart",
    maxMiss: 5,
    tick: 1000,
  });

  game.start();
  return game;
}
