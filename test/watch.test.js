const expect = require('chai').expect
const { Clock, Watch } = require('../src')

describe('Watch', function () {
  describe('new Watch()', function () {
    it('creates a new instance of Watch', function () {
      const clock = new Clock()
      const options = { name: 'Weekender', brand: 'Timex', price: 57.10, duration: 10 }
      const watch = new Watch(clock, options)

      expect(watch).to.be.an.instanceof(Watch)
    })

    it('accepts two arguments, the first is an instance of a clock, the second an object of properties', function () {
      const clock = new Clock()
      const options = { name: 'Weekender', brand: 'Timex', price: 57.10, duration: 10 }
      const watch = new Watch(clock, options)

      expect(watch).to.be.an.instanceof(Watch)
    })

    it('throws an error if a clock instance is not given as its initial argument', function () {
      const noArg = () => new Watch()
      expect(noArg).to.throw()

      const wrongType = () => new Watch({})
      expect(wrongType).to.throw()
    })

    it('throws an error if the clock options do not include a name, brand, price and duration', function () {
      const clock = new Clock()
      const actual = () => new Watch(clock)

      expect(actual).to.throw()
    })

    it('accepts options for name, brand, price, and duration', function () {
      const clock = new Clock()
      const options = { name: 'Weekender', brand: 'Timex', price: 57.10, duration: 10 }
      const watch = new Watch(clock, options)

      expect(watch.name).to.equal(options.name)
      expect(watch.brand).to.equal(options.brand)
      expect(watch.price).to.equal(options.price)
      expect(watch.duration).to.equal(options.duration)
    })
  })

  describe('#currentTime()', function () {
    it('returns the current time', function () {
      const clock = new Clock({ hours: 7 })
      const options = { name: 'Weekender', brand: 'Timex', price: 57.10, duration: 10 }
      const watch = new Watch(clock, options)

      const actual = watch.currentTime()
      expect(actual).to.equal('07:00:00')
    })
  })

  describe('#tick()', function () {
    it('can chain together method calls', function () {
      const clock = new Clock({ hours: 7 })
      const options = { name: 'Weekender', brand: 'Timex', price: 57.10, duration: 10 }
      const watch = new Watch(clock, options)
      const actual = () => watch.tick().tick()

      expect(actual).to.not.throw()
    })

    it('returns the current time and decrements the duration', function () {
      const clock = new Clock({ hours: 7 })
      const options = { name: 'Weekender', brand: 'Timex', price: 57.10, duration: 10 }
      const watch = new Watch(clock, options)
      watch.tick().tick()

      const actual = watch.currentTime()
      expect(actual).to.equal('07:00:02')
      expect(watch.duration).to.equal(8)
    })

    it('if duration is at 0, the clock doesn\'t tick', function () {
      const clock = new Clock({ hours: 7 })
      const options = { name: 'Weekender', brand: 'Timex', price: 57.10, duration: 1 }
      const watch = new Watch(clock, options)
      watch.tick().tick()

      const actual = watch.currentTime()
      expect(actual).to.equal('07:00:01')
      expect(watch.duration).to.equal(0)
    })
  })
})
