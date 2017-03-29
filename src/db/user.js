'use strict';

require('./user-role');

let bookshelf = require('./mysql-connection');

let User = bookshelf.model('User', {
  tableName: 'Users',
  idAttribute: 'id',
  hidden: ['pwdHash'],
  roles: function () {
    return this.hasMany('UserRole', 'userId')
  }
});

module.exports = User;
