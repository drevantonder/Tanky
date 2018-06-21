///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

import GameScene from './gameScene'
const Game = require('../imports/game')

export default class GameController extends Game {
  constructor() {
    super()

    var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: [GameScene],
      autofocus: true
    }

    this.game = new Phaser.Game(config)
    
    window.addEventListener('resize', () => this.onResize())
  }

  onResize(){
    this.game.resize(window.innerWidth, window.innerHeight)
  }
}


