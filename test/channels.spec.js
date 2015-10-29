'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var nock = require('nock');

var channels = require('./../lib/slack/channels');
var errors = require('../lib/errors');
var Cache = require('../lib/cache');
var slackTypes = require('./../lib/slack/types');


describe('channels', function () {

    before(function () {
        var cache = Cache;
        cache.data = {};
        cache.data.channels = [{ id: 'C0A1B2C3D4', name: 'general' }];
        cache.data.hostname = 'slack.com';
    });

    // function get(name, callback)
    describe('#getChannel', function () {

        it('should throw and error without a valid callback', function (done) {
            expect(function () {
                channels.getChannel(null, null);
            }).to.throw('callback must be a function');
            done();
        });

        it('should return an error to callback if missing required string argument', function (done) {

            channels.getChannel(null, function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('must supply valid argument(s)');
            });
            done();
        });

        it('should return an error to callback when entity not found', function (done) {
            channels.getChannel('not_general', function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('the channel, group, or user could not be found');
            });
            done();
        });

        it('should return the channel object from the cache', function (done) {
            channels.getChannel('general', function (err, result) {
                expect(result).to.be.an('object');
                expect(result.id).to.equal('C0A1B2C3D4');
            });
            done();
        });
    });

    // function get(name, callback)
    describe('#getLastChannelMessage', function () {


        it('should throw and error without a valid callback', function (done) {
            expect(function () {
                channels.getLastChannelMessage(null);
            }).to.throw('callback must be a function');
            done();
        });

        it('should return an error to callback if missing required string argument', function (done) {

            channels.getLastChannelMessage(null, function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('must supply valid argument(s)');
            });
            done();
        });

        it('should validate the passed channel id', function (done) {

            channels.getLastChannelMessage('G0A1B2C34D', function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('invalid channel id');
            });
            done();
        });

        it('should return an api response to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.history')
                .reply(200, { ok: true });

            channels.getLastChannelMessage('C0A1B2C34D', function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });

        });

        it('should return an api error to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.history')
                .reply(200, { ok: false, error: 'invalid api request' });

            channels.getLastChannelMessage('C0A1B2C34D', function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('invalid api request');
                done();
            });

        });
    });

    // function get(name, callback)
    describe('#getHistory', function () {

        it('should throw and error without a valid callback', function (done) {
            expect(function () {
                channels.getHistory(null);
            }).to.throw('callback must be a function');
            done();
        });

        it('should return an error to callback if missing required string argument', function (done) {

            channels.getHistory(null, function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('must supply valid argument(s)');
            });
            done();
        });

         it('should validate the passed channel id', function (done) {

            channels.getHistory('G0A1B2C34D', function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('invalid channel id');
            });
            done();
        });

        it('should return an api response to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.history')
                .reply(200, { ok: true });

            channels.getHistory('C0A1B2C34D', function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });
        });

         it('should return an api error to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.history')
                .reply(200, { ok: false, error: 'invalid api request' });

            channels.getHistory('C0A1B2C34D', function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('invalid api request');
                done();
            });

        });
    });

    // function get(name, callback)
    describe('#getInfo', function () {

        it('should throw and error without a valid callback', function (done) {
            expect(function () {
                channels.getInfo(null);
            }).to.throw('callback must be a function');
            done();
        });

        it('should return an error to callback if missing required string argument', function (done) {

            channels.getInfo(null, function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('must supply valid argument(s)');
            });
            done();
        });

         it('should validate the passed channel id', function (done) {

            channels.getInfo('G0A1B2C34D', function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('invalid channel id');
            });
            done();
        });

        it('should return an api response to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.info')
                .reply(200, { ok: true });

            channels.getInfo('C0A1B2C34D', function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });
        });
        it('should return an api error to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.info')
                .reply(200, { ok: false, error: 'invalid api request' });

            channels.getInfo('C0A1B2C34D', function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('invalid api request');
                done();
            });

        });
    });

    // function get(name, callback)
    describe('#getList', function () {

        it('should throw and error without a valid callback', function (done) {
            expect(function () {
                channels.getList(null);
            }).to.throw('callback must be a function');
            done();
        });

        it('should return an api response to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.list')
                .reply(200, { ok: true });

            channels.getList(function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });
        });
        it('should return an api error to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.list')
                .reply(200, { ok: false, error: 'invalid api request' });

            channels.getList(function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('invalid api request');
                done();
            });

        });
    });

    // function get(name, callback)
    describe('#mark', function () {

        it('should return an error to callback if missing required string argument', function (done) {

            channels.mark(null, null, function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('must supply valid argument(s)');
            });
            done();
        });

        it('should return an api response to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.mark')
                .reply(200, { ok: true });

            channels.mark('C0A1B2C34D', 'timestamp', function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });
        });
        it('should return an api error to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.mark')
                .reply(200, { ok: false, error: 'invalid api request' });

            channels.mark('C0A1B2C34D', 'timestamp', function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('invalid api request');
                done();
            });

        });
    });

    // function get(name, callback)
    describe('#setPurpose', function () {

        it('should return an error to callback if missing required string argument', function (done) {

            channels.setPurpose(null, null, function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('must supply valid argument(s)');
            });
            done();
        });
        it('should return an api response to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.setPurpose')
                .reply(200, { ok: true });

            channels.setPurpose('C0A1B2C34D', 'purpose', function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });
        });
        it('should return an api error to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.setPurpose')
                .reply(200, { ok: false, error: 'invalid api request' });

            channels.setPurpose('C0A1B2C34D','purpose', function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('invalid api request');
                done();
            });

        });
    });

    // function get(name, callback)
    describe('#setTopic', function () {

        it('should return an error to callback if missing required string argument', function (done) {

            channels.setTopic(null, null, function (err, result) {
                expect(err).to.not.equal(null);
                expect(err.message).to.equal('must supply valid argument(s)');
            });
            done();
        });
        it('should return an api response to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.setTopic')
                .reply(200, { ok: true });

            channels.setTopic('C0A1B2C34D', 'topic', function (err, result) {
                expect(result).to.be.an('object');
                expect(result.ok).to.equal(true);
                done();
            });
        });
         it('should return an api error to caller', function (done) {

            var scope = nock('https://slack.com')
                .post('/api/channels.setTopic')
                .reply(200, { ok: false, error: 'invalid api request' });

            channels.setTopic('C0A1B2C34D','topic', function (err, result) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('invalid api request');
                done();
            });

        });
    });
});