export class Goblin {
  constructor(field) {
    this.field = field;
    this.index = -1;
    this.visible = false;
  }

  isAt(id) {
    return this.visible && this.index === id;
  }

  hide() {
    if (this.index !== -1) {
      this.field.unhighlight(this.index);
    }
    this.index = -1;
    this.visible = false;
  }

  moveToRandomHole() {
    this.hide();
    const id = this.field.randomHoleIdExcept(this.index);
    this.field.highlight(id);
    this.index = id;
    this.visible = true;
  }
}
