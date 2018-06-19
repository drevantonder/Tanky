///<reference path="phaser.d.ts" />

export default class Player {
    constructor(tank, scene){
        this.tank = tank
        this.scene = scene

        this.controls = this.scene.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.controls.left && this.controls.left.isDown) {
            this.tank.angle -= 2;
        }

        if(this.controls.right && this.controls.right.isDown) {
            this.tank.angle += 2;
        }

        if(this.controls.down && this.controls.down.isDown) {
            this.tank.y += 20;
        }

        if(this.controls.up && this.controls.up.isDown) {
            this.tank.y -= 20;
        }
    }
}
