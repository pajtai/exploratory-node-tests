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

describe('series that returns different types', function() {

    it('with q promises', function(done) {
        var userInfo = {};
            getName()
                .then(function(name) {
                    userInfo.name = name;
                })
                .then(getAddress)
                .then(function(address) {
                    userInfo.address = address;
                })
                .then(getSuggestions)
                .then(function(suggestions) {
                    userInfo.suggestions = suggestions;
                })
                .then(function() {
                    userInfo.should.deep.equal(getExpectedUserInfo());
                    done();
                })
                .catch(done);
    });

    it('with q async promise generators', function (done) {
        Q.async(function* () {
            var theName, address, suggestions, answer;
            theName = yield getName();
            address = yield getAddress();
            suggestions = yield getSuggestions();

            ({
                name : theName,
                address : address,
                suggestions : suggestions
            }).should.deep.equal(getExpectedUserInfo());

            done();
        })()
            .catch(done);
    });


});

describe('parallel that returns different types', function() {


    it('with q promises', function(done) {
        Q.all([ getName(), getAddress(), getSuggestions() ])
            .then(function (userInfo) {
                ({
                    name : userInfo[0],
                    address : userInfo[1],
                    suggestions : userInfo[2]
                })
                    .should.deep.equal(getExpectedUserInfo());
                done();
            })
            .catch(done);
    });

    it('with q async promise generators', function (done) {
        Q.async(function* () {
            var userInfo = yield Q.all([ getName(),  getAddress(),  getSuggestions() ]);

            console.log(userInfo);
            ({
                name : userInfo[0],
                address : userInfo[1],
                suggestions : userInfo[2]
            })
                .should.deep.equal(getExpectedUserInfo());

            done();
        })()
            .catch(done);
    });


});

function getExpectedUserInfo() {
    return {
        name : 'julia',
        address : {
            'gulia drive' : 123
        },
        suggestions : [ 'go away' ]
    };
}

function getName() {
    var deferred = Q.defer();
    _.delay(function() {
        deferred.resolve('julia');
    }, lag);
    return deferred.promise;
}

function getAddress() {
    var deferred = Q.defer();
    _.delay(function() {
        deferred.resolve({
            'gulia drive': 123
        });
    }, lag);
    return deferred.promise;
}

function getSuggestions() {
    var deferred = Q.defer();
    _.delay(function() {
        deferred.resolve(['go away']);
    }, lag);
    return deferred.promise;
}

describe('promises with conditional logic', function() {
    it('with q promises', function (done) {
        add(0, 1)
            .then(add.bind(null, 4))
            .then(function (sum) {
                if (sum > 4) {
                    return multiply(sum, 2);
                } else {
                    return add(sum, 2);
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

            num = yield add(num, 1);
            num = yield add(num, 4);
            if (num > 4) {
                num = yield multiply(num, 2);
            } else {
                num = yield add(num, 2);
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
        var sum = num * otherNum;
        logSum(sum);
        def.resolve(sum);
    }, lag);

    return def.promise;
}

function add(num, otherNum) {
    var def = Q.defer();

    _.delay(function () {
        var sum = num + otherNum;
        logSum(sum);
        def.resolve(sum);
    }, lag);

    return def.promise;
}

function logSum(sum) {
    console.log('           ', sum, new Date().getTime());
    return sum;
}

function addWhoops() {
    return Q.reject();
}
