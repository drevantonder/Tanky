import * as Phaser from "phaser";

import PlayerController from "./playerController";
import { PlayerGameObject } from "./playerGameObject";
import { Tile } from "../imports/tile";
import { Room } from "colyseus.js";
import { Assets } from "./assets";
import { ShellSprite } from "./shellSprite";
import { StateEntitiesManager } from "./stateEntitiesManager";

export default class GameScene extends Phaser.Scene {
  players: StateEntitiesManager<PlayerGameObject>;
  shells: StateEntitiesManager<ShellSprite>;
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

    this.players = new StateEntitiesManager<PlayerGameObject>(this.room, "players", (value) => {
      return new PlayerGameObject(this, value);
    });

    this.shells = new StateEntitiesManager<ShellSprite>(this.room, "shells", (value) => {
      return new ShellSprite(this, value);
    });

    this.setCameraBounds();

    if (this.room.state.players[this.room.sessionId]) {
      this.assignPlayer();
    }
  }

  update(time, delta) {
    if (this.playerController) {
      this.playerController.update(time, delta);
    }

    this.players.forEach((player) => {
      player.update(time, delta);
    });

    this.shells.forEach((shell) => {
      shell.update(time, delta);
    });
  }

  assignPlayer() {
    this.player = this.players.get(this.room.sessionId);
    const tank = this.player.tank;
    this.playerController = new PlayerController(this.registry.get("room"), this);
    this.cameras.main.startFollow(tank);
  }

  setCameraBounds() {
    this.cameras.main.setBounds(0, 0, this.map.width * this.map.tileWidth, this.map.height * this.map.tileHeight);
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

    layer.setDepth(-1);

    layer.randomize(0, 0, this.map.width, this.map.height, [0, 10]);

    this.map.convertLayerToStatic(layer);
  }
}
