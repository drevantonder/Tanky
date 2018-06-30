import { Sprite } from "./sprite";

export class Explosion extends Sprite {
    static LENGTH = 10; // sim frames the explosion shows for

    timeAlive: number = 0;

    update() {
        this.timeAlive += 1;
        if (this.timeAlive >= Explosion.LENGTH) {
            this.destroy();
        }
    }
}
