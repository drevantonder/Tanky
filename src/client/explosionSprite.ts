import { NetworkedSprite } from "./networkedSprite";

export class ExplosionSprite extends NetworkedSprite {
  constructor(scene, state) {
    super(scene, state, "explosion1");

    this.play("explosion");

    this.setDepth(1);
  }
}
