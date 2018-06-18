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
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            scene: [Scene],
            autofocus: true
        };

        super(config)
        window.addEventListener('resize', this.onResize);
    }

    onResize(){
        this.resize(window.innerWidth, window.innerHeight)
    }
}
