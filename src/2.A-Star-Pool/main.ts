import { Cell } from "./Cell";
import { MapData } from "./MapData";
import { Pool } from "./Pool";
import { RouteManager } from "./RouteManager";

console.log('开始执行A-Star-Pool');

var timestamp1 = new Date().getTime();

let mapData: MapData = new MapData();

for (let i = 0; i < 10000; i++) {
    let cellFrom: Cell = Pool.Get();
    cellFrom.m = 0;
    cellFrom.n = 0;

    let cellTo: Cell = Pool.Get();
    cellTo.m = 99;
    cellTo.n = 99;

    RouteManager.Route(mapData, cellFrom, cellTo);
}

var timestamp2 = new Date().getTime();
console.log('耗费时间(毫秒)：', timestamp2 - timestamp1);