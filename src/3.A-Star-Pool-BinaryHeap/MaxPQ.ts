import { Cell } from "./Cell"

export class MaxPQ {
    private N = 0
    private pq: Cell[] = []
  
    exch = (a: Cell[], i: number, j: number): void => {
      const temp: Cell = a[i]
      a[i] = a[j]
      a[j] = temp
    }
    // 上浮
    swim = (k: number) => {
      while (k > 1 && this.pq[k].getValue() > this.pq[Math.floor(k / 2)].getValue()) {
        this.exch(this.pq, k, Math.floor(k / 2))
        k = Math.floor(k / 2)
      }
    }
    // 下沉
    sink = (k: number) => {
      while (2 * k <= this.N) {
        let i = 2 * k
        if (i < this.N && this.pq[i + 1].getValue() > this.pq[i].getValue()) i++
        if (this.pq[k].getValue() >= this.pq[i].getValue()) break
        this.exch(this.pq, k, i)
        k = i
      }
    }
  
    insert(Cell: Cell): void {
      this.pq[++this.N] = Cell
      this.swim(this.N)
    }
    delMax(): Cell {
      const res = this.pq[1]
      this.pq[1] = this.pq[this.N]
      this.pq[this.N--] = null
      this.sink(1)
      return res
    }
}