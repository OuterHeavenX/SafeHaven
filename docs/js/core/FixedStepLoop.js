export class FixedStepLoop {
    step;
    maxCatchup;
    acc = 0;
    constructor(step = 1 / 20, maxCatchup = .25) {
        this.step = step;
        this.maxCatchup = maxCatchup;
    }
    update(dt, fn) { this.acc += Math.min(dt, this.maxCatchup); while (this.acc >= this.step) {
        fn(this.step);
        this.acc -= this.step;
    } }
    reset() { this.acc = 0; }
}
//# sourceMappingURL=FixedStepLoop.js.map