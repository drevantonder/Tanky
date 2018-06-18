///<reference path="phaser.d.ts" />
import Phaser from "phaser";

class Scene extends Phaser.Scene {
    constructor(){
        super('main')
    }

    preload() {
        this.load.image('tank', 'assets/tank_red.png');
    }

    create() {
        this.add.image(400, 300, 'tank');
    }
}

export default class Game extends Phaser.Game {
    constructor() {
        var config = {
            width: 1000,
            height: 1000,
            type: Phaser.AUTO,
            scene: [Scene]
        };

        super(config)
    }
}
