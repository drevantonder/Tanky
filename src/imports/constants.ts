export class Constants {
    static SPRITE = {
        DEFUALT_WIDTH: 64,
        DEFUALT_HEIGHT: 64,
    };
    static TANK = {
        DEFUALT_ROTATE_SPEED: 4, // degrees
        DEFUALT_MOVEMENT_SPEED: 12, // force
        DEFUALT_RELOAD_SPEED: 400, // ms
        DEFUALT_RECOIL: 10, // px
        DEFULT_RECOIL_RESET_TIME: 100, // ms
        DEFUALT_WIDTH: 44, // px 42 + a margin
        DEFUALT_HEIGHT: 48, // px 46 + a margin
    };
    static EXPLOSION = {
        LENGTH: 300, // time in ms this is alive
    };
    static SHELL = {
        DEFAULT_SPEED: 15, // px
        DEFAULT_DAMAGE: 20,
        DEFUALT_RANGE: 1000, // how many pixels the shell will fly
        DEFUALT_WIDTH: 8, // px
        DEFUALT_HEIGHT: 14, // px
    };
    static TILE = {
        TILE_SIZE: 64,
    };
}
