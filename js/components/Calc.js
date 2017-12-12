export class Calc{
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    static getRandomFloat(min, max){
        return min + Math.random() * (max + 1 - min);
    }
}
