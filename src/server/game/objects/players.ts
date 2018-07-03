import { Tank } from "./tank";
import { ISerializable } from "./serializable";

export class Player implements ISerializable {
    name = "Andre";
    tank: Tank;
    id: number;

    constructor(id) {
        this.tank = new Tank();
        this.id = id;
    }

    toJSON() {
        return {
            name: this.name,
            tank: this.tank.toJSON(),
            id: this.id,
        };
    }
}
