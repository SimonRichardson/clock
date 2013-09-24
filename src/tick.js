function tick() {
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame;

    return squishy.Stream(function(next, done) {
        var step = function() {
            next(0);
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
}

//
//  append methods to the squishy environment.
//
squishy = squishy
    .property('tick', tick);