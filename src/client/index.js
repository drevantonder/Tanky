import * as Colyseus from 'colyseus.js'
import PhaserGame from './PhaserGame'

const host = (window.document.location.host || 'localhost').replace(/:.*/, '')
const client = new Colyseus.Client('ws://' + host + ':3515')

const room = client.join('battle')
room.onJoin.add(() =>  {
  console.log(client.id, 'joined', room.name)

  new PhaserGame(room)
})
