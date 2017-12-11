import { Bitmap } from "./Bitmap.js";

export class Paper{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    placePaper(papers, col, row, map) {
        let num = map.getRandomInt(0,8);
        map.addObject({
        	color: '',
        	texture: new Bitmap(papers[num].texture, papers[num].width, papers[num].height),
        	height: 0.2,
        	width: 0.2,
            x:col,
            y:row
        });
        return num;
   }
}
