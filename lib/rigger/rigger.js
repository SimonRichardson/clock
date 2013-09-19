(function(global) {

    'use strict';

    //
    //   ### Description
    //

    /* squishy pant's environment means `this` is special */
    /*jshint validthis: true*/

    /* squishy pants uses the !(this instanceof c) trick to remove `new` */
    /*jshint newcap: false*/

    var _ = require('squishy-pants');

    //= ../../src/time.js

    //= ../../src/every.js

    if (typeof exports != 'undefined') {
        /*jshint node: true*/
        exports = module.exports = _;
    } else {
        global._ = _;
    }
})(this);