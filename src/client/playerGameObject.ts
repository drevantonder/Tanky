import { TankSprite } from "./tankSprite";
import { NetworkedGameObject } from "./networkedGameObject";

export class PlayerGameObject extends NetworkedGameObject {
  state: any;
  tank: TankSprite;
  constructor(scene, state) {
    super(scene, state, "player");

    this.state = state;
    this.name = state.name;

    this.tank = new TankSprite(scene, state.tank);

    this.tank.stateGetter = () => {
      return this.stateGetter().tank;
    };
  }

  update(time = 0, delta = 0) {
    this.state = this.scene.registry.get("room").state.players[this.state.id];

    this.name = this.state.name;
    this.tank.update(time, delta);
  }
}
