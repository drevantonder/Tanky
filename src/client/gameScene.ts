///<reference path="phaser.d.ts" />
import Phaser from "phaser";

import Tank from "./tank";

export default class GameScene extends Phaser.Scene {
    tank?: Tank

    constructor(){
        super('main')
    }

    preload() {
        this.load.image('tank', 'assets/tank_red.png');  
        this.load.image('grass', 'assets/tileGrass1.png');  // TODO: remove this as this is just a marker
    }

    create() {
        this.add.image(300, 300, 'grass'); // TODO: remove this as this is just a marker

        this.tank = new Tank(this, 0, 0, 'tank');
        this.cameras.main.startFollow(this.tank);
    }

    update(){     
        if(this.tank)
            this.tank.update(0,0);
    }
}
