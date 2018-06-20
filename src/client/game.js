///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

import GameScene from './gameScene'

export default class Game extends Phaser.Game {
    constructor() {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            scene: [GameScene],
            autofocus: true
        }

        super(config)
        window.addEventListener('resize', () => this.onResize())
    }

    onResize(){
        this.resize(window.innerWidth, window.innerHeight)
    }
}


