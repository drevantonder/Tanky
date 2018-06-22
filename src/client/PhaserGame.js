///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

import GameScene from './gameScene'

export default class PhaserGame extends Phaser.Game {
  constructor(game) {
    var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: [GameScene],
      autofocus: true
    }

    super(config)

    this.registry.values.state = game
    
    window.addEventListener('resize', () => this.onResize())
  }

  onResize(){
    this.resize(window.innerWidth, window.innerHeight)
  }

  assignPlayer(player) {
    this.registry.set('player', player)
  }
}


