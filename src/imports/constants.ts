export class Constants {
    static SPRITE = {
        DEFAULT_WIDTH: 64,
        DEFAULT_HEIGHT: 64,
    };
    static TANK = {
        DEFAULT_ROTATE_SPEED: 4, // degrees
        DEFAULT_MOVEMENT_SPEED: 12, // force
        DEFAULT_RELOAD_SPEED: 400, // ms
        DEFAULT_RECOIL: 10, // px
        DEFULT_RECOIL_RESET_TIME: 100, // ms
        DEFAULT_WIDTH: 44, // px 42 + a margin
        DEFAULT_HEIGHT: 48, // px 46 + a margin
        DEFAULT_MASS: 54000, // kg
    };
    static EXPLOSION = {
        LENGTH: 300, // time in ms this is alive
    };
    static SHELL = {
        DEFAULT_SPEED: 1, // px
        DEFAULT_DAMAGE: 20,
        DEFAULT_RANGE: 1000, // how many pixels the shell will fly
        DEFAULT_WIDTH: 16, // px
        DEFAULT_HEIGHT: 28, // px
        DEFAULT_MASS: 19, // kg
    };
    static TILE = {
        TILE_SIZE: 64,
    };
}
