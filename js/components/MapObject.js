export class MapObject {
    constructor(object,x,y) {
        for(var prop in object){
    		this[prop] = object[prop];
    	}
    	this.x = x;
    	this.y = y;
    };
}
