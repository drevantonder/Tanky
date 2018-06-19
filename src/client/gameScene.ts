///<reference path="phaser.d.ts" />
import Phaser from "phaser";

import Tank from "./tank";

export default class GameScene extends Phaser.Scene {
    tank?: Tank;

    constructor(){
        super('main')
    }

    preload() {
        this.load.image('tank', 'assets/tank_red.png');  
    }

    create() {
        this.tank = new Tank(this, 0, 0, 'tank');
        this.cameras.main.startFollow(this.tank);
        console.log(this.tank);
    }
}
