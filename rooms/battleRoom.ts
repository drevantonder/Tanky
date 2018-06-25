import { EntityMap, Room } from "colyseus";

export class State {
    players: EntityMap<Player> = {};
    tanks: EntityMap<Tank> = {};

    createPlayer(id: string) {
        this.players[ id ] = new Player();
        this.tanks[ id ] = new Tank();
    }

    removePlayer(id: string) {
        delete this.players[ id ];
        delete this.tanks[ id ];
    }

    moveTank(id: string, movement: any) {
        if (movement.input) {
            const tank = this.tanks[ id ];
            switch (movement.input) {
                case "right":
                    tank.rotateRight();
                    break;
                case "left":
                    tank.rotateLeft();
                    break;
                case "up":
                    tank.forward();
                    break;
                case "down":
                    tank.reverse();
                    break;
            }
        }
    }
}

export class Tank {
    static ROTATE_SPEED = 4;
    static MOVEMENT_SPEED = 10;

    x: number;
    y: number;
    angle: number;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    }

    rotateRight() {
        this.angle += Tank.ROTATE_SPEED;
    }

    rotateLeft() {
        this.angle -= Tank.ROTATE_SPEED;
    }

    forward() {
        this.x += Math.cos(this.angle) * Tank.MOVEMENT_SPEED;
        this.y += Math.sin(this.angle) * Tank.MOVEMENT_SPEED;
    }

    reverse() {
        this.x += Math.cos(this.angle) * Tank.MOVEMENT_SPEED;
        this.y += Math.sin(this.angle) * Tank.MOVEMENT_SPEED;
    }

}

export class Player {
    name = "Andre";
}

export class BattleRoom extends Room<State> {
    public onInit(options) {
        console.log(this.roomName + " created!", options);

        this.setState(new State());
    }

    public onJoin(client) {
        this.state.createPlayer(client.sessionId);
    }

    public onLeave(client) {
        this.state.removePlayer(client.sessionId);
    }

    public onMessage(client, data) {
        console.log(this.roomName + " received message from", client.sessionId, ":", data);
        this.state.moveTank(client.sessionId, data);
    }

    public onDispose() {
        console.log("Dispose " + this.roomName);
    }
}
