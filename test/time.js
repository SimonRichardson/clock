var _ = require('./lib/test');

exports.time = {
    'do' : function(test) {

        console.log('');

        console.log(_.Seconds(1).concat(_.Seconds(1)));
        console.log(_.Seconds(1).concat(_.Minutes(1)));
        console.log(_.Minutes(1).concat(_.Minutes(1)));
        console.log(_.Minutes(1).concat(_.Seconds(2)));
        console.log(_.Hours(1).concat(_.Hours(2)));
        console.log(_.Seconds(1).concat(_.Hours(2)));
        console.log(_.Hours(1).concat(_.Seconds(2)));
        console.log(_.Milliseconds(1).concat(_.Milliseconds(2)));
        console.log(_.Seconds(1).concat(_.Milliseconds(2)));
        console.log(_.Milliseconds(1).concat(_.Seconds(2)));

        console.log(_.Seconds(1).chain(function(a) {
            return _.Minutes(1 + a);
        }));

        console.log(_.Seconds(2).map(_.decSecond));
        console.log(_.Milliseconds(2).increment(_.Milliseconds(2)).increment(_.Milliseconds(3)));

        console.log('');

        _.every(_.Milliseconds(100)).map(
            function(s) {
                return s.concat(_.Milliseconds(1));
            }
        ).fork(
            function(x) {
                console.log(x);
            }
        );

        setTimeout(function() {
            test.ok(true);
            test.done();
        }, 2000);
    }
};
