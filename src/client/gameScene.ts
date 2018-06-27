import * as Phaser from "phaser";

import PlayerController from "./playerController";
import Player from "./player";
import { Tile } from "../imports/tile";
import { Room } from "colyseus.js";

export default class GameScene extends Phaser.Scene {
  players: {};
  room: Room;
  playerController: PlayerController;
  constructor() {
    super("main");

    this.players = {};
  }

  preload() {
    this.load.image("tank", "assets/tank_red.png");
    this.load.image("tiles", "assets/terrainTiles_default.png");
  }

  create() {
    this.room = this.registry.get("room");

    this.createMap();

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
    const tank = this.players[this.room.sessionId].tank;
    this.playerController = new PlayerController(tank, this.registry.get("room"), this);
    this.cameras.main.startFollow(tank, true, 0.1, 0.1);
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
    this.players[ id ] = new Player(this, id, value);
  }

  createMap() {
    const mapWidth = this.room.state.map.width;
    const mapHeight = this.room.state.map.height;

    // Creating a blank tilemap with the specified dimensions
    const map = this.make.tilemap(
      {
        tileWidth: Tile.TILE_SIZE,
        tileHeight: Tile.TILE_SIZE,
        width: mapWidth,
        height: mapHeight,
      },
    );

    const tiles = map.addTilesetImage("tiles");

    const layer = map.createBlankDynamicLayer("layer1", tiles);

    layer.randomize(0, 0, map.width, map.height, [0, 10]);

    map.convertLayerToStatic(layer);
  }
}
