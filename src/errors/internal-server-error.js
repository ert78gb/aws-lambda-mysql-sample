'use strict';

const AwsError = require('./aws-error');

class InternalServerError extends AwsError {
  constructor(context, message) {
    super(context, message);
    this.httpStatus = 500;
  }
}

module.exports = InternalServerError;
