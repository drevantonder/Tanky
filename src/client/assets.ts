import { Asset } from "./asset";

export class Assets {
    static assets = new Map<string, Asset>(
        [
            ["tank", new Asset("tank", "assets/tank_red.png", -90)],
            ["tiles", new Asset("tiles", "assets/terrainTiles_default.png", 0)],
            ["shell", new Asset("shell", "assets/bulletBlue1.png", 90)],
        ],
    );
}
