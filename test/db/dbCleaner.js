'use strict';

const Promise = require('bluebird');
const User = require('../../src/db/user');
const UserRole = require('../../src/db/user-role');

exports.cleanAll = function cleanAll() {
  return Promise.all([
    cleanModel(new UserRole()),
    cleanModel(new User())
  ], {concurrency:1})
};

function cleanModel(model) {
  return model.fetchAll().then((result) => {
    let promises = result.models.map(entity => entity.destroy());
    return Promise.all(promises);
  });
}

exports.cleanModel = cleanModel;
