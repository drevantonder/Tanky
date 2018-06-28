import * as Phaser from "phaser";
import { TankSprite } from "./tankSprite";

export class PlayerSprite extends Phaser.GameObjects.GameObject {
  state: any;
  id: string;
  tank: TankSprite;
  constructor(scene, id, state) {
    super(scene, "player");

    this.state = state;
    this.id = id;
    this.name = state.name;

    this.tank = new TankSprite(scene, state.tank);
  }

  update(time = 0, delta = 0) {
    this.state = this.scene.registry.get("room").state.players[this.id];

    this.name = this.state.name;
    this.tank.setState(this.state.tank);
    this.tank.update(time, delta);
  }
}
