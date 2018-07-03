export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(n: any) {
        const point = new Point(this.x, this.y);
        if (typeof n === "number") {
            point.x += n;
            point.y += n;
            return point;
        } else if (n instanceof Point) {
            point.x += n.x;
            point.y += n.y;
            return point;
        }
        throw new Error("Method not implemented.");
    }

    multiply(n: any) {
        const point = new Point(this.x, this.y);
        if (typeof n === "number") {
            point.x *= n;
            point.y *= n;
            return point;
        } else if (n instanceof Point) {
            point.x *= n.x;
            point.y *= n.y;
            return point;
        }
        throw new Error("Method not implemented.");
    }

    subtract(n: any) {
        const point = new Point(this.x, this.y);
        if (typeof n === "number") {
            point.x -= n;
            point.y -= n;
            return point;
        } else if (n instanceof Point) {
            point.x -= n.x;
            point.y -= n.y;
            return point;
        }
        throw new Error("Method not implemented.");
    }

    toString() {
        return this.x.toString() + "," + this.y.toString();
    }
}
