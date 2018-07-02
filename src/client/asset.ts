export class Asset {
    texture: string;
    textureAngleDifference: number;
    file: string;
    constructor(texture: string, file: string, textureAngleDifference: number) {
        this.texture = texture;
        this.file = file;
        this.textureAngleDifference = textureAngleDifference;
    }
}
