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

        test.ok(true);
        test.done();
    }
};
