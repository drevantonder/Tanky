import { Tank } from "./tank";

export class Player {
    name = "Andre";
    tank: Tank;
    constructor() {
        this.tank = new Tank();
    }
}
