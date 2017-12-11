import { Bitmap } from "./Bitmap.js";

export class Objects {
    constructor(map) {
        this.collection = [];
        this.map = map;

        map.addObject({
			color: '#cf3c8c', //цвет для ребят. если куст - не указывать
			texture: new Bitmap('img/cowboy.png', 639, 1500),
			height: .7,
			width: .225,
			floorOffset: 0,
			speed: .1//,
			//logic: badGuyLogic()
		},5,5);

		map.addObject({
			color: '#cf3c8c',
			texture: new Bitmap('img/cowboy.png', 639, 1500),
			height: .7,
			width: .225,
			floorOffset: 0,
			speed: .1//,
			//logic: badGuyLogic()
		},3,9);
    };

    update() {
        this.map.objects.forEach(function(item){
    		item.logic && item.logic();
    	});
    }
}
