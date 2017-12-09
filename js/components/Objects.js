export class Objects {
    constructor(map) {
        this.collection = [];
        this.map = map;
    };

    update() {
        this.map.objects.forEach(function(item){
    		item.logic && item.logic();
    	});
    }
}
