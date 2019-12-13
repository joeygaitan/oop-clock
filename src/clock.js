class Clock {
    constructor({hours=0,minutes=0,seconds=0} ={}){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    set hours(val){
        this._hours = val >= 0 && val <= 23 ? val: 0
    }

    set minutes(val){
        this._minutes = val >= 0 && val <= 60 ? val: 0
    }
    set seconds(val){
        this._seconds = val >= 0 && val <= 60 ? val: 0  
    }
    get hours(){
        return this._hours
    }
    get minutes(){
        return this._minutes
    }
    get seconds(){
        return this._seconds
    }
    currentTime(){
        
        let hour = 0 <= this.hours && this.hours <= 9 ? `0${this.hours}`: `${this.hours}` 
        let minute = 0 <= this.minutes && this.minutes <= 9 ? `0${this.minutes}` : `${this.minutes}`
        let second = 0 <= this.seconds && this.seconds <= 9 ? `0${this.seconds}`: `${this.seconds}`
        return `${hour}:${minute}:${second}`
    }
    tick(){
        this.seconds++;

        if(this.seconds === 60){
            this.minutes++;
            this.seconds = 0;
            if(this.minutes === 60){
                this.hours++;
                this._minutes = 0
            }
        }
        return this
    }
}


module.exports = Clock