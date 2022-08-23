import { Cell } from "./Cell";
import { MapData } from "./MapData";
import { RouteManager } from "./RouteManager";

console.log('开始执行A-Star:');

var timestamp1 = new Date().getTime();

let mapData: MapData = new MapData();
let cellFrom: Cell = new Cell(0, 0);
let cellTo: Cell = new Cell(99, 99);

for (let i = 0; i < 10000; i++) {
    RouteManager.Route(mapData, cellFrom, cellTo);
}

var timestamp2 = new Date().getTime();
console.log('耗费时间(毫秒)：', timestamp2 - timestamp1);