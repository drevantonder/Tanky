import { Tank } from "./tank";

export class Player {
    name = "Andre";
    tank: Tank;
    id: number;

    constructor(id) {
        this.tank = new Tank();
        this.id = id;
    }
}
