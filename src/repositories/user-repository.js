'use strict';

const Promise = require('bluebird');

const User = require('../db/user');

class UserRepository {

  save(user) {

    if (user.id)
      return this.update(user);

    return this.insert(user);
  }

  insert(user) {
    return new User(user).save();
  }

  update(user) {
    let data = Object.assign({}, user);
    delete data.id;

    return new User({id: user.id}).save(data, {patch: true});
  }

  findById(id) {

    let where = {
      id
    };

    return new User().where(where).fetch()
      .then((result) => {
        if (result)
          return Promise.resolve(result.attributes);

        return Promise.resolve();
      })
  }

  findByEmail(email) {
    let where = {
      email
    };

    return new User().where(where).fetch()
      .then((result) => {
        if (result)
          return Promise.resolve(result.attributes);

        return Promise.resolve();
      })
  }
}

module.exports = UserRepository;
