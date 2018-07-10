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
            return this.valueFromPath()[ id ];
        };
    }

    remove(id): any {
        this.get(id).destroy();
        this.delete(id);
    }

    private valueFromPath() {
        const indices = this.path.split("/");
        let value = this.room.state;
        indices.forEach((indice) => {
            value = value[indice];
        });
        return value;
    }

    private setInitialState() {
        const value = this.valueFromPath();
        for (const ID in value) {
            if (value.hasOwnProperty(ID)) {
                this.create(ID, value[ID]);
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
