import Board from './board';
import { Cell } from './cell';

export enum GameState {
    onGoing = 'onGoing',
    circleWins = 'circleWins',
    crossWins = 'crossWins',
    draw = 'draw'
}

export enum Players {
    cirlce, cross
}

export class Game {
    board: Board;
    state: GameState;
    turn: Players;
    constructor(boardSize: number){
        this.board = new Board(boardSize);
        this.state = GameState.onGoing;
        this.turn = Players.cirlce;
    }

    private calculateState() {
        let info = this.board.GetInfo();
        let boardVectors = info.rowsSum.concat(info.colsSum.concat(info.diagsSum));
        for (let i = 0; i < boardVectors.length; i++) {
            if (boardVectors[i] === this.board.size) {
                this.state = GameState.circleWins;
                return;
            }
            if (boardVectors[i] === -this.board.size) {
                this.state = GameState.crossWins;
                return;
            }
        }
        if (info.nonEmptySum === this.board.size**2) {
            this.state = GameState.draw;
            return;
        }
        this.state = GameState.onGoing;
    }


    private swapTurn() {
        if (this.turn == Players.cirlce) {
            this.turn = Players.cross;
            return;
        }
        this.turn = Players.cirlce;
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
        this.swapTurn();
    }
}