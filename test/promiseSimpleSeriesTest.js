'use strict';

// These tests use generators. This means they should be run on node 0.11.+ with the --harmony flag:
// mocha --harmony test

var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    Q = require('q'),
    _ = require('lodash'),
    should = chai.should(),
    lag = 50;

describe('simple series of promises', function() {
    it('with q promises', function (done) {
        add(0, 1)
            .then(add.bind(null, 4))
            .then(add.bind(null, 2))
            .then(function (sum) {
                sum.should.equal(7);
                done();
            })
            .catch(done);
    });

    it('with q async promise generators', function (done) {
        Q.async(function* () {
            var num = 0;

            num = yield add(num, 1);
            num = yield add(num, 4);
            num = yield add(num, 2);

            num.should.equal(7);
            done();
        })()
            .catch(done);
    });
});