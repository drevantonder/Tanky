import * as Phaser from "phaser";
import { lerp, lerpAngle } from "@gamestdio/mathf";

const TEXTURE_ANGLE_DIFFERENCE_DEGREES = -90;
const INTERPOLATION_PROGRESS = 0.2;
import { Tank } from "../imports/tank";
import { Point } from "../imports/point";

export class TankSprite extends Phaser.GameObjects.Sprite {
  state: Tank;
  constructor(scene, state) {
    super(scene, state.point.x, state.point.y, "tank");

    this.setState(state);
    this.angle = state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES;

    scene.add.existing(this);
  }

  setState(state) {
    this.state = new Tank(new Point(state.point.x, state.point.y), state.angle);
  }

  update(time = 0, delta = 0) {
    this.x = lerp(this.x, this.state.point.x, INTERPOLATION_PROGRESS);
    this.y = lerp(this.y, this.state.point.y, INTERPOLATION_PROGRESS);
    this.angle = lerpAngle(this.angle, this.state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES, INTERPOLATION_PROGRESS);
  }
}
