import { Room, EntityMap } from "colyseus";

export class State {
    players: EntityMap<Player> = {};

    createPlayer (id: string) {
        this.players[ id ] = new Player();
    }

    removePlayer (id: string) {
        delete this.players[ id ];
    }

    moveTank (id: string, movement: any) {
        if (movement.x) {
            this.players[ id ].tank.x += movement.x * Tank.MOVEMENT_SPEED;
        }
        if (movement.y) {
            this.players[ id ].tank.y += movement.y * Tank.MOVEMENT_SPEED;
        }
        if (movement.angle) {
            this.players[ id ].tank.angle += movement.angle * Tank.ROTATE_SPEED;
        }
    }
}

export class Tank {
    static ROTATE_SPEED = 10
    static MOVEMENT_SPEED = 10

    x: number
    y: number
    angle: number
    
}

export class Player {
    tank: Tank
    name: "Andre"
}

export class BattleRoom extends Room<State> {
    onInit (options) {
        console.log(this.roomName + " created!", options);

        this.setState(new State());
    }

    onJoin (client) {
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log(this.roomName + " received message from", client.sessionId, ":", data);
        this.state.moveTank(client.sessionId, data);
    }

    onDispose () {
        console.log("Dispose " + this.roomName);
    }
}