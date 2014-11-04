'use strict';

// These tests use generators. This means they should be run on node 0.11.+ with the --harmony flag:
// mocha --harmony test

var chai = require('chai'),
    Q = require('q'),
    should = chai.should(),
    utils = require('./../../../utilities/index');

describe('series that returns different types', function() {

    it('with q promises', function(done) {
        var userInfo = {};
        utils.getName()
            .then(function(name) {
                userInfo.name = name;
            })
            .then(utils.getAddress)
            .then(function(address) {
                userInfo.address = address;
            })
            .then(utils.getSuggestions)
            .then(function(suggestions) {
                userInfo.suggestions = suggestions;
            })
            .then(function() {
                userInfo.should.deep.equal(utils.getExpectedUserInfo());
                done();
            })
            .catch(done);
    });

    it('with q async promise generators', function (done) {
        Q.async(function* () {
            var theName, address, suggestions, answer;
            theName = yield utils.getName();
            address = yield utils.getAddress();
            suggestions = yield utils.getSuggestions();

            ({
                name : theName,
                address : address,
                suggestions : suggestions
            }).should.deep.equal(utils.getExpectedUserInfo());

            done();
        })()
            .catch(done);
    });


});