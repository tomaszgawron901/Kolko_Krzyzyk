import Board from './board';
import { Cell } from './cell';

export class BoardComponent extends HTMLElement {
    board: Board | undefined;
    constructor() {
      super();
      this.board = new Board(2);
    }

    public setBoard(board: Board) {
        this.board = board;
        this.Refresh();
    }

    public Refresh() {
        this.innerHTML = '';
        let table = document.createElement("TABLE") as HTMLTableElement;
        if ( this.board === undefined) {
            return;
        }
        for (let i = 0; i < this.board.size; i++) {
            let row = table.insertRow(i);
            for (let j = 0; j < this.board.size; j++) {
                let cell = row.insertCell(j);
                let button = <HTMLButtonElement> document.createElement("BUTTON");
                button.disabled = true;
                button.style.fontSize = '40px';
                switch (this.board.Get(i, j)) {
                    case Cell.Circle:
                        button.textContent = 'O';
                        break;
                    case Cell.Cross:
                        button.textContent = 'X';
                        break;
                    default:
                        button.textContent = '';
                        button.disabled = false;
                        break;
                }

                button.addEventListener("click", () => { this.dispatchEvent( new CustomEvent('elementClicked',  {detail: {x: i, y: j} }) ) })
                cell.appendChild(button);
            }
        }
        this.appendChild(table);
    }
}