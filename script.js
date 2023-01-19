let game;

class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Board {
    constructor(game) {
        this.element = document.createElement("table");
        this.game = game;

        // generate and fill data array
        this.data = new Array(8)
            .fill(0)
            .map(() => new Array(8).fill(0));
        this.iterate(null, (x, y) => {
            const pos = new Pos(x, y);
            this.set(pos, new Cell(pos));
        });
    }

    // returns the Pos of an element in the board
    locate(element) {
        const x = element.parentElement.rowIndex;
        const y = element.cellIndex;
        return new Pos(x, y);
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
        const cell = event.target.closest("td");
        if (!cell) return;
        try {
            this.get(this.locate(cell)).click();
        } catch (err) {
            alert(err);
        }
    }

    // initialize the table
    init() {
        this.element.classList.add("board");
        alert(this.element.getAttribute("class"));

        // render the HTML element
        this.iterate(
            () => this.element.insertRow(-1),
            (x, y) => {
                const cell = this.get(new Pos(x, y));
                const element = cell.render();
                this.element.rows.item(x).appendChild(element);
            }
        );

        // bind the click event
        const body = this.element.tBodies.item(0);
        body.addEventListener("click", this.click.bind(this));
    }
}

class Game {
    constructor(container) {
        this.container = container;
        this.board = new Board(this);
        this.board.init();
        this.container.appendChild(this.board.element);
    }
}

class Cell {
    constructor(pos) {
        this.pos = pos;
        this.element = document.createElement("td");
    }

    init() {
        this.element.innerHTML = "balls";
        this.element.classList.add("cell");
        if ((this.pos.y + this.pos.x) % 2 === 0) this.element.style.background = "black";
    }

    click() {
        this.element.style.background = "red";
        setTimeout(() => this.element.style.background = "white", 1000);
    }
    render() {
        return this.element;
    }
}

window.addEventListener("load", () => {
    game = new Game(document.body);
});

function clickTest() {
    alert("you shit!");
    game.board.get(new Pos(3, 4)).click();
}
