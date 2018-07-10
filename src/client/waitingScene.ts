import * as Phaser from "phaser";

import { Room } from "colyseus.js";
import { Constants } from "../imports/constants";

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
    this.room = this.registry.get("room");

    this.text = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Waiting For Players... " + this.room.state.players.length + " / " + Constants.MIN_PLAYERS,
    );
  }

  update(time, delta) {
    this.text.setText("Waiting For Players... " + this.room.state.players.length + " / " + Constants.MIN_PLAYERS);
  }

}
