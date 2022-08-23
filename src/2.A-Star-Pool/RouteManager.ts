import { Cell } from "./Cell";
import { MapData } from "./MapData";
import { MN } from "./MN";
import { Pool } from "./Pool";

export class RouteManager {
    private static AroundPosArray: MN[] = [ new MN(0, 1), new MN(1, 1), new MN(1, 0), new MN(1, -1), 
                                            new MN(0, -1), new MN(-1, -1), new MN(-1, 0), new MN(-1, 1)];

    public static Route(mapData: MapData, cellFrom: Cell, cellTo: Cell): void {
        let openMap: Map<string, Cell> = new Map<string, Cell>();
        openMap.set(cellFrom.getKey(), cellFrom);

        let closeMap: Map<string, Cell> = new Map<string, Cell>();

        while (openMap.size > 0) {
            let minFCell: Cell = RouteManager.FindMinFCell(openMap);
            if (minFCell == null) {
                break;
            }

            openMap.delete(minFCell.getKey());
            closeMap.set(minFCell.getKey(), minFCell);

            let aroundCellArray: Cell[] = RouteManager.FindAroundCellArray(minFCell, cellTo, closeMap, mapData);
            for (let i = 0; i < aroundCellArray.length; i++) {
                let aroundCell: Cell = aroundCellArray[i];

                let cellExist: Cell = openMap.get(aroundCell.getKey());
                if (!cellExist) {
                    openMap.set(aroundCell.getKey(), aroundCell);
                } else if (cellExist.g > aroundCell.g) {
                    cellExist.g = aroundCell.g;
                    cellExist.prev = minFCell;

                    Pool.Set(aroundCell);
                } else {
                    Pool.Set(aroundCell);
                }
            }

            // 判断是否到达
            let checkCell: Cell = openMap.get(cellTo.getKey());
            if (checkCell) {
                cellTo = checkCell;
                break;
            }
        }

        // console.log('cell count:', Cell.index_count, Pool.cellArray.length + openMap.size + closeMap.size);

        if (!cellTo.prev) {
            console.log('无法到达');
            return;
        }

        openMap.forEach((cell, _) => {
            Pool.Set(cell);
        });

        closeMap.forEach((cell, _) => {
            Pool.Set(cell);
        });

        // while (cellTo.prev) {
        //     console.log(cellTo.m, cellTo.n);
        //     cellTo = cellTo.prev;
        // }
    }

    private static FindMinFCell(cellMap: Map<string, Cell>): Cell {
        let minFCell: Cell = null;
        let minF: number = Number.MAX_VALUE;

        cellMap.forEach((cell, key) => {
            if (cell.getF() < minF) {
                minF = cell.getF();
                minFCell = cell;
            }
        });

        return minFCell;
    }

    private static FindAroundCellArray(centerCell: Cell, toCell: Cell, closeMap: Map<string, Cell>, mapData: MapData): Cell[] {
        let aroundCellArray: Cell[] = [];

        let centerM: number = centerCell.m;
        let centerN: number = centerCell.n;

        let isTopThrough    = !mapData.isBlockedMN(centerM + RouteManager.AroundPosArray[0].m, centerN + RouteManager.AroundPosArray[0].n);
        let isRightThrough  = !mapData.isBlockedMN(centerM + RouteManager.AroundPosArray[2].m, centerN + RouteManager.AroundPosArray[2].n);
        let isBottomThrough = !mapData.isBlockedMN(centerM + RouteManager.AroundPosArray[4].m, centerN + RouteManager.AroundPosArray[4].n);
        let isLeftThrough   = !mapData.isBlockedMN(centerM + RouteManager.AroundPosArray[6].m, centerN + RouteManager.AroundPosArray[6].n);

        for (let i = 0; i < 8; i++) {
            let m: number = centerM + RouteManager.AroundPosArray[i].m;
            let n: number = centerN + RouteManager.AroundPosArray[i].n;
            if (mapData.isBlockedMN(m, n) || closeMap.has(m + '_' + n)) {
                continue;
            }

            let canThrough: boolean = true;

            switch (i) {
                case 1:
                    canThrough = isTopThrough && isRightThrough;
                    break;

                case 3:
                    canThrough = isRightThrough && isBottomThrough;
                    break;

                case 5:
                    canThrough = isBottomThrough && isLeftThrough;
                    break;

                case 7:
                    canThrough = isLeftThrough && isTopThrough;
                    break;
                
                default:
                    break;
            }

            if (canThrough) {
                let cell: Cell = Pool.Get();
                cell.m = m;
                cell.n = n;
                cell.h = RouteManager.calcH(cell, toCell);
                cell.prev = centerCell;

                if (Math.abs(RouteManager.AroundPosArray[i].m) + Math.abs(RouteManager.AroundPosArray[i].n) == 1) {
                    cell.g = centerCell.g + 10;
                }
                else {
                    cell.g = centerCell.g + 14;
                }

                aroundCellArray.push(cell);
            }
        }

        return aroundCellArray;
    }

    private static calcH(cell0: Cell, cell1: Cell) : number {
        return (Math.abs(cell0.m - cell1.n) + Math.abs(cell0.n - cell1.n)) * 10;
    }
}