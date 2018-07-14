import * as Phaser from "phaser";

import { Constants } from "../imports/constants";

export default class GameOverScene extends Phaser.Scene {
  text: Phaser.GameObjects.Text;

  constructor() {
    super("gameOver");
  }

  preload() {
    return;
  }

  create() {
    this.text = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Game Over",
    );

    this.text.x -= this.text.width / 2;
    this.text.y -= this.text.height / 2;

    this.text.setFontFamily(Constants.Font);
  }
}
