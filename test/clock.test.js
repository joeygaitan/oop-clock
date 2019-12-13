const expect = require('chai').expect
const { Clock } = require('../src')

describe('Clock', function () {
  describe('new Clock()', function () {
    it('should create a new instance of clock', function () {
      const clock = new Clock()
      expect(clock).to.be.an.instanceof(Clock)
    })

    it('accepts options for hours, minutes, and seconds', function () {
      const time = { hours: 12, minutes: 16, seconds: 20 }
      const clock = new Clock(time)

      expect(clock.hours).to.equal(time.hours)
      expect(clock.minutes).to.equal(time.minutes)
      expect(clock.seconds).to.equal(time.seconds)
    })

    it('should default to midnight', function () {
      const clock = new Clock()

      expect(clock.hours).to.equal(0)
      expect(clock.minutes).to.equal(0)
      expect(clock.seconds).to.equal(0)
    })

    it('should default any non-specified values to 0s', function () {
      const hours = new Clock({ hours: 10 })
      expect(hours.hours).to.equal(10)
      expect(hours.minutes).to.equal(0)
      expect(hours.seconds).to.equal(0)

      const minutes = new Clock({ minutes: 10 })
      expect(minutes.hours).to.equal(0)
      expect(minutes.minutes).to.equal(10)
      expect(minutes.seconds).to.equal(0)

      const seconds = new Clock({ seconds: 10 })
      expect(seconds.hours).to.equal(0)
      expect(seconds.minutes).to.equal(0)
      expect(seconds.seconds).to.equal(10)
    })

    it('should default any specified values that are out of range', function () {
      const hours = new Clock({ hours: 24, minutes: -1, seconds: 99 })
      expect(hours.hours).to.equal(0)
      expect(hours.minutes).to.equal(0)
      expect(hours.seconds).to.equal(0)
    })
  })

  describe('#currentTime()', function () {
    it('should return the current time in 24-hour format', function () {
      const clockDefault = new Clock()
      const actualDefault = clockDefault.currentTime()
      const expectedDefault = '00:00:00'
      expect(actualDefault).to.equal(expectedDefault)

      const clockSet = new Clock({ hours: 1, minutes: 30, seconds: 9 })
      const actualSet = clockSet.currentTime()
      const expectedSet = '01:30:09'
      expect(actualSet).to.equal(expectedSet)
    })
  })

  describe('#hours', function () {
    it('should return the current hours of an instance', function () {
      const clock = new Clock({ hours: 10 })
      const actual = clock.hours
      const expected = 10

      expect(actual).to.equal(expected)
    })

    it('should assign hours to an instance', function () {
      const clock = new Clock()
      clock.hours = 10
      const actual = clock.hours
      const expected = 10

      expect(actual).to.equal(expected)
    })

    it('should ignore the input if it is out of range', function () {
      const clock = new Clock()
      clock.hours = 25
      const actual = clock.hours
      const expected = 0

      expect(actual).to.equal(expected)
    })
  })

  describe('#minutes', function () {
    it('should return the current minutes of an instance', function () {
      const clock = new Clock({ minutes: 10 })
      const actual = clock.minutes
      const expected = 10

      expect(actual).to.equal(expected)
    })

    it('should assign minutes to an instance', function () {
      const clock = new Clock()
      clock.minutes = 10
      const actual = clock.minutes
      const expected = 10

      expect(actual).to.equal(expected)
    })

    it('should ignore the input if it is out of range', function () {
      const clock = new Clock()
      clock.minutes = 65
      const actual = clock.minutes
      const expected = 0

      expect(actual).to.equal(expected)
    })
  })

  describe('#seconds', function () {
    it('should return the current seconds of an instance', function () {
      const clock = new Clock({ seconds: 10 })
      const actual = clock.seconds
      const expected = 10

      expect(actual).to.equal(expected)
    })

    it('should assign seconds to an instance', function () {
      const clock = new Clock()
      clock.seconds = 10
      const actual = clock.seconds
      const expected = 10

      expect(actual).to.equal(expected)
    })

    it('should ignore the input if it is out of range', function () {
      const clock = new Clock()
      clock.seconds = 65
      const actual = clock.seconds
      const expected = 0

      expect(actual).to.equal(expected)
    })
  })

  describe('#tick()', function () {
    it('should be chainable', function () {
      const clock = new Clock()
      const actual = () => clock.tick().tick()

      expect(actual).to.not.throw()
    })

    it('should increase the second by one', function () {
      const clock = new Clock({ seconds: 10 })
      clock.tick()

      expect(clock.seconds).to.equal(11)
    })

    it('should increase the minute by one and reset seconds if a minute passes', function () {
      const clock = new Clock({ minutes: 1, seconds: 59 })
      clock.tick()

      expect(clock.minutes).to.equal(2)
      expect(clock.seconds).to.equal(0)
    })

    it('should increase the hour by one and reset seconds and minutes if an hour passes', function () {
      const clock = new Clock({ hours: 1, minutes: 59, seconds: 59 })
      clock.tick()

      expect(clock.hours).to.equal(2)
      expect(clock.minutes).to.equal(0)
      expect(clock.seconds).to.equal(0)
    })

    it('should increase the reset once it ticks to midnight', function () {
      const clock = new Clock({ hours: 23, minutes: 59, seconds: 59 })
      clock.tick()

      expect(clock.hours).to.equal(0)
      expect(clock.minutes).to.equal(0)
      expect(clock.seconds).to.equal(0)
    })
  })
})
