'use strict';

// These tests use generators. This means they should be run on node 0.11.+ with the --harmony flag:
// mocha --harmony test

var chai = require('chai'),
    Q = require('q'),
    _ = require('lodash'),
    should = chai.should(),
    utils = require('./../utilities');

describe('simple rejection', function() {

    it('with q promises', function(done) {
        utils.addWhoops().then(function() {}, function(reason) {
            reason.should.equal(2);
            done();
        })
            .catch(done);
    });

    it('with q async promise generators', function(done) {
        Q.async(function* () {
            try {
                yield utils.addWhoops();
            } catch (error) {
                error.should.equal(2);
            }
            done();
        })()
            .catch(done);
    });
});