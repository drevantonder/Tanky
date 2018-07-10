import { NetworkedSprite } from "./networkedSprite";
import { Color } from "../imports/color";

export class TankSprite extends NetworkedSprite {
  constructor(scene, state, color: Color) {
    let texture = "tank_";

    switch (color) {
      case Color.Green:
        texture += "green";
        break;
      case Color.Blue:
        texture += "blue";
        break;
      case Color.Sand:
        texture += "sand";
        break;
      case Color.Red:
        texture += "red";
        break;
      default:
        throw new Error("Color does not exist: " + color);
    }

    super(scene, state, texture);

    this.setDepth(2);
  }
}
