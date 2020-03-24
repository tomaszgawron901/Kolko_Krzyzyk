import {Cell} from './cell.js';


export default class Board{
    public size: number;
    private _self: Cell[][];
    private onChangeTargets: Function[];
    constructor( d: number = 3) {
        if (d <= 0 || d%1 !== 0 ) {
            throw new RangeError(" Size must be natural number. ");
        }
        this.onChangeTargets = [];
        this.size = d;
        this._self = Array<Array<Cell>>(this.size);
        for ( let i = 0; i< this.size; i++ )
        {
            let row = Array<Cell>(this.size);
            for ( let j = 0; j < this.size; j++ )
            {
                row[j] = Cell.Empty
            }
            this._self[i] = row
        }
    }

    public Get( x: number, y: number ): Cell {
        return this._self[x][y];
    }

    public Set(x: number, y: number, sign: Cell){
        this._self[x][y] = sign;
    }

    public GetInfo() {
        let rowsSum = new Array<number>(this.size);
        let colsSum = new Array<number>(this.size);
        let diagsSum = [0, 0];
        let nonEmptySum = 0;

        for (let i = 0; i < this.size; i++) {
            diagsSum[0] += this.Get(i, i);
            diagsSum[1] += this.Get(this.size -i -1, i);

            rowsSum[i] = 0;
            colsSum[i] = 0;
            for (let j = 0; j < this.size; j++) {
                rowsSum[i] += this.Get(i, j);
                colsSum[i] += this.Get(j, i);

                if (this.Get(i, j) != Cell.Empty) {
                    nonEmptySum += 1;
                }

            }

        }
        return {rowsSum, colsSum, diagsSum, nonEmptySum};

    }

}