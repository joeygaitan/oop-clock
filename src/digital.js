const Clock = require('./clock')


class DigitalClock extends Clock {
    constructor(options = {}){
        super(options);
        this.format = '24-hour format';
        this.alarms = [];
    }
    toggleFormat(){
        if(this.format ==='24-hour format'){
            this.format = '12-hour format';
        }else{
            this.format = '24-hour format';
        }
    }

    currentTime(){
        let newHour;
        let newMinutes;
        let newSeconds;
        let civTime = ''
        
        if(this.format === '24-hour format'){
            newHour = this.hours < 10 ? `0${this.hours}`:`${this.hours}`
            newMinutes = this.minutes < 10 ? `0${this.minutes}`:`${this.minutes}`
            newSeconds = this.seconds < 10 ? `0${this.seconds}`:`${this.seconds}`

            return `${newHour}:${newMinutes}:${newSeconds}${civTime}`
        }

        if(this.format === '12-hour format'){
            if(this.hours>12){
                newHour = `0${(this.hours - 12)}`
                newMinutes = this.minutes < 10 ? `0${this.minutes}`:`${this.minutes}`
                newSeconds = this.seconds < 10 ? `0${this.seconds}`:`${this.seconds}`
                civTime = 'PM'
            }
            else if(this.hours<10){
                newHour = `0${(this.hours - 12)}`
                newMinutes = this.minutes < 10 ? `0${this.minutes}`:`${this.minutes}`
                newSeconds = this.seconds < 10 ? `0${this.seconds}`:`${this.seconds}`
                civTime = 'AM'
            }else{
                newHour = this.hours
                newMinutes = this.minutes < 10 ? `0${this.minutes}`:`${this.minutes}`
                newSeconds = this.seconds < 10 ? `0${this.seconds}`:`${this.seconds}`
                civTime = 'AM'
            }

        }
        
        return `${newHour}:${newMinutes}:${newSeconds} ${civTime}`
    }

    setAlarm({hours=0, minutes=0, seconds=0}) {
        this.alarms.push({hours, minutes, seconds});
    }
    
    tick(){
        super.tick();
        for(let alarm of this.alarms){
            if(alarm.hours===this.hours &&alarm.minutes===this.minutes&&alarm.seconds===this.seconds){
                console.log('ALARM!')
            }
        }
    }
}

const digital = new DigitalClock({ hours: 20, minutes: 30 ,format: '12-hour format'})

module.exports = DigitalClock