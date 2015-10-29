'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var nock = require('nock');

var team = require('./../lib/slack/team');
var errors = require('../lib/errors');
var Cache = require('../lib/cache');
var slackTypes = require('./../lib/slack/types');


describe('team', function () {

    before(function () {
        var cache = Cache;
        cache.data = {};
        cache.data.hostname = 'slack.com';

    });

    // function get(name, callback)
    describe('#getInfo', function () {

        it('exists as method on team', function (done) {
            expect(typeof team.getInfo).to.equal('function');
            done();
        });

        it('should throw and error without a valid callback', function (done) {
            expect(function () {
                team.getInfo(null);
            }).to.throw('callback must be a function');
            done();
        });

        it('should return an api response', function (done) {

        var scope = nock('https://slack.com')
            .post('/api/team.info')
            .reply(200, { ok: true });

            team.getInfo(function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });

        });
        it('should return an api error', function (done) {

        var scope = nock('https://slack.com')
            .post('/api/team.info')
            .reply(200, { ok: false, error: 'api error message' });

            team.getInfo(function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('api error message');
                done();
            });

        });
    });
});