function fps(required) {
    return squishy.Milliseconds((1 / Math.round(required)) * 1000);
}

//
//  append methods to the squishy environment.
//
squishy = squishy
    .property('fps', fps);
