'use strict';

// These tests use generators. This means they should be run on node 0.11.+ with the --harmony flag:
// mocha --harmony test

var chai = require('chai'),
    Q = require('q'),
    utils = require('./utilities');

    chai.should();

describe('promises with conditional logic', function() {
    it('with q promises', function (done) {
        utils.add(0, 1)
            .then(utils.add.bind(null, 4))
            .then(function (sum) {
                if (sum > 4) {
                    return utils.multiply(sum, 2);
                } else {
                    return utils.add(sum, 2);
                }
            })
            .then(function (sum) {
                sum.should.equal(10);
                done();
            })
            .catch(done);
    });

    it('with q async promise generators', function (done) {
        Q.async(function* () {
            var num = 0;

            num = yield utils.add(num, 1);
            num = yield utils.add(num, 4);
            if (num > 4) {
                num = yield utils.multiply(num, 2);
            } else {
                num = yield utils.add(num, 2);
            }

            num.should.equal(10);
            done();
        })()
            .catch(done);
    });
});


