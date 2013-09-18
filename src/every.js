function every(time) {
    var value = time,
        id;

    return _.Stream(function(next, done) {
        id = setInterval(function() {
            /* Remove time and use state */
            time = time.concat(value);
            next(time);
        }, value.extract());
    });
}

//
//  append methods to the squishy environment.
//
_ = _
    .property('every', every);
