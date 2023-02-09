import { Piece } from "./piece.js";

export class Cell {
    constructor(board, pos) {
        this.board = board;
        this.pos = pos;

        this.piece = new Piece();
        this.element = document.createElement("td");
        this.selected = false;
    }

    init() {
        this.element.classList.add("cell");
        if ((this.pos.y + this.pos.x) % 2 === 0) this.element.classList.add("even");
        else this.element.classList.add("odd");

        this.element.appendChild(this.piece.element);
    }

    // selection functions
    select() {
        this.element.classList.add("selected");
        this.selected = true;
    }

    deselect() {
        this.selected = false;
        this.element.classList.remove("selected");
    }
    toggle() {
        if (this.selected) this.deselect();
        else this.select();
    }

}