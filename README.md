clock
=====

Experimenting with time in javascript.

## Building

Install the development dependencies with [npm](https://npmjs.org/):

    npm install

Run the tests with [npm](https://npmjs.org/):

    npm test

Run the tests with [grunt](http://gruntjs.com/):

    grunt default

### Building for browser

Install [commonjs-everywhere](), it's easier to install it globally ```-g```:

    npm install -g commonjs-everywhere

Then run ```npm test```, followed by the following:

    cjsify bin/clock.js --export squishy > clock.browser.js

Then you can include clock.browser.js in your html page.
