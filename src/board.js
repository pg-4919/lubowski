import { Pos } from "./util.js"
import { Cell } from "./cell.js";

export class Board {
    constructor(game) {
        this.element = document.createElement("table");
        this.game = game;

        // generate and fill data array
        this.data = new Array(8)
            .fill(0)
            .map(() => new Array(8).fill(0));
        this.iterate(null, (x, y) => {
            const pos = Pos(x, y);
            this.set(pos, new Cell(pos));
            this.get(pos).init();
        });
    }

    // returns the Pos of an element in the board
    locate(element) {
        const x = element.parentElement.rowIndex;
        const y = element.cellIndex;
        return Pos(x, y);
    }

    // iterates so I don't have to
    iterate(eachRow, eachCell) {
        for (let x = 0; x < 8; x++) {
            if (eachRow instanceof Function) eachRow(x);
            for (let y = 0; y < 8; y++) {
                if (eachCell instanceof Function) eachCell(x, y);
            }
        }
    }

    // data accessor functions
    set = (pos, data) => this.data[pos.x][pos.y] = data;
    get = (pos) => this.data[pos.x][pos.y];

    // click handler
    click(event) {
        this.iterate(null, (x, y) => this.get(Pos(x, y)).deselect());

        const cell = event.target.closest("td");
        this.get(this.locate(cell)).select();
    }

    // create the HTML element of the board
    html() {
        this.element.classList.add("board");

        // render the HTML element
        this.iterate(
            () => this.element.insertRow(-1),
            (x, y) => {
                const cell = this.get(Pos(x, y));
                this.element.rows.item(x).appendChild(cell.element);
            }
        );

        // bind the click event
        const tbody = this.element.tBodies.item(0);
        tbody.addEventListener("click", this.click.bind(this));
    }
}