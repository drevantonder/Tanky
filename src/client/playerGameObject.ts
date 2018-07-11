import { TankSprite } from "./tankSprite";
import { NetworkedGameObject } from "./networkedGameObject";

export class PlayerGameObject extends NetworkedGameObject {
  tank?: TankSprite;
  constructor(scene, state) {
    super(scene, state, "player");

    this.state = state;

    if (this.state.tank) {
      this.tank = new TankSprite(scene, state.tank, state.color);

      this.tank.stateGetter = () => {
        return this.stateGetter().tank;
      };
    }
  }

  update(time = 0, delta = 0) {
    super.update();
    if (this.tank && !this.state.tank) {
      this.tank.destroy();
      this.tank = null;
    }

    if (this.tank) {
      this.tank.update(time, delta);
    }
  }

  destroy() {
    if (this.tank) {
      this.tank.destroy();
    }

    super.destroy();
  }
}
