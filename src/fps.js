function fps(required) {
    return _.Milliseconds((1 / Math.round(required)) * 1000);
}

//
//  append methods to the squishy environment.
//
_ = _
    .property('fps', fps);
