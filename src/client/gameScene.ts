import * as Phaser from "phaser";

import PlayerController from "./playerController";
import { PlayerGameObject } from "./playerGameObject";
import { Tile } from "../imports/tile";
import { Room } from "colyseus.js";
import { Assets } from "./assets";

export default class GameScene extends Phaser.Scene {
  players = new Map<string, PlayerGameObject>();
  room: Room;
  playerController: PlayerController;
  map: Phaser.Tilemaps.Tilemap;
  player: PlayerGameObject;
  constructor() {
    super("main");
  }

  preload() {
    Assets.assets.forEach((asset) => {
      this.load.image(asset.texture, asset.file);
    });
  }

  create() {
    this.room = this.registry.get("room");

    this.createMap();

    this.setCameraBounds();

    for (const playerID in this.room.state.players) {
      if (this.room.state.players.hasOwnProperty(playerID)) {
        this.createPlayer(playerID, this.room.state.players[playerID]);
      }
    }

    this.room.listen("players/:id", (change) => this.changePlayer(change));

    if (this.room.state.players[this.room.sessionId]) {
      this.assignPlayer();
    }
  }

  update(time, delta) {
    if (this.playerController) {
      this.playerController.update(time, delta);
    }

    for (const playerID in this.players) {
      if (this.players.hasOwnProperty(playerID)) {
        this.players[playerID].update(time, delta);
      }
    }
  }

  assignPlayer() {
    this.player = this.players[this.room.sessionId];
    const tank = this.player.tank;
    this.playerController = new PlayerController(this.registry.get("room"), this);
    this.cameras.main.startFollow(tank);
  }

  setCameraBounds() {
    this.cameras.main.setBounds(0, 0, this.map.width * this.map.tileWidth, this.map.height * this.map.tileHeight);
  }

  changePlayer(change) {
    if (change.operation === "add") {
      this.createPlayer(change.path.id, change.value);
    } else if (change.operation === "remove") {
      this.removePlayer(change.path.id);
    }
  }

  removePlayer(id) {
    delete this.players[ id ];
  }

  createPlayer(id, value) {
    this.players[ id ] = new PlayerGameObject(this, value);
  }

  createMap() {
    const mapWidth = this.room.state.map.width;
    const mapHeight = this.room.state.map.height;

    // Creating a blank tilemap with the specified dimensions
    this.map = this.make.tilemap(
      {
        tileWidth: Tile.TILE_SIZE,
        tileHeight: Tile.TILE_SIZE,
        width: mapWidth,
        height: mapHeight,
      },
    );

    const tiles = this.map.addTilesetImage("tiles");

    const layer = this.map.createBlankDynamicLayer("layer1", tiles);

    layer.randomize(0, 0, this.map.width, this.map.height, [0, 10]);

    this.map.convertLayerToStatic(layer);
  }
}
