export class GameField {
  constructor(selector, size = 16) {
    this.el = document.querySelector(selector);
    this.holes = [];
    this._create(size);
  }

  _create(size) {
    for (let i = 1; i <= size; i++) {
      const div = document.createElement("div");
      div.className = "hole";
      div.dataset.id = i;
      this.el.append(div);
      this.holes.push(div);
    }
  }

  onClick(handler) {
    this.el.addEventListener("click", (event) => {
      const hole = event.target.closest(".hole");
      if (hole) handler(Number(hole.dataset.id));
    });
  }

  highlight(id) {
    const hole = this.holes[id - 1];
    if (hole) hole.classList.add("hole-goblin");
  }

  unhighlight(id) {
    const hole = this.holes[id - 1];
    if (hole) hole.classList.remove("hole-goblin");
  }

  randomHoleIdExcept(exclude) {
    let id;
    do {
      id = Math.floor(Math.random() * this.holes.length) + 1;
    } while (id === exclude);
    return id;
  }
}
