import { Pos, PosEqual } from "./util.js"
import { Cell } from "./cell.js";

export class Board {

    constructor(game) {
        this.game = game;
        this.element;
        this.data;

        this.selection = {
            active: null,
            hovered: null
        }

        this.init();
    }

    init() {
        // initialize the array data
        this.data = new Array(8)
            .fill(0)
            .map(() => new Array(8).fill(0));
        this._iterate(null, (x, y) => {
            const pos = Pos(x, y);
            this.set(pos, new Cell(this.board, pos));
            this.get(pos).init();
        });

        // initialize the HTML element
        this.element = document.createElement("table");
        this.element.classList.add("board");

        // render the HTML element
        this._iterate(
            () => this.element.insertRow(-1),
            (x, y) => {
                const cell = this.get(Pos(x, y));
                this.element.rows.item(x).appendChild(cell.element);
            }
        );

        // bind the click event
        const tbody = this.element.tBodies.item(0);
        tbody.addEventListener("mousedown", this._mousedown.bind(this));
        tbody.addEventListener("mouseover", this._mouseover.bind(this));
    }

    // returns the Pos of an HTML element in the board
    locate(element) {
        const x = element.parentElement.rowIndex;
        const y = element.cellIndex;
        return Pos(x, y);
    }

    // data accessor functions
    set = (pos, data) => this.data[pos.x][pos.y] = data;
    get = (pos) => this.data[pos.x][pos.y];

    // expose selection interface
    select = pos => this.selection.active = pos;
    deselect = () => this.selection.active = null;

    // mouse event handlers
    _mousedown(event) {
        const cell = event.target.closest("td");
        const pos = this.locate(cell);

        this._iterate(null, (x, y) => {
            if (PosEqual(pos, Pos(x, y))) this.get(pos).toggle();
            else this.get(Pos(x, y)).deselect();
        });
    }
    _mouseover(event) {
        const cell = event.target.closest("td");
        const pos = this.locate(cell);
        this.selection.hovered = pos;
    }
    _mouseup(event) {

    }

    // iterates so I don't have to
    _iterate(eachRow, eachCell) {
        for (let x = 0; x < 8; x++) {
            if (eachRow instanceof Function) eachRow(x);
            for (let y = 0; y < 8; y++)
                if (eachCell instanceof Function) eachCell(x, y);
        }
    }

}