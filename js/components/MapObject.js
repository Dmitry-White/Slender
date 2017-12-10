export class MapObject {
    constructor(object,x,y) {
        for(let prop in object){
    		this[prop] = object[prop];
    	}
    	this.x = x;
    	this.y = y;
    };
}
