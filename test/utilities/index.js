'use strict';

var Q = require('Q'),
    _ = require('lodash'),
    lag = 50;

module.exports = {
    lag : lag,

    add : add,
    addWhoops : addWhoops,
    getAddress : getAddress,
    getExpectedUserInfo : getExpectedUserInfo,
    getName : getName,
    getSuggestions : getSuggestions,
    logSum : logSum,
    multiply : multiply,
    getTimer: getTimer
};

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
    return Q.reject(2);
}

function Timer() {}

Timer.prototype.start = function() {
    this.startTime = new Date().getTime();
};

Timer.prototype.elapsed = function() {
    return new Date().getTime() - this.startTime;
};

function getTimer() {
    return new Timer();
}