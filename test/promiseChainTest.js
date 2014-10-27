'use strict';
var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    Q = require('q'),
    _ = require('lodash'),
    should = chai.should();

describe('vanilla promise chain', function() {
    it('should add up all numbers', function(done) {
        add(0, 1)
            .then(function (sum) {
                console.log(sum, new Date().getTime());
                return sum;
             })
             .then(function (sum) {
                 return add(sum, 4);
             })
             .then(function (sum) {
                console.log(sum, new Date().getTime());
                return sum;
             })
             .then(function (sum) {
                return add(sum, 2);
             })
             .then(function (sum) {
                console.log(sum, new Date().getTime());
                return sum;
             })
             .then(function(sum) {
                 sum.should.equal(7);
                 done();
             })
             .catch(done);
    });
});

describe('generator function', function () {
    it('should add up all numbers', function(done) {
        Q.async(function* () {
            var num = 0;

            num = yield add(num, 1);
            console.log(num, new Date().getTime());
            num = yield add(num, 4);
            console.log(num, new Date().getTime());
            num = yield add(num, 2);
            console.log(num, new Date().getTime());

            num.should.equal(7);
            done();
        })().catch(done);
    });
});

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