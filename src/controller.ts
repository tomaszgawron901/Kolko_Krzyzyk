import {Game} from './game.js';

export class Controller {
    Game: Game;
    root: HTMLElement;
    table: HTMLTableElement;
    constructor(root: HTMLElement)
    {
        this.Game = new Game();
        this.root = root;
        this.table = document.createElement("TABLE") as HTMLTableElement;
        this._initializeElements();
    }

    _initializeElements() {
        for (let i = 0; i < this.Game.board.size; i++) {
            let row = this.table.insertRow(i);
            for (let j = 0; j < this.Game.board.size; j++) {
                let cell = row.insertCell(j);
                let button = document.createElement("BUTTON");
                button.addEventListener("click", () => {this.Press(i, j)})
                cell.appendChild(button);
            }
        }
    }

    Press(x: number, y: number)
    {
        console.log(x, y);
        
    }

    render() {
        this.root.appendChild(this.table);
    }
}