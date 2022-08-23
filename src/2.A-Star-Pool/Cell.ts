export class Cell {
    public m: number = 0;
    public n: number = 0;
    public g: number = 0;
    public h: number = 0;
    public prev: Cell = null;

    constructor(m: number, n: number) {
        this.m = m;
        this.n = n;
    }

    public getKey() : string {
        return this.m + "_" + this.n;
    }

    public getF() : number {
        return this.g + this.h;
    }
}