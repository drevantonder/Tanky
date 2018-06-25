import * as Colyseus from 'colyseus.js'
import PhaserGame from './PhaserGame'

var host = (window.document.location.host || 'localhost').replace(/:.*/, '')
var client = new Colyseus.Client('ws://' + host + ':3515')

var room = client.join('battle')
room.onJoin.add(function() {
  console.log(client.id, 'joined', room.name)
})

new PhaserGame(room)