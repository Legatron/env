import { ScoreBoard } from "./ScoreBoard.js";

describe("ScoreBoard", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="hit">0</span>
      <span id="miss">0</span>
    `;
  });

  test("стартует с нулями", () => {
    const board = new ScoreBoard({
      hitSelector: "#hit",
      missSelector: "#miss",
    });
    expect(board.hits).toBe(0);
    expect(board.misses).toBe(0);
    expect(document.getElementById("hit").textContent).toBe("0");
  });

  test("addHit увеличивает счётчик попаданий", () => {
    const board = new ScoreBoard({
      hitSelector: "#hit",
      missSelector: "#miss",
    });
    board.addHit();
    expect(board.hits).toBe(1);
    expect(document.getElementById("hit").textContent).toBe("1");
  });

  test("5 промахов = проигрыш", () => {
    const board = new ScoreBoard({
      hitSelector: "#hit",
      missSelector: "#miss",
      maxMiss: 5,
    });
    const onLose = jest.fn();
    board.onLose(onLose);

    for (let i = 0; i < 5; i++) board.addMiss();

    expect(board.isLost()).toBe(true);
    expect(onLose).toHaveBeenCalledTimes(1);
  });
});
