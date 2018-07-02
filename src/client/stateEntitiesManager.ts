import { Room } from "colyseus.js";
import { NetworkedGameObject } from "./networkedGameObject";

export class StateEntitiesManager<T extends NetworkedGameObject> extends Map<string, T> {
    private createFunction: (value) => T;
    private room: Room;
    private path: string;

    constructor(room: Room, path: string, createFunction: (value) => T) {
        super();
        this.room = room;
        this.path = path;
        this.createFunction = createFunction;

        this.setInitialState();
        this.watchPath();
    }

    create(id, value) {
        const entity = this.createFunction(value);
        this.set(id, entity);
        entity.stateGetter = () => {
            return this.room.state[ this.path ][ id ];
        };
    }

    remove(id): any {
        this.get(id).destroy();
        this.delete(id);
    }

    private setInitialState() {
        for (const ID in this.room.state[this.path]) {
            if (this.room.state[this.path].hasOwnProperty(ID)) {
                this.create(ID, this.room.state.players[ID]);
            }
        }
    }

    private watchPath() {
        this.room.listen(this.path + "/:id", (change) => {
            if (change.operation === "add") {
                this.create(change.path.id, change.value);
            } else if (change.operation === "remove") {
                this.remove(change.path.id);
            }
        });
    }
}
