export class MapData {
    constructor() {
    }

    public isBlockedMN(m: number, n: number): boolean {
        if (m < 0 || m >= 100 ||
            n < 0 || n >= 100) {
            return true;
        }

        return false;
    }
}