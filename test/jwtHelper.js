const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const secret = 'secret';

exports.getToken = function getToken(user) {
  let token = jwt.sign(user, secret, {expiresIn: '1d'});
  return 'Bearer ' + token;
};

exports.ejwt = ejwt({secret: secret});
