import { Cell } from "./Cell";

export class Pool {
    public static cellArray: Array<Cell> = new Array<Cell>();

    public static Get(): Cell {
        if (Pool.cellArray.length == 0) {
            return new Cell(-1, -1);
        }

        return Pool.cellArray.pop();
    }

    public static Set(cell: Cell): void {
        Pool.cellArray.push(cell);
    }
}