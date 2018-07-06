import { Tank } from "./tank";
import { ISerializable } from "./serializable";
import { Game } from "../game";

export class Player implements ISerializable {
    name = "Andre";
    tank: Tank;
    id: number;
    game: Game;

    constructor(game: Game, id) {
        this.game = game;
        this.tank = new Tank(this.game);
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
