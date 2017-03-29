'use strict';

require('./user');

let bookshelf = require('./mysql-connection');

let UserRole = bookshelf.model('UserRole', {
  tableName: 'User_Roles',
  idAttribute: 'id',
  user: function () {
    return this.belongsTo('User', 'userId');
  }
});

module.exports = UserRole;
