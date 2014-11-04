'use strict';

// These tests use generators. This means they should be run on node 0.11.+ with the --harmony flag:
// mocha --harmony test

var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    Q = require('q'),
    _ = require('lodash'),
    should = chai.should(),
    lag = 50;

describe('simple rejection', function() {

    it('with q promises', function(done) {
        addWhoops().then(function() {}, function(reason) {
            reason.should.equal(2);
            done();
        })
            .catch(done);
    });

    it('with q async promise generators', function(done) {
        Q.async(function* () {
            try {
                yield addWhoops();
            } catch (error) {
                error.should.equal(2);
            }
            done();
        })()
            .catch(done);
    });
});