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
            return _.expect(a.asHours()).toBe(_.Hours(a.hours % 24));
        },
        [_.hoursOf()]
    ),
    'when creating hours should calling asMinutes return correct new minutes': _.check(
        function(a) {
            return _.expect(a.asMinutes()).toBe(_.Minutes(a.minutes % 60));
        },
        [_.minutesOf()]
    ),
    'when creating hours should calling asSeconds return correct new seconds': _.check(
        function(a) {
            return _.expect(a.asSeconds()).toBe(_.Seconds(a.seconds % 60));
        },
        [_.secondsOf()]
    ),
    'when creating hours should calling asMilliseconds return correct new seconds': _.check(
        function(a) {
            return _.expect(a.asMilliseconds()).toBe(_.Milliseconds(a.milliseconds % 1000));
        },
        [_.millisecondsOf()]
    )
};
