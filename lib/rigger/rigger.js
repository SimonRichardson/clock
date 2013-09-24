(function(global) {

    'use strict';

    //
    //   ### Description
    //

    /* squishy pant's environment means `this` is special */
    /*jshint validthis: true*/

    /* squishy pants uses the !(this instanceof c) trick to remove `new` */
    /*jshint newcap: false*/

    var squishy = require('squishy-pants');

    //= ../../src/time.js

    //= ../../src/fps.js

    //= ../../src/every.js

    //= ../../src/tick.js

    if (typeof exports != 'undefined') {
        /*jshint node: true*/
        exports = module.exports = squishy;
    } else {
        global.squishy = squishy;
    }
})(this);