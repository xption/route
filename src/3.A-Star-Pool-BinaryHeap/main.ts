import { Cell } from "./Cell";
import { MapData } from "./MapData";
import { Pool } from "./Pool";
import { RouteManager } from "./RouteManager";


let loop: number = 10;
let count: number = 10000;
console.log(`开始执行A-Star-Pool-BinaryHeap ${loop}轮，每轮${count}次`);

let mapData: MapData = new MapData();

let timeArray: Array<number> = new Array<number>();

for (let i = 0; i < loop; i++) {
    var timestamp1 = new Date().getTime();
    
    for (let j = 0; j < count; j++) {
        let cellFrom: Cell = Pool.Get();
        cellFrom.m = 0;
        cellFrom.n = 0;
    
        let cellTo: Cell = Pool.Get();
        cellTo.m = 99;
        cellTo.n = 99;
    
        RouteManager.Route(mapData, cellFrom, cellTo);
    }
    
    var timestamp2 = new Date().getTime();
    timeArray.push(timestamp2 - timestamp1);

    console.log(`第${i}轮耗时（毫秒）:`, timestamp2 - timestamp1);
}

let timeSum: number = 0;

for (let i = 0; i < timeArray.length; i++) {
    timeSum += timeArray[i];
}

console.log(`平均耗时（毫秒）: ${timeSum / timeArray.length}`);

