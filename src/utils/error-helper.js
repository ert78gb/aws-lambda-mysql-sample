'use strict';
const ValidationError = require('../errors/validation-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const InternalServerError = require('../errors/internal-server-error');

function handleError (context, error){
  if (error.name === 'ValidationError')
    return JSON.stringify(error);

  if (error.name === 'Error' && error.code === 'ER_DUP_ENTRY')
    return JSON.stringify(new ValidationError(context, 'EntityAlreadyExists'));

  if (error.name === 'CustomError' && error.message === 'No Rows Updated')
    return JSON.stringify(new ValidationError(context, 'EntityNotFound'));

  if (error.name === 'UnauthorizedError' && error.code === 'credentials_required')
    return JSON.stringify(new UnauthorizedError(context, error.code));

  if (error.name === 'UnauthorizedError' && error.code === 'invalid_token')
    return JSON.stringify(new UnauthorizedError(context, error.code));

  if (error.name === 'EntityNotFoundError')
    return JSON.stringify(new NotFoundError(context, error));

  console.error(error);

  return  JSON.stringify(new InternalServerError(context, error));
}

exports.handleError = handleError;
