'use strict';

class AwsError extends Error {
  constructor(context, message) {
    super();
    this.requestId = context.awsRequestId;
    this.name = this.constructor.name;
    this.message = message;
  }
}

module.exports = AwsError;
