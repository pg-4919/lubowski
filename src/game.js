import { Board } from "./board.js";

export class Game {
    constructor(container) {
        this.container = container;
        this.board = new Board(this);
        this.board.html();
        this.container.appendChild(this.board.element);
    }
}