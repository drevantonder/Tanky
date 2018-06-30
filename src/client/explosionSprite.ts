import { NetworkedSprite } from "./networkedSprite";

export class ExplosionSprite extends NetworkedSprite {
  constructor(scene, state) {
    super(scene, state, "explosion");

    this.play("explosion");
  }
}
