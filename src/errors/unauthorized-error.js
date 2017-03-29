'use strict';

const AwsError = require('./aws-error');

class UnauthorizedError extends AwsError {
  constructor(context, message) {
    super(context, message);
    this.httpStatus = 403;
  }
}

module.exports = UnauthorizedError;
