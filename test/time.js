var _ = require('./lib/test');

exports.time = {
    'when creating hours should be a valid time': _.check(
        function(a) {
            return _.isHours(a);
        },
        [_.hoursOf()]
    ),
    'when creating minutes should be a valid time': _.check(
        function(a) {
            return _.isMinutes(a);
        },
        [_.minutesOf()]
    ),
    'when creating seconds should be a valid time': _.check(
        function(a) {
            return _.isSeconds(a);
        },
        [_.secondsOf()]
    ),
    'when creating milliseconds should be a valid time': _.check(
        function(a) {
            return _.isMilliseconds(a);
        },
        [_.millisecondsOf()]
    ),
    'when creating hours should calling asHours return correct new hours': _.check(
        function(a) {
            var b = a.hours % 24,
                c = b < 0 ? 24 + b : b;

            return _.expect(a.asHours()).toBe(_.Hours(c));
        },
        [_.hoursOf()]
    ),
    'when creating minutes should calling asMinutes return correct new minutes': _.check(
        function(a) {
            var b = a.minutes % 60,
                c = b < 0 ? 60 + b : b;

            return _.expect(a.asMinutes()).toBe(_.Minutes(c));
        },
        [_.minutesOf()]
    ),
    'when creating seconds should calling asSeconds return correct new seconds': _.check(
        function(a) {
            var b = a.seconds % 60,
                c = b < 0 ? 60 + b : b;

            return _.expect(a.asSeconds()).toBe(_.Seconds(c));
        },
        [_.secondsOf()]
    ),
    'when creating milliseconds should calling asMilliseconds return correct new seconds': _.check(
        function(a) {
            var b = a.milliseconds % 1000,
                c = b < 0 ? 1000 + b : b;

            return _.expect(a.asMilliseconds()).toBe(_.Milliseconds(c));
        },
        [_.millisecondsOf()]
    ),
    'when creating time should calling asHours return correct time': _.check(
        function(a) {
            var wrap = function(a) {
                    return a < 0 ? 24 + a : a;
                },
                expected = a.match({
                    Hours: function(a) {
                        return _.Hours(wrap(a % 24));
                    },
                    Minutes: function(a) {
                        return _.Minutes(wrap(Math.floor(a / 60) % 24) * 60);
                    },
                    Seconds: function(a) {
                        return _.Seconds(wrap(Math.floor(a / 60 / 60) % 24) * 60 * 60);
                    },
                    Milliseconds: function(a) {
                        return _.Milliseconds(wrap(Math.floor(a / 1000 / 60 / 60) % 24) * 1000 * 60 * 60);
                    }
                });

            return _.expect(a.asHours()).toBe(expected);
        },
        [_.timeOf()]
    ),
    'when creating time should calling asMinutes return correct time': _.check(
        function(a) {
            var wrap = function(a) {
                    return a < 0 ? 60 + a : a;
                },
                expected = a.match({
                    Hours: function(a) {
                        return _.Hours(wrap(Math.floor(a * 60) % 60) / 60);
                    },
                    Minutes: function(a) {
                        return _.Minutes(wrap(a % 60));
                    },
                    Seconds: function(a) {
                        return _.Seconds(wrap(Math.floor(a / 60) % 60) * 60);
                    },
                    Milliseconds: function(a) {
                        return _.Milliseconds(wrap(Math.floor(a / 1000 / 60) % 60) * 1000 * 60);
                    }
                });

            return _.expect(a.asMinutes()).toBe(expected);
        },
        [_.timeOf()]
    ),
    'when creating time should calling asSeconds return correct time': _.check(
        function(a) {
            var wrap = function(a) {
                    return a < 0 ? 60 + a : a;
                },
                expected = a.match({
                    Hours: function(a) {
                        return _.Hours(wrap(Math.floor(a * 60 * 60) % 60) / 60 / 60);
                    },
                    Minutes: function(a) {
                        return _.Minutes(wrap(Math.floor(a * 60) % 60) / 60);
                    },
                    Seconds: function(a) {
                        return _.Seconds(wrap(a % 60));
                    },
                    Milliseconds: function(a) {
                        return _.Milliseconds(wrap(Math.floor(a / 1000) % 60) * 1000);
                    }
                });

            return _.expect(a.asSeconds()).toBe(expected);
        },
        [_.timeOf()]
    ),
    'when creating time should calling asMilliseconds return correct time': _.check(
        function(a) {
            var wrap = function(a) {
                    return a < 0 ? 1000 + a : a;
                },
                expected = a.match({
                    Hours: function(a) {
                        return _.Hours(wrap(Math.floor(a * 1000 * 60 * 60) % 1000) / 1000 / 60 / 60);
                    },
                    Minutes: function(a) {
                        return _.Minutes(wrap(Math.floor(a * 1000 * 60) % 1000) / 60 / 60);
                    },
                    Seconds: function(a) {
                        return _.Seconds(wrap(Math.floor(a * 1000) % 1000) / 60);
                    },
                    Milliseconds: function(a) {
                        return _.Milliseconds(wrap(a % 1000));
                    }
                });

            return _.expect(a.asMilliseconds()).toBe(expected);
        },
        [_.timeOf()]
    )
};
