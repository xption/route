import { MapData } from "./MapData";
import { RouteManager } from "./RouteManager";

let loop: number = 10;
let count: number = 10000;
console.log(`开始执行BFS ${loop}轮，每轮${count}次`);

let mapData: MapData = new MapData();

let timeArray: Array<number> = new Array<number>();

for (let i = 0; i < loop; i++) {
    var timestamp1 = new Date().getTime();
    
    for (let j = 0; j < count; j++) {
        let mFrom: number = 50;
        let nFrom: number = 50;
        
        let mTo: number = 99;
        let nTo: number = 99;
    
        RouteManager.Route(mFrom, nFrom, mTo, nTo, mapData);
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

