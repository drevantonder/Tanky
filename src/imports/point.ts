export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(n: any) {
        if (typeof n === "number") {
            this.x += n;
            this.y += n;
            return this;
        } else if (n instanceof Point) {
            this.x += n.x;
            this.y += n.y;
            return this;
        }
        throw new Error("Method not implemented.");
    }

    multiply(n: any) {
        if (typeof n === "number") {
            this.x *= n;
            this.y *= n;
            return this;
        } else if (n instanceof Point) {
            this.x *= n.x;
            this.y *= n.y;
            return this;
        }
        throw new Error("Method not implemented.");
    }

    subtract(n: any) {
        if (typeof n === "number") {
            this.x -= n;
            this.y -= n;
            return this;
        } else if (n instanceof Point) {
            this.x -= n.x;
            this.y -= n.y;
            return this;
        }
        throw new Error("Method not implemented.");
    }

    toString() {
        return this.x.toString() + "," + this.y.toString();
    }
}
