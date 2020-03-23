import Board from './board.js';
import { Cell } from './cell.js';

export enum GameState {
    onGoing, circleWins, crossWins, draw
}

export enum Players {
    cirlce, cross
}

export class Game {
    board: Board;
    state: GameState;
    turn: Players;
    constructor(){
        this.board = new Board(7);
        this.state = GameState.onGoing;
        this.turn = Players.cirlce;
    }

    private calculateState() {
        let info = this.board.GetInfo();
        let boardVectors = info.rowsSum.concat(info.colsSum.concat(info.diagsSum));
        for (let i = 0; i < boardVectors.length; i++) {
            if (boardVectors[i] === this.board.size) {
                this.state = GameState.circleWins;
            }
            if (boardVectors[i] === -this.board.size) {
                this.state = GameState.crossWins;
            }
        }
        if (info.nonEmptySum === this.board.size**2) {
            this.state = GameState.draw;
        }
        this.state = GameState.onGoing;
    }


    public SelectCell(x: number, y: number) {
        if ( this.state !== GameState.onGoing ) {
            return;
        }
        if ( this.board.Get(x, y) !== Cell.Empty ) {
            return;
        }

        switch (this.turn) {
            case Players.cirlce:
                this.board.Set(x, y, Cell.Circle);
                break;
            case Players.cross:
                this.board.Set(x, y, Cell.Cross);
                break;
        }
        this.calculateState();
    }
}