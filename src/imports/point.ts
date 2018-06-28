export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(n: any) {
        if (typeof n === "number") {
            return new Point(this.x + n, this.y + n);
        } else if (n instanceof Point) {
            return new Point(this.x + n.x, this.y + n.y);
        }
        throw new Error("Method not implemented.");
    }

    multiply(n: any) {
        if (typeof n === "number") {
            return new Point(this.x * n, this.y * n);
        } else if (n instanceof Point) {
            return new Point(this.x * n.x, this.y * n.y);
        }
        throw new Error("Method not implemented.");
    }

    subtract(n: any) {
        if (typeof n === "number") {
            return new Point(this.x - n, this.y - n);
        } else if (n instanceof Point) {
            return new Point(this.x - n.x, this.y - n.y);
        }
        throw new Error("Method not implemented.");
    }

    toString() {
        return this.x.toString() + "," + this.y.toString();
    }
}
