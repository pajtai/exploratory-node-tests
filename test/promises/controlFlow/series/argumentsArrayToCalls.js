'use strict';

var chai = require('chai'),
    Q = require('q'),
    should = chai.should(),
    utils = require('./../../../utilities/index');

describe('turning an array of arguments into a series of calls', function(done) {

    it('should console log the arguments with a progressive ' + utils.lag + ' delay', function(done) {

        var functions = getArguments().map(getDelayedMessage),
            result = Q(),
            timer = utils.getTimer();

        timer.start();

        functions.forEach(function(step) {
            result = result.then(step);
        });

        result.then(done.bind(null, undefined));

        function getDelayedMessage(msg) {
            return function() {
                return Q.delay(utils.lag + 100).then(function() {
                    console.log(msg, timer.elapsed());
                    return msg;
                });
            };
        }

        function getArguments() {
            return [
                'apple',
                'orange',
                'pear',
                'hippopotamus',
                'banana'
            ];
        }
    });
});

