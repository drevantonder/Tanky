import { Asset } from "./asset";

export class Assets {
    static assets = new Map<string, Asset>(
        [
            ["tank_blue", new Asset("tank_blue", "assets/tank_blue.png", -90)],
            ["tank_red", new Asset("tank_red", "assets/tank_red.png", -90)],
            ["tank_green", new Asset("tank_green", "assets/tank_green.png", -90)],
            ["tank_sand", new Asset("tank_sand", "assets/tank_sand.png", -90)],
            ["tiles", new Asset("tiles", "assets/terrainTiles_default.png", 0)],
            ["shell", new Asset("shell", "assets/bulletBlue1.png", 90)],
            ["explosion1", new Asset("explosion1", "assets/explosion1.png", 0)],
            ["explosion2", new Asset("explosion2", "assets/explosion2.png", 0)],
            ["explosion3", new Asset("explosion3", "assets/explosion3.png", 0)],
            ["explosion4", new Asset("explosion4", "assets/explosion4.png", 0)],
            ["explosion5", new Asset("explosion5", "assets/explosion5.png", 0)],
        ],
    );
}
