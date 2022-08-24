export class MapData {
    constructor() {
    }

    public isBlockedMN(m: number, n: number): boolean {
        if (m < 0 || m >= 100 ||
            n < 0 || n >= 100) {
            return true;
        }
        
        /*
        // 复杂地图
        if (n == 98 && m <= 98) {
            return true;
        }

        if (m == 98 && n != 0 && n != 99) {
            return true;
        }*/

        return false;
    }
}