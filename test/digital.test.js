const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const { Clock, DigitalClock } = require('../src')

chai.use(require('sinon-chai'))
describe('DigitalClock', function () {
  describe('new DigitalClock()', function () {
    it('creates a new instance of DigitalClock', function () {
      const digital = new DigitalClock()
      expect(digital).to.be.an.instanceof(DigitalClock)
    })

    it('is extended from the Clock class', function () {
      const digital = new DigitalClock()
      const actual = Object.getPrototypeOf(digital.constructor).name

      expect(actual).to.equal('Clock')
    })

    it('accepts options for hours, minutes, and seconds', function () {
      const time = { hours: 12, minutes: 16, seconds: 20 }
      const clock = new DigitalClock(time)

      expect(clock.hours).to.equal(time.hours)
      expect(clock.minutes).to.equal(time.minutes)
      expect(clock.seconds).to.equal(time.seconds)
    })
  })

  describe('#format', function () {
    it('should, by default, return a string that says the clock is in 24-hour format', function () {
      const digital = new DigitalClock()

      const actual = digital.format
      const expected = '24-hour format'
      expect(actual).to.equal(expected)
    })

    describe('#toggleFormat()', function () {
      it('should toggle between 24-hour format and 12-hour format', function () {
        const digital = new DigitalClock()

        expect(digital.format).to.equal('24-hour format')

        digital.toggleFormat()
        expect(digital.format).to.equal('12-hour format')

        digital.toggleFormat()
        expect(digital.format).to.equal('24-hour format')
      })
    })
  })

  describe('#currentTime()', function () {
    it('should return the current time in 24-hour format', function () {
      const digital = new DigitalClock({ hours: 20, minutes: 30 })

      const actual = digital.currentTime()
      const expected = '20:30:00'
      expect(actual).to.equal(expected)
    })

    it('should return the current time in 12-hour format', function () {
      const digital = new DigitalClock({ hours: 20, minutes: 30 })
      digital.toggleFormat()

      

      const actual = digital.currentTime()
      const expected = '08:30:00 PM'
      expect(actual).to.equal(expected)
    })
  })

  describe('#setAlarm', function () {
    beforeEach(function () {
      sinon.spy(console, 'log')
    })

    afterEach(function () {
      console.log.restore()
    })

    it('should allow for an alarm to be set at at a specified time', function () {
      const digital = new DigitalClock()
      const actual = () => digital.setAlarm({ hours: 7 })

      expect(actual).to.not.throw()
    })

    it('should ring the alarm (console.log) when it becomes the specified time', function () {
      const digital = new DigitalClock({ hours: 6, minutes: 59, seconds: 59 })

      digital.setAlarm({ hours: 7 })
      digital.tick()

      expect(console.log).to.have.been.calledOnce
    })

    it('should ring multiple alarms if the same time is set for multiple alarms', function () {
      const digital = new DigitalClock({ hours: 7 })

      digital.setAlarm({ hours: 7, seconds: 1 })
      digital.setAlarm({ hours: 7, seconds: 1 })
      digital.setAlarm({ hours: 7, seconds: 2 })

      digital.tick()
      digital.tick()
      digital.tick()

      expect(console.log).to.have.been.calledThrice
    })
  })
})
