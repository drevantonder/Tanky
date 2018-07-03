import { Clock } from "colyseus";
import { Engine } from "matter-js";

export class Global {
    static clock: Clock;
    static engine: Engine;
}
