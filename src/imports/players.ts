import { Tank } from "./tank";
import { nosync, Clock} from "colyseus";

export class Player {
    name = "Andre";
    tank: Tank;
    id: number;

    constructor(id) {
        this.tank = new Tank();
        this.id = id;
    }
}
