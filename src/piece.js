export class Piece {
    constructor() {
        this.element;
        this.type;
        this.selected;

        this.init();
    }

    init() {
        this.element = document.createElement("p");
        this.element.innerHTML = "";
        document.addEventListener("mousemove", this.mousemove);
    }

    mousemove() {
        if (!this.selected) return;
        this.element.style.position = "absolute";
        this.element.style.left = e.pageX + 'px';
        this.element.style.top = e.pageY + 'px';
    }
}