import * as Phaser from "phaser";

import { Room } from "colyseus.js";
import { Constants } from "../imports/constants";
import { Status } from "../imports/status";

export default class WaitingScene extends Phaser.Scene {
  room: Room;
  map: Phaser.Tilemaps.Tilemap;
  text: Phaser.GameObjects.Text;

  constructor() {
    super("waiting");
  }

  preload() {
    return;
  }

  create() {
    this.createBackground();

    this.room = this.registry.get("room");

    this.text = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        this.getWaitingText(),
    );

    this.text.x -= this.text.width / 2;
    this.text.y -= this.text.height / 2;

    this.text.setFontFamily(Constants.Font);
  }

  update(time, delta) {
    this.text.setText(this.getWaitingText());
  }

  private getWaitingText() {
    switch (this.room.state.status) {
      case Status.WaitingForMinPlayers:
        return "Waiting For Min Players... " + this.room.state.players.length + " / " + Constants.MIN_PLAYERS;
      case Status.WaitingForExtraPlayers:
        return "Waiting For Extra Players... " + this.room.state.players.length + " / " + Constants.MAX_PLAYERS;
    }
  }

  private createBackground() {
    const background = this.add.graphics({
      x: 0,
      y: 0,
    });

    background.fillStyle(0x404f4d, 1.0);

    background.beginPath();

    background.moveTo(0, 0);
    background.lineTo(this.cameras.main.width, 0);
    background.lineTo(this.cameras.main.width, this.cameras.main.height);
    background.lineTo(0, this.cameras.main.height);
    background.lineTo(0, 0);

    background.closePath();
    background.fillPath();
    background.strokePath();
  }

}
