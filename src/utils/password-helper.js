'use strict';

const bcrypt = require('bcrypt');

const environment = require('../environment');

function comparePassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, res) {
      if (err)
        return reject(err);

      return resolve(res);
    });
  })
}

exports.comparePassword = comparePassword;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, environment.user.saltRounds, function (err, hash) {
      if (err)
        return reject(err);

      return resolve(hash);
    });
  })
}


exports.hashPassword = hashPassword;
