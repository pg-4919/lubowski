export class Cell {
    constructor(pos) {
        this.pos = pos;
        this.element = document.createElement("td");
    }

    init() {
        this.element.classList.add("cell");
        if ((this.pos.y + this.pos.x) % 2 === 0) this.element.classList.add("even");
        else this.element.classList.add("odd");
    }

    // selection functions
    select = () => this.element.classList.add("selected");
    deselect = () => this.element.classList.remove("selected");

}