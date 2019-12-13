const Clock = require('./clock');

class Watch {
    constructor(clock,options){
        if(!(clock instanceof Clock)){
            throw new Error('no clock :(')
        }
        if(!options){
            throw new Error('no options given')
        }
        this.name = options.name;
        this.brand = options.brand;
        this.price = options.price;
        this.duration = options.duration;
        this.clock = clock
    }
    currentTime(){
        return this.clock.currentTime()
    }
    tick(){
        if(this.duration!==0){
            this.clock.tick()
            this.duration--; 
        }
        return this
    }
}

module.exports = Watch