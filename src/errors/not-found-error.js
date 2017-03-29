'use strict';

const AwsError = require('./aws-error');

class NotFoundError extends AwsError {
  constructor(context, message, extra) {
    super(context, message);
    this.httpStatus = 404;
    this.extra = extra;
  }
}

module.exports = NotFoundError;
