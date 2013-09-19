function tick() {
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame;

    return _.Stream(function(next, done) {
        var step = function() {
            next();
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
}

//
//  append methods to the squishy environment.
//
_ = _
    .property('tick', tick);