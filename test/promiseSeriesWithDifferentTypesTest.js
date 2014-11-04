'use strict';

// These tests use generators. This means they should be run on node 0.11.+ with the --harmony flag:
// mocha --harmony test

var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    Q = require('q'),
    _ = require('lodash'),
    should = chai.should(),
    lag = 50;

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