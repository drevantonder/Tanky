import { NetworkedSprite } from "./networkedSprite";
import { Color } from "../imports/color";

export class TankSprite extends NetworkedSprite {
  constructor(scene, state, color: Color) {
    let texture = "tank_";

    switch (color) {
      case Color.Blue:
        texture += "blue";
        break;
      case Color.Green:
        texture += "green";
        break;
      case Color.Sand:
        texture += "sand";
        break;
      case Color.Red:
        texture += "red";
        break;
      default:
        texture += "blue";
    }

    super(scene, state, texture);

    this.setDepth(2);
  }
}
