'use strict';

// These tests use generators. This means they should be run on node 0.11.+ with the --harmony flag:
// mocha --harmony test

var chai = require('chai'),
    utils = require('./../utilities/index'),
    Q = require('q');

chai.should();

describe('parallel that returns different types', function() {


    it('with q promises', function(done) {
        Q.all([ utils.getName(), utils.getAddress(), utils.getSuggestions() ])
            .then(function (userInfo) {
                ({
                    name : userInfo[0],
                    address : userInfo[1],
                    suggestions : userInfo[2]
                })
                    .should.deep.equal(utils.getExpectedUserInfo());
                done();
            })
            .catch(done);
    });

    it('with q async promise generators', function (done) {
        Q.async(function* () {
            var userInfo = yield Q.all([ utils.getName(),  utils.getAddress(),  utils.getSuggestions() ]);

            console.log(userInfo);
            ({
                name : userInfo[0],
                address : userInfo[1],
                suggestions : userInfo[2]
            })
                .should.deep.equal(utils.getExpectedUserInfo());

            done();
        })()
            .catch(done);
    });


});