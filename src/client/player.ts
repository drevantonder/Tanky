import * as Phaser from "phaser";
import Tank from "./tank";

export default class Player extends Phaser.GameObjects.GameObject {
  state: any;
  id: string;
  tank: Tank;
  constructor(scene, id, state) {
    super(scene, "player");

    this.state = state;
    this.id = id;
    this.name = state.name;

    this.tank = new Tank(scene, state.tank);
  }

  update(time = 0, delta = 0) {
    this.state = this.scene.registry.get("room").state.players[this.id];

    this.name = this.state.name;

    this.tank.state = this.state.tank;
    this.tank.update(time, delta);
  }
}
