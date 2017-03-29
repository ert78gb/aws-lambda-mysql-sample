"use strict";

const chai = require('chai');
const sinon = require('sinon');

const route = require('../../index');
const context = require('../aws-context');
const db = require('../db/index');
const UserRepository = require('../../src/repositories/user-repository');

chai.use(require('chai-as-promised'));
chai.use(require('chai-string'));
chai.use(require('chai-datetime'));

const expect = chai.expect;

describe('login test', () => {
  let saveUserSpy,
    findByEmailSpy,
    baseData = {
      email: 'a@a.hu',
      pwdHash: '$2a$15$Q2iLJL1zcne6PvtefYuG.uVdX9ET4o/OCf87d0ExkmEAn4gdE53YK'
    },
    savedUser
  ;

  beforeEach(() => {
    return db.cleaner.cleanAll()
      .then(() => {
        return new UserRepository().save(baseData);
      })
      .then((user) => {
        savedUser = user;
        initSpys();
        return Promise.resolve()
      })
  });

  afterEach(() => {
    restoreSpys();
  });

  function initSpys() {
    saveUserSpy = sinon.spy(UserRepository.prototype, 'save');
    findByEmailSpy = sinon.spy(UserRepository.prototype, 'findByEmail');
  }

  function restoreSpys() {
    saveUserSpy.restore();
    findByEmailSpy.restore();
  }

  it('success', function (done) {
    this.timeout(10000);

    let data = {
      email: baseData.email,
      password: "initPassword122!"
    };

    let requestDate = new Date();

    route.login(data, context, (err, response) => {
      response;

      expect(err).to.be.not.ok;
      expect(response.token).to.be.ok;
      expect(findByEmailSpy.callCount).to.be.equal(1);
      expect(saveUserSpy.callCount).to.be.equal(1);

      new UserRepository().findById(savedUser.id)
        .then((user) => {
          expect(user.lastLogonDate > requestDate).to.be.true;
          done();
        })
        .catch(error=>done(error))

    });
  });

  it('no e-emil address', (done) => {
    let data = {
      password: "initPassword122!"
    };

    route.login(data, context, (err, response) => {
      let result = JSON.parse(err);
      expect(response).to.be.not.ok;
      expect(result.httpStatus).to.be.equal(400);
      expect(result.name).to.be.equal('ValidationError');
      expect(result.message).to.be.equal('wrong_email');
      expect(findByEmailSpy.callCount).to.be.equal(0);
      expect(saveUserSpy.callCount).to.be.equal(0);
      done();
    });

  });

  it('no password', (done) => {
    let data = {
      email: baseData.email,
    };

    route.login(data, context, (err, response) => {
      let result = JSON.parse(err);
      expect(response).to.be.not.ok;
      expect(result.httpStatus).to.be.equal(400);
      expect(result.name).to.be.equal('ValidationError');
      expect(result.message).to.be.equal('wrong_password');
      expect(findByEmailSpy.callCount).to.be.equal(0);
      expect(saveUserSpy.callCount).to.be.equal(0);
      done();
    });

  });

  it('wrong e-mail', (done) => {
    let data = {
      email: 'b@g.com',
      password: "initPassword122!"
    };

    route.login(data, context, (err, response) => {
      let result = JSON.parse(err);
      expect(response).to.be.not.ok;
      expect(result.httpStatus).to.be.equal(400);
      expect(result.name).to.be.equal('ValidationError');
      expect(result.message).to.be.equal('wrong_username_password');
      expect(findByEmailSpy.callCount).to.be.equal(1);
      expect(saveUserSpy.callCount).to.be.equal(0);
      done();
    });

  });

  it('wrong password', function(done) {
    this.timeout(10000);

    let data = {
      email: baseData.email,
      password: "initPassword122!a"
    };

    route.login(data, context, (err, response) => {
      let result = JSON.parse(err);
      expect(response).to.be.not.ok;
      expect(result.httpStatus).to.be.equal(400);
      expect(result.name).to.be.equal('ValidationError');
      expect(result.message).to.be.equal('wrong_username_password');
      expect(findByEmailSpy.callCount).to.be.equal(1);
      expect(saveUserSpy.callCount).to.be.equal(0);
      done();
    });
  })
});
