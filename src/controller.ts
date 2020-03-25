import {Game} from './game';
import {BoardComponent} from './BoardComponent';


export class Controller {
    Game: Game;
    root: HTMLElement;
    boardComponent: BoardComponent;
    constructor(root: HTMLElement)
    {
        this.Game = new Game();
        this.root = root;
        this.boardComponent = <BoardComponent>document.createElement('board-component');
        this.boardComponent.setBoard(this.Game.board);
        this.root.appendChild(this.boardComponent);
        this.boardComponent.addEventListener('elementClicked', (event) => {
            let custom = event as CustomEvent<{x: number; y: number;}>;
            this.Game.SelectCell(custom.detail.x, custom.detail.y);
            this.boardComponent.Refresh();
        })
    }
}