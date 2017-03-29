'use strict';

const AwsError = require('./aws-error');

class ValidationError extends AwsError {
  constructor(context, message, extra) {
    super(context, message);
    this.httpStatus = 400;
    this.extra = extra;
  }
}

module.exports = ValidationError;
