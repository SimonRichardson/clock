var _ = require('./lib/test');

exports.time = {
    'when creating fps should be milliseconds': _.check(
        function(a) {
            return _.isMilliseconds(_.fps(a));
        },
        [_.Integer]
    ),
    'when creating fps should be a valid time': _.check(
        function(a) {
            return _.expect(_.fps(a)).toBe(_.Milliseconds((1 / Math.round(a)) * 1000));
        },
        [_.Integer]
    )
};