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

/* Internal constants for multiplications */
Time.MILLISECONDS_TO_HOURS = 1000 * 60 * 60;
Time.MILLISECONDS_TO_MINUTES = 1000 * 60;
Time.MILLISECONDS_TO_SECONDS = 1000;
Time.MILLISECONDS_TO_MILLISECONDS = 1;

Time.SECONDS_TO_HOURS = 60 * 60;
Time.SECONDS_TO_MINUTES = 60;
Time.SECONDS_TO_SECONDS = 1;
Time.SECONDS_TO_MILLISECONDS = 1000;

Time.MINUTES_TO_HOURS = 60;
Time.MINUTES_TO_MINUTES = 1;
Time.MINUTES_TO_SECONDS = 60;
Time.MINUTES_TO_MILLISECONDS = 1000 * 60;

Time.HOURS_TO_HOURS = 1;
Time.HOURS_TO_MINUTES = 60;
Time.HOURS_TO_SECONDS = 60 * 60;
Time.HOURS_TO_MILLISECONDS = 1000 * 60 * 60;

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
//  ### equal(a)
//
//
Time.prototype.equal = function(b) {
    return this.match({
        Hours: function(a) {
            return _.equal(a, b.hours);
        },
        Minutes: function(a) {
            return _.equal(a, b.minutes);
        },
        Seconds: function(a) {
            return _.equal(a, b.seconds);
        },
        Milliseconds: function(a) {
            return _.equal(a, b.milliseconds);
        }
    });
};

//
//  ### extract()
//
//  Extract the value from the time.
//
Time.prototype.extract = function() {
    return this.match({
        Hours: function(a) {
            return a * Time.MILLISECONDS_TO_HOURS;
        },
        Minutes: function(a) {
            return a * Time.MILLISECONDS_TO_MINUTES;
        },
        Seconds: function(a) {
            return a * Time.MILLISECONDS_TO_SECONDS;
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
//  ## asHours()
//
//  Return just the hours only of a time
//
Time.prototype.asHours = function() {
    /* 24 hour wrapper */
    var wrap = function(a) {
        return a < 0 ? 24 + a : a;
    };

    return this.match({
        Hours: function(a) {
            /* hours -> hours */
            return Time.Hours(wrap(a % 24));
        },
        Minutes: function(a) {
            /* minutes -> hours -> minutes */
            return Time.Minutes(wrap(Math.floor(a / 60) % 24) * Time.MINUTES_TO_HOURS);
        },
        Seconds: function(a) {
            /* seconds -> hours -> seconds */
            return Time.Seconds(wrap(Math.floor(a / 60 / 60) % 24) * Time.SECONDS_TO_HOURS);
        },
        Milliseconds: function(a) {
            /* milliseconds -> hours -> milliseconds */
            return Time.Milliseconds(wrap(Math.floor(a / 1000 / 60 / 60) % 24) * Time.MILLISECONDS_TO_HOURS);
        }
    });
};

//
//  ## asMinutes()
//
//  Return just the minutes only of a time
//
Time.prototype.asMinutes = function() {
    /* minute wrapper */
    var wrap = function(a) {
        return a < 0 ? 60 + a : a;
    };

    return this.match({
        Hours: function(a) {
            /* hours -> minutes -> hours */
            return Time.Hours(wrap(Math.floor(a * Time.HOURS_TO_MINUTES) % 60) / 60);
        },
        Minutes: function(a) {
            /* minutes -> minutes */
            return Time.Minutes(wrap(a % 60));
        },
        Seconds: function(a) {
            /* seconds -> minutes -> seconds */
            return Time.Seconds(wrap(Math.floor(a / 60) % 60) * Time.SECONDS_TO_MINUTES);
        },
        Milliseconds: function(a) {
            /* milliseconds -> minutes -> milliseconds */
            return Time.Milliseconds(wrap(Math.floor(a / 1000 / 60) % 60) * Time.MILLISECONDS_TO_MINUTES);
        }
    });
};

//
//  ## asSeconds()
//
//  Return just the seconds only of a time
//
Time.prototype.asSeconds = function() {
    /* seconds wrapper */
    var wrap = function(a) {
        return a < 0 ? 60 + a : a;
    };

    return this.match({
        Hours: function(a) {
            /* hours -> seconds -> hours */
            return Time.Hours(wrap(Math.floor(a * Time.HOURS_TO_SECONDS) % 60) / 60 / 60);
        },
        Minutes: function(a) {
            /* minutes -> seconds -> minutes */
            return Time.Minutes(wrap(Math.floor(a * Time.MINUTES_TO_SECONDS) % 60) / 60);
        },
        Seconds: function(a) {
            /* seconds -> seconds */
            return Time.Seconds(wrap(a % 60));
        },
        Milliseconds: function(a) {
            /* milliseconds -> seconds -> milliseconds */
            return Time.Milliseconds(wrap(Math.floor(a / 1000) % 60) * Time.MILLISECONDS_TO_SECONDS);
        }
    });
};

//
//  ## asMilliseconds()
//
//  Return just the milliseconds only of a time
//
Time.prototype.asMilliseconds = function() {
    /* milliseconds wrapper */
    var wrap = function(a) {
        return a < 0 ? 1000 + a : a;
    };

    return this.match({
        Hours: function(a) {
            /* hours -> milliseconds -> hours */
            return Time.Hours(wrap(Math.floor(a * Time.HOURS_TO_MILLISECONDS) % 1000) / 1000 / 60 / 60);
        },
        Minutes: function(a) {
            /* minutes -> milliseconds -> minutes */
            return Time.Minutes(wrap(Math.floor(a * Time.MINUTES_TO_MILLISECONDS) % 1000) / 60 / 60);
        },
        Seconds: function(a) {
            /* seconds -> milliseconds -> seconds */
            return Time.Seconds(wrap(Math.floor(a * Time.SECONDS_TO_MILLISECONDS) % 1000) / 60);
        },
        Milliseconds: function(a) {
            /* milliseconds -> milliseconds */
            return Time.Milliseconds(wrap(a % 1000));
        }
    });
};

//
//  ## isTime(a)
//
//  Returns `true` if `a` is an instance of `Time`.
//
var isTime = _.isInstanceOf(Time);

//
//  ## isHours(a)
//
//  Returns `true` if `a` is an instance of `Time.Hours`.
//
var isHours = _.isInstanceOf(Time.Hours);

//
//  ## isMinutes(a)
//
//  Returns `true` if `a` is an instance of `Time.Minutes`.
//
var isMinutes = _.isInstanceOf(Time.Minutes);

//
//  ## isSeconds(a)
//
//  Returns `true` if `a` is an instance of `Time.Seconds`.
//
var isSeconds = _.isInstanceOf(Time.Seconds);

//
//  ## isMilliseconds(a)
//
//  Returns `true` if `a` is an instance of `Time.Milliseconds`.
//
var isMilliseconds = _.isInstanceOf(Time.Milliseconds);

//
//  ## timeOf()
//
//  Sentinel value for when an hours of a particular type is needed:
//
//       timeOf()
//
function timeOf() {
    var self = _.getInstance(this, timeOf);
    self.type = _.Integer;
    return self;
}

//
//  ## isTimeOf(a)
//
//  Returns `true` if `a` is an instance of `timeOf`.
//
var isTimeOf = _.isInstanceOf(timeOf);

//
//  ## hoursOf()
//
//  Sentinel value for when an hours of a particular type is needed:
//
//       hoursOf()
//
function hoursOf() {
    var self = _.getInstance(this, hoursOf);
    self.type = _.Integer;
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
    self.type = _.Integer;
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
    self.type = _.Integer;
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
    self.type = _.Integer;
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
//  ### shrink(t)(m)
//
//  Shrink a time to find other possible issues around the time.
//
var shrink = _.curry(function(t, p, m) {
    var accum = [t(0)],
        n = m[p],
        x = n;

    while(x) {
        x = x / 2;
        x = x < 0 ? Math.ceil(x) : Math.floor(x);

        if (x) accum.push(t(n - x));
    }

    return accum;
});

//
//  append methods to the environment.
//
_ = _
  .property('Time', Time)
  .property('Hours', Time.Hours)
  .property('Minutes', Time.Minutes)
  .property('Seconds', Time.Seconds)
  .property('Milliseconds', Time.Milliseconds)
  .property('isHours', isHours)
  .property('isMinutes', isMinutes)
  .property('isSeconds', isSeconds)
  .property('isMilliseconds', isMilliseconds)
  .property('timeOf', timeOf)
  .property('hoursOf', hoursOf)
  .property('minutesOf', minutesOf)
  .property('secondsOf', secondsOf)
  .property('millisecondsOf', millisecondsOf)
  .property('isTimeOf', isTimeOf)
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
  .method('arb', isTimeOf, function(a, s) {
      var types = [hoursOf, minutesOf, secondsOf, millisecondsOf];
      return this.arb(this.oneOf(types)(), s - 1);
  })
  .method('arb', isHoursOf, function(a, b) {
      return Time.Hours(this.arb(a.type, b - 1));
  })
  .method('arb', isMinutesOf, function(a, b) {
      return Time.Minutes(this.arb(a.type, b - 1));
  })
  .method('arb', isSecondsOf, function(a, b) {
      return Time.Seconds(this.arb(a.type, b - 1));
  })
  .method('arb', isMillisecondsOf, function(a, b) {
      return Time.Milliseconds(this.arb(a.type, b - 1));
  })
  .method('chain', isTime, function(a, b) {
      return a.chain(b);
  })
  .method('concat', isTime, function(a, b) {
      return a.concat(b);
  })
  .method('equal', isTime, function(a, b) {
      return a.equal(b);
  })
  .method('extract', isTime, function(a) {
      return a.extract();
  })
  .method('fold', isTime, function(a, b, c, d, e) {
      return a.fold(b, c, d, e);
  })
  .method('map', isTime, function(a, b) {
      return a.map(b);
  })
  .method('shrink', isHours, function(m) {
      return shrink(_.Hours, 'hours')(m);
  })
  .method('shrink', isMinutes, function(m) {
      return shrink(_.Minutes, 'minutes')(m);
  })
  .method('shrink', isSeconds, function(m) {
      return shrink(_.Seconds, 'seconds')(m);
  })
  .method('shrink', isMilliseconds, function(m) {
      return shrink(_.Milliseconds, 'milliseconds')(m);
  });

exports = module.exports = _;
