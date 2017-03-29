'use strict';

const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const User = require('../db/user');
const environment = require('../environment');

function getToken(id, trx) {
  const where = {
    id: id
  };

  return new User().where(where).fetch({withRelated:['roles'], transacting: trx})
    .then((user) => {
      let token = jwt.sign(user.toJSON(), environment.app.secure.jwt, {expiresIn: "24h"});

      return Promise.resolve(token);
    })

}

module.exports.getToken = getToken;
