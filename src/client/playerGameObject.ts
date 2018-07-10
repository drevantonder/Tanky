import { TankSprite } from "./tankSprite";
import { NetworkedGameObject } from "./networkedGameObject";

export class PlayerGameObject extends NetworkedGameObject {
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
    super.update();

    this.name = this.state.name;
    this.tank.update(time, delta);
  }
}
