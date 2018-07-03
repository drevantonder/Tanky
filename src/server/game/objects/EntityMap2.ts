import { ISerializable } from "./serializable";
import { EntityMap } from "colyseus";

export class EntityMap2<V extends ISerializable> extends Map<string, V> implements ISerializable {
    toJSON() {
        const values: EntityMap<V> = {};
        this.forEach((value, key) => {
            values[key] = value.toJSON();
        });
        return values;
    }
}
