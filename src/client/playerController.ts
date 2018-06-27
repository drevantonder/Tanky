export default class PlayerController {
  room: any;
  scene: any;
  controls: any;
  constructor(tank, room, scene) {
    this.room = room;
    this.scene = scene;

    this.controls = this.scene.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    if (this.controls.left.isDown) {
      this.room.send({ input: "left" });
    }

    if (this.controls.right.isDown) {
      this.room.send({ input: "right" });
    }

    if (this.controls.down.isDown) {
      this.room.send({ input: "down" });
    }

    if (this.controls.up.isDown) {
      this.room.send({ input: "up" });
    }
  }
}
