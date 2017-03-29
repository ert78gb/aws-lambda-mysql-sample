'use strict';

let config = require('../environment').db;

config.connection.typeCast = typeCast;

const knex = require('knex')(config);

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin('visibility');

module.exports = bookshelf;

function typeCast(field, next) {
  if (field.type === 'TINY' && field.length === 1) {
    return (field.string() === '1'); // 1 = true, 0 = false
  }
  return next();
}
