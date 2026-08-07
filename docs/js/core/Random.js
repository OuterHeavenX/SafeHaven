export class Random {
    state;
    constructor(state = 0x12345678) {
        this.state = state;
    }
    next() { let x = this.state | 0; x ^= x << 13; x ^= x >>> 17; x ^= x << 5; this.state = x | 0; return (x >>> 0) / 4294967296; }
    range(a, b) { return a + (b - a) * this.next(); }
}
//# sourceMappingURL=Random.js.map