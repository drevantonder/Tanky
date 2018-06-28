import { Asset } from "./asset";

export class Assets {
    static assets = new Map<string, Asset>(
        [
            ["tank", new Asset("tank", "assets/tank_red.png", -90)],
            ["shell", new Asset("shell", "assets/bulletBlue1.png", 90)],
        ],
    );
}
