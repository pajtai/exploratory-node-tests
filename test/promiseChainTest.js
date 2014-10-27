'use strict';
var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    Q = require('q'),
    _ = require('lodash'),
    should = chai.should();

describe('vanilla promise chain', function() {
    it('should add up all numbers', function(done) {
        add(0, 1)
            .then(logSum)
            .then(add.bind(null, 4))
            .then(logSum)
            .then(add.bind(null, 2))
            .then(logSum)
             .then(function(sum) {
                 sum.should.equal(7);
                 done();
             })
             .catch(done);
    });

    it('should add up all numbers & multiply if sum is greater than 4 after the first two add', function(done) {
        add(0, 1)
            .then(logSum)
            .then(add.bind(null, 4))
            .then(logSum)
            .then(function(sum) {
                if (sum > 4) {
                    return multiply(sum, 2);
                } else {
                    return add(sum, 2);
                }
            })
            .then(logSum)
            .then(function(sum) {
                sum.should.equal(10);
                done();
            })
            .catch(done);
    });
});

function logSum(sum) {
    console.log(sum, new Date().getTime());
    return sum;
}

describe('generator function', function () {
    it('should add up all numbers', function(done) {
        Q.async(function* () {
            var num = 0;

            num = yield add(num, 1);
            logSum(num);
            num = yield add(num, 4);
            logSum(num);
            num = yield add(num, 2);
            logSum(num);

            num.should.equal(7);
            done();
        })()
            .catch(done);
    });

    it('should add up all numbers & multiply if sum is greater than 4 after the first two add', function(done) {
        Q.async(function* () {
            var num = 0;

            num = yield add(num, 1);
            logSum(num);
            num = yield add(num, 4);
            logSum(num);
            if (num > 4) {
                num = yield multiply(num, 2);
                logSum(num);
            } else {
                num = yield add(num, 2);
                logSum(num);
            }


            num.should.equal(10);
            done();
        })()
            .catch(done);
    });
});

function multiply(num, otherNum) {
    var def = Q.defer();

    _.delay(function () {
        def.resolve(num * otherNum);
    }, 500);

    return def.promise;
}

function add(num, otherNum) {
    var def = Q.defer();

    _.delay(function () {
        def.resolve(num + otherNum);
    }, 500);

    return def.promise;
}

function addWhoops() {
    return Q.reject();
}
