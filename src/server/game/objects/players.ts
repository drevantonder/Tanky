import { Tank } from "./tank";
import { ISerializable } from "./serializable";
import { Game } from "../game";
import { Color } from "../../../imports/color";

export class Player implements ISerializable {
    name = "Andre";
    tank: Tank;
    id: number;
    game: Game;
    color: Color;

    constructor(game: Game, id: number, color: Color) {
        this.game = game;
        this.tank = new Tank(this.game);
        this.id = id;
        this.color = color;
    }

    toJSON() {
        return {
            name: this.name,
            tank: this.tank.toJSON(),
            id: this.id,
            color: this.color,
        };
    }
}
