var _ = require('squishy-pants/lib/squishy-pants');

//
//   # Time
//
//   The time type encodes the presence of a value of time.
//
//   * `ap(s)` - Applicative ap(ply)
//   * `chain(f)` - Monadic flatMap/bind
//   * `concat(s, plus)` - Semigroup concat
//   * `equal(a)` -  `true` if `a` is equal to `this`
//   * `extract()` -  extract the value from time
//   * `fold(h, m, s, ms)` - Applies functions to value of time.
//   * `map(f)` - Functor map
//
var Time = _.taggedSum('Time', {
    Hours: ['hours'],
    Minutes: ['minutes'],
    Seconds: ['seconds'],
    Milliseconds: ['milliseconds']
});

//
//  ### chain(f)
//
//  Bind through the value of the time
//  Monadic flatMap/bind
//
Time.prototype.chain = function(f) {
    return this.fold(f, f, f, f);
};

//
//  ### concat(s)
//
//  Concatenate two times associatively together.
//  Semigroup concat
//
Time.prototype.concat = function(s) {
    var env = this,
        value = env.extract();
    return _.map(
            s,
            function(y) {
                return _.concat(value, y);
            }
        );
};

//
//  ### extract()
//
//  Extract the value from the time.
//
Time.prototype.extract = function() {
    return this.match({
        Hours: function(a) {
            return a * 1000 * 60 * 60;
        },
        Minutes: function(a) {
            return a * 1000 * 60;
        },
        Seconds: function(a) {
            return a * 1000;
        },
        Milliseconds: _.identity
    });
};

//
//  ### fold(h, m, s, ms)
//
//  Catamorphism. Run the first given function if time, otherwise,
//  the run subsequent functions
//
Time.prototype.fold = function(h, m, s, ms) {
    return this.match({
        Hours: h,
        Minutes: m,
        Seconds: s,
        Milliseconds: ms,
    });
};

//
//  ### map(f)
//
//  Map on the value of this time.
//  Functor map
//
Time.prototype.map = function(f) {
    var env = this,
        value = env.extract();

    return env.match({
        Hours: function(a) {
            return Time.Hours(f(value) / 1000 / 60 / 60);
        },
        Minutes: function(a) {
            return Time.Minutes(f(value) / 1000 / 60);
        },
        Seconds: function(a) {
            return Time.Seconds(f(value) / 1000);
        },
        Milliseconds: function(a) {
            return Time.Milliseconds(f(a));
        }
    });
};

//
//  ## increment
//
//  Increment the time by one unit
//
Time.prototype.increment = function(time) {
    return this.concat(time);
};

//
//  ## decrement
//
//  Decrement the time by one unit
//
Time.prototype.decrement = function() {
    throw new Error('Implement');
};

//
//  ## isTime(a)
//
//  Returns `true` if `a` is an instance of `Time`.
//
var isTime = _.isInstanceOf(Time);

//
//  ## hoursOf()
//
//  Sentinel value for when an hours of a particular type is needed:
//
//       hoursOf()
//
function hoursOf() {
    var self = _.getInstance(this, hoursOf);
    self.type = Number;
    return self;
}

//
//  ## isHoursOf(a)
//
//  Returns `true` if `a` is an instance of `hoursOf`.
//
var isHoursOf = _.isInstanceOf(hoursOf);

//
//  ## minutesOf()
//
//  Sentinel value for when an minutes of a particular type is needed:
//
//       minutesOf()
//
function minutesOf() {
    var self = _.getInstance(this, minutesOf);
    self.type = Number;
    return self;
}

//
//  ## isMinutesOf(a)
//
//  Returns `true` if `a` is an instance of `minutesOf`.
//
var isMinutesOf = _.isInstanceOf(minutesOf);

//
//  ## secondsOf()
//
//  Sentinel value for when an seconds of a particular type is needed:
//
//       secondsOf()
//
function secondsOf() {
    var self = _.getInstance(this, secondsOf);
    self.type = Number;
    return self;
}

//
//  ## isSecondsOf(a)
//
//  Returns `true` if `a` is an instance of `secondsOf`.
//
var isSecondsOf = _.isInstanceOf(secondsOf);

//
//  ## millisecondsOf()
//
//  Sentinel value for when an milliseconds of a particular type is needed:
//
//       millisecondsOf()
//
function millisecondsOf() {
    var self = _.getInstance(this, millisecondsOf);
    self.type = Number;
    return self;
}

//
//  ## isMillisecondsOf(a)
//
//  Returns `true` if `a` is an instance of `millisecondsOf`.
//
var isMillisecondsOf = _.isInstanceOf(millisecondsOf);

//
//  ## incTime(a, b, v)
//
//  Increment time
//
var incTime = _.curry(function(t, x, v) {
    return t + (x * v);
});

//
//  ## decTime(a, b, v)
//
//  Decrement time
//
var decTime = _.curry(function(t, x, v) {
    return t - (x * v);
});

//
//  ## incHours(a, v)
//
//  Increments the number by v
//
var incHours = incTime(360000);

//
//  ## incHour(a)
//
//  Increments the number by 1
//
var incHour = incHours(1);

//
//  ## incMinutes(a, v)
//
//  Increments the number by v
//
var incMinutes = incTime(60000);

//
//  ## incMinute(a)
//
//  Increments the number by 1
//
var incMinute = incMinutes(1);

//
//  ## incSeconds(a, v)
//
//  Increments the number by v
//
var incSeconds = incTime(1000);

//
//  ## incSecond(a)
//
//  Increments the number by 1
//
var incSecond = incSeconds(1);

//
//  ## incMilliseconds(a, v)
//
//  Increments the number by v
//
var incMilliseconds = incTime(1);

//
//  ## incMillisecond(a)
//
//  Increments the number by 1
//
var incMillisecond = incMilliseconds(1);

//
//  ## decHours(a, v)
//
//  Decrements the number by v
//
var decHours = decTime(360000);

//
//  ## decHour(a)
//
//  Decrements the number by 1
//
var decHour = decHours(1);

//
//  ## decMinutes(a, v)
//
//  Decrements the number by v
//
var decMinutes = decTime(60000);

//
//  ## decMinute(a)
//
//  Decrements the number by 1
//
var decMinute = decMinutes(1);

//
//  ## decSeconds(a, v)
//
//  Decrements the number by v
//
var decSeconds = decTime(1000);

//
//  ## decSecond(a)
//
//  Decrements the number by 1
//
var decSecond = decSeconds(1);

//
//  ## decMilliseconds(a, v)
//
//  Decrements the number by v
//
var decMilliseconds = decTime(1);

//
//  ## decMillisecond(a)
//
//  Decrements the number by 1
//
var decMillisecond = decMilliseconds(1);

//
//  ### Fantasy Overload
//
_.fo.unsafeSetValueOf(Time.prototype);

//
//  append methods to the environment.
//
_ = _
  .property('Time', Time)
  .property('Hours', Time.Hours)
  .property('Minutes', Time.Minutes)
  .property('Seconds', Time.Seconds)
  .property('Milliseconds', Time.Milliseconds)
  .property('hoursOf', hoursOf)
  .property('minutesOf', minutesOf)
  .property('secondsOf', secondsOf)
  .property('millisecondsOf', millisecondsOf)
  .property('isHoursOf', isHoursOf)
  .property('isMinutesOf', isMinutesOf)
  .property('isSecondsOf', isSecondsOf)
  .property('isMillisecondsOf', isMillisecondsOf)
  .property('incTime', incTime)
  .property('decTime', decTime)
  .property('incHours', incHours)
  .property('incHour', incHour)
  .property('incMinutes', incMinutes)
  .property('incMinute', incMinute)
  .property('incSeconds', incSeconds)
  .property('incSecond', incSecond)
  .property('incMilliseconds', incMilliseconds)
  .property('incMillisecond', incMillisecond)
  .property('decHours', decHours)
  .property('decHour', decHour)
  .property('decMinutes', decMinutes)
  .property('decMinute', decMinute)
  .property('decSeconds', decSeconds)
  .property('decSecond', decSecond)
  .property('decMilliseconds', decMilliseconds)
  .property('decMillisecond', decMillisecond)
  .method('chain', isTime, function(a, b) {
      return a.chain(b);
  })
  .method('concat', isTime, function(a, b) {
      return a.concat(b);
  })
  .method('extract', isTime, function(a) {
      return a.extract();
  })
  .method('fold', isTime, function(a, b, c, d, e) {
      return a.fold(b, c, d, e);
  })
  .method('map', isTime, function(a, b) {
      return a.map(b);
  });

exports = module.exports = _;
