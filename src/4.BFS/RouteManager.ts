import { MapData } from "./MapData";
import { MN } from "./MN";

export class RouteManager {
    private static AroundPosArray: MN[] = [ new MN(0, -1), new MN(1, 0), new MN(0, 1), new MN(-1, 0), 
                                            new MN(1, 1), new MN(1, -1), new MN(-1, -1), new MN(-1, 1)];

    static dataArray: Array<number> = new Array<number>(3 * 100 * 100);
    static flagArray: Array<boolean> = new Array<boolean>(100 * 100);

    public static Route(mFrom: number, nFrom: number, mTo: number, nTo: number, mapData: MapData) {
        RouteManager.reset();

        let endKey: number = RouteManager.CalcKey(mTo, nTo);
        let endCellIndex: number = -1;

        let curIndex: number = 0;
        let lastIndex: number = 0;

        RouteManager.dataArray[3 * curIndex] = mFrom;
        RouteManager.dataArray[3 * curIndex + 1] = nFrom;
        RouteManager.dataArray[3 * curIndex + 2] = -1;

        while (curIndex <= lastIndex) {
            let bestCellIdx: number = curIndex;
            curIndex++;

            let bestM: number = RouteManager.dataArray[3 * bestCellIdx];
            let bestN: number = RouteManager.dataArray[3 * bestCellIdx + 1];

            // console.log('best:', bestM, bestN);

            for (let i = 0; i < 8; i++) {
                let m: number = bestM + RouteManager.AroundPosArray[i].m;
                let n: number = bestN + RouteManager.AroundPosArray[i].n;

                if (m < 0 || n < 0) {
                    continue;
                }

                let key: number = RouteManager.CalcKey(m, n);
                if (this.flagArray[key]) {
                    continue;
                }

                if (mapData.isBlockedMN(m, n)) {
                    this.flagArray[key] = true;
                    continue;
                }

                this.flagArray[key] = true;

                lastIndex++;

                RouteManager.dataArray[3 * lastIndex] = m;
                RouteManager.dataArray[3 * lastIndex + 1] = n;
                RouteManager.dataArray[3 * lastIndex + 2] = bestCellIdx;

                if (key == endKey) {
                    endCellIndex = lastIndex;
                    break;
                }
            }

            if (endCellIndex >= 0) {
                break;
            }
        }

        if (endCellIndex == -1)
        {
            // 无法到达
            console.log('无法到达');
            return;
        }

        // let count: number = 0;
        // while (endCellIndex != -1) {
        //     // console.log(RouteManager.dataArray[3 * endCellIndex], RouteManager.dataArray[3 * endCellIndex + 1]);
        //     count++;
        //     endCellIndex = RouteManager.dataArray[3 * endCellIndex + 2];
        // }

        // console.log('找到路径, 节点数量:', count);
    }

    private static CalcKey(m: number, n: number): number {
        return m + n * 100;
    }

    private static reset(): void {
        for (let i = 0; i < this.flagArray.length; i++) {
            this.flagArray[i] = false;
        }
    }
}