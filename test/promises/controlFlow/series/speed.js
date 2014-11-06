'use strict';

var chai = require('chai'),
    Q = require('q'),
    Promise = require('bluebird'),
    should = chai.should(),
    utils = require('./../../../utilities/index'),
    qt = {
        count : 0,
        total : 0
    },
    bbt = {
        count: 0,
        total: 0
    },
    lag = 0;

describe('turning an array of arguments into a series of calls', function() {
    this.timeout(10000);

    var counter = 30 + 1;

    while (--counter) {
        if (Math.random() <= 0.5) {

            it('Q - should console log the arguments with a progressive ' + lag + ' delay', qTest);
        } else {

            it('bluebird - should console log the arguments with a progressive ' + lag + ' delay', bbTest);
        }
    }

    it('test totals:', function() {
        var ba = bbt.total/bbt.count,
            qa = qt.total/qt.count;
        console.log('bluebird average time was:', ba);
        console.log('q average time was:', qa);
        console.log('percent:', 100 - 100*ba/qa);
    });
});

function qTest(done) {

    var timer = utils.getTimer(),
        chain = Q();

    getArguments().forEach(function() {
        chain = chain.then(doAsync);
    });

    timer.start();

    chain
        .then(function() {
            var elapsed = timer.elapsed();
            console.log(elapsed);
            ++qt.count;
            qt.total += elapsed;
        })
        .then(done);

    function doAsync() {
        return Q()
            .then(function() {
                throw new Error();
            })
            .catch(function() {});
    }


}

function bbTest(done) {

    var timer = utils.getTimer(),
        chain = Promise.resolve();

    timer.start();

    getArguments().forEach(function() {
        chain = chain.then(doAsync);
    });

    chain
        .then(function() {
            var elapsed = timer.elapsed();
            console.log(elapsed);
            ++bbt.count;
            bbt.total += elapsed;
        })
        .then(done);

    function doAsync() {
        return Promise.resolve()
            .then(function() {
                throw new Error();
            })
            .catch(function() {});
    }


}

function getArguments() {
    var counter = 100 + 1,
        arr = [];
    while (--counter) {
        arr.push('something');
    }
    return arr;
}
