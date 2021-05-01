const { check } = require('express-validator');

exports.loginValidator = [
  check('username', 'The username is required').not().isEmpty(),
  check('password', 'The password is required').notEmpty(),

];
