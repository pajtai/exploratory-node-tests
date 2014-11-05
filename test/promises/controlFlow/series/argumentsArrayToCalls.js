'use strict';

var chai = require('chai'),
    Q = require('q'),
    Promise = require('bluebird'),
    should = chai.should(),
    utils = require('./../../../utilities/index');

describe('turning an array of arguments into a series of calls', function(done) {

    it('Q - should console log the arguments with a progressive ' + utils.lag + ' delay', function(done) {

        var functions = getArguments().map(getDelayedMessage),
            timer = utils.getTimer();

        timer.start();

        functions.reduce(Q.when, Q())
            .then(done);

        function getDelayedMessage(msg) {
            return function() {
                return Q.delay(utils.lag + 100).then(function() {
                    console.log(msg, timer.elapsed());
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

    it('bluebird - should console log the arguments with a progressive ' + utils.lag + ' delay', function(done) {

        var timer = utils.getTimer();

        timer.start();

        Promise.reduce(getArguments(), getDelayedMessage)
            .then(done);

        function getDelayedMessage(total, msg) {
                return Promise.delay(utils.lag + 100).then(function() {
                    console.log(msg, timer.elapsed());
                });
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

