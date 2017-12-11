import { Bitmap } from "./Bitmap.js";
import { CIRCLE } from "../main.js";

export class Objects {
    constructor(object) {
        this.texture = object.texture || new Bitmap('img/trees/tree_1.png', 639, 1500),
        this.height = object.height || 1,
        this.width = 0.5,
        this.x = object.x,
        this.y = object.y
    };
}
