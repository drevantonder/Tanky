import { lerp } from "@gamestdio/mathf/lib";

const FULL_ANGLE = 2 * Math.PI;
const STRAIGHT_ANGLE = Math.PI;

export function lerpRadians(a: number, b: number, t: number) {
    while (a > b + STRAIGHT_ANGLE) {
      b += FULL_ANGLE;
    }

    while (b > a + STRAIGHT_ANGLE) {
      b -= FULL_ANGLE;
    }

    return lerp(a, b, t);
}
