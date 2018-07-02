import { Room } from "colyseus.js";
import * as Phaser from "phaser";

export default class PlayerController {
  room: Room;
  scene: Phaser.Scene;
  pointer: Phaser.Input.Pointer;
  controls: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
  };
  constructor(room, scene) {
    this.room = room;
    this.scene = scene;

    this.pointer = this.scene.input.activePointer;

    this.createControls();
  }

  addKey(keyCode: number) {
    return this.scene.input.keyboard.addKey(new Phaser.Input.Keyboard.Key(keyCode));
  }

  createControls() {
    this.controls = {
      w: this.addKey(87), // w key
      a: this.addKey(65), // a key
      s: this.addKey(83), // s key
      d: this.addKey(68), // d key
      left:  this.addKey(37), // left arrow
      right: this.addKey(39), // right arrow
      down: this.addKey(40), // down arrow
      up: this.addKey(38), // up arrow
    };
  }

  update(time, delta) {
    if (this.controls.left.isDown || this.controls.a.isDown) {
      this.room.send({ input: "left" });
    }

    if (this.controls.right.isDown || this.controls.d.isDown) {
      this.room.send({ input: "right" });
    }

    if (this.controls.down.isDown || this.controls.s.isDown) {
      this.room.send({ input: "down" });
    }

    if (this.controls.up.isDown || this.controls.w.isDown) {
      this.room.send({ input: "up" });
    }

    if (this.pointer.isDown) {
      this.room.send({ input: "fire" });
    }
  }
}
