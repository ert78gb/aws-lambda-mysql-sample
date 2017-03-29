'use strict';

const validator = require('validator');

const ValidationError = require('./src/errors/validation-error');
const UserRepository = require('./src/repositories/user-repository');
const environment = require('./src/environment');
const jwtHelper = require('./src/utils/jwt-helper');
const passwordHelper = require('./src/utils/password-helper');
const errorHelper = require('./src/utils/error-helper');

exports.login = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!event.email || !validator.isEmail(event.email))
    return callback(JSON.stringify(new ValidationError(context, 'wrong_email')));

  if (!event.password || !environment.user.passwordPattern.test(event.password))
    return callback(JSON.stringify(new ValidationError(context, 'wrong_password')));

  let userRepo = new UserRepository();
  let userId;

  userRepo.findByEmail(event.email)
    .then((user) => {
      if (!user)
        throw new ValidationError(context, 'wrong_username_password');

      userId = user.id;
      return passwordHelper.comparePassword(event.password, user.pwdHash);
    })
    .then((match) => {
      if (!match)
        throw new ValidationError(context, 'wrong_username_password');

      let data = {
        id: userId,
        lastLogonDate: new Date()
      };

      return userRepo.save(data);
    })
    .then(() => {
      return jwtHelper.getToken(userId)
    })
    .then((token) => {
      return callback(null, {token});
    })
    .catch((error) => {
      return callback(errorHelper.handleError(context, error));
    })
};
