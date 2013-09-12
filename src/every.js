var _ = require('../src/time');

function every(time) {
    var value = time,
        id;

    return _.Stream(function(next, done) {
        id = setInterval(function() {
            // Remove time and use state
            time = time.concat(value);
            next(time);
        }, value.extract());
    });
}

_ = _
    .property('every', every);

exports = module.exports = _;
