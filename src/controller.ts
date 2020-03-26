import {Game} from './game';
import {BoardComponent} from './BoardComponent';


export class Controller {
    Game: Game;
    root: HTMLElement;
    boardComponent: BoardComponent;
    newGameBTN: HTMLButtonElement;
    numberInput: HTMLInputElement;
    outputInfo: HTMLDivElement;
    constructor(root: HTMLElement)
    {
        this.root = root;
        this.Game = new Game(3);
        this.initializeComponents();
        this.render();
        this.startNewGame();
    }

    startNewGame() {
        try {
            const boardZise: number = parseInt(this.numberInput.value);
            if (boardZise < 3) {throw new Error();}

            this.Game = new Game(boardZise);
            this.boardComponent.setBoard(this.Game.board);
            this.outputInfo.textContent = this.Game.state;
        }catch{
            this.outputInfo.textContent = 'Unable to start new game.'
        }
    }

    private initializeComponents() {
        this.boardComponent = <BoardComponent>document.createElement('board-component');
        this.boardComponent.addEventListener('elementClicked', (event) => {
            if (this.Game === undefined) return;
            let custom = event as CustomEvent<{x: number; y: number;}>;
            this.Game.SelectCell(custom.detail.x, custom.detail.y);
            this.boardComponent.Refresh();
            this.outputInfo.textContent = this.Game.state;
        })

        this.newGameBTN = <HTMLButtonElement>document.createElement('BUTTON');
        this.newGameBTN.classList.add('newGameButton');
        this.newGameBTN.textContent = 'New Game!';
        this.newGameBTN.addEventListener('click', ()=> {
            this.startNewGame();
        })

        this.numberInput = <HTMLInputElement>document.createElement('INPUT');
        this.numberInput.type = 'number';
        this.numberInput.classList.add('this.numberInput');
        this.numberInput.value = this.Game.board.size.toString();
        this.numberInput.min = '3';
        this.numberInput.max = '100';
    
        this.outputInfo = <HTMLDivElement>document.createElement('DIV');
        this.outputInfo.classList.add('outputInfo');
    }

    render() {
        const container = <HTMLDivElement>document.createElement('DIV');
            container.classList.add('boardContainer');

        const header = <HTMLDivElement>document.createElement('DIV');
            header.classList.add('boardHeader');

        header.appendChild(this.newGameBTN);
        header.appendChild(this.numberInput);
        header.appendChild(this.outputInfo);
        container.appendChild(header);
        container.appendChild(this.boardComponent);
        this.root.appendChild(container);
    }


}