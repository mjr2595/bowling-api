// dependencies
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/config');
var mongoose = require('mongoose');


describe('Test Suite for Bowling API', function() {
  var url = config.test_url + ':' + config.port;

  describe('Test for adding a new User ', function() {
    it('should add a user', function(done) {
      var profile = {
        id:4,
        name:"michael"
      };

      request(url)
      .post('/addUser')
      .send(profile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        done();
      });
    });

    it('should fail to add duplicate user', function(done) {
      var profile = {
        id:4,
        name:"michael"
      };

      request(url)
      .post('/addUser')
      .send(profile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(400);
        done();
      });
    });

  });


  describe('Testing the play function ', function() {
    it('should return the running score of the user', function(done) {
      var profile = {
        id:4,
        score:'x'
      };

      request(url)
      .post('/play')
      .send(profile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        res.body.score.should.equal(10);

        done();
      });
    });

    it('should fail if incorrect user id is provided', function(done) {
      var profile = {
        id:9,
        score:'x'
      };

      request(url)
      .post('/play')
      .send(profile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(400);

        done();
      });
    });


    it('should fail if invalid string is passed as value of throw', function(done) {
      var profile = {
        id:4,
        score:'a'
      };

      request(url)
      .post('/play')
      .send(profile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(400);

        done();
      });
    });

    it('should update score of existing user based on value of the current throw', function(done) {
      var profile = {
        id:4,
        score:'2'
      };

      request(url)
      .post('/play')
      .send(profile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        res.body.score.should.equal(14);

        done();
      });
    });

  });

  describe('Testing the score function ', function() {
    it('should return correct score and username of user ', function(done) {

      request(url)
      .get('/score/4')
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        res.body.score.should.equal(14);
        res.body.user_name.should.equal('michael');
        done();
      });
    });

    it('should throw an error if user does not exist', function(done) {

      request(url)
      .get('/score/6')
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        done();
      });
    });

  });

  describe('Test for deleting existing User ', function() {
    it('should delete a user', function(done) {
      var profile = {
        id:4
      };

      request(url)
      .delete('/deleteUser')
      .send(profile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        done();
      });
    });

  });

});
