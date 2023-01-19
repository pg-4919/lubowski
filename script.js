import { Game } from "./src/game.js";

let game;

window.addEventListener("load", () => {
    game = new Game(document.getElementById("wrapper"));
});
