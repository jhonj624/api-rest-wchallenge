const { check } = require('express-validator');

const { usernameValidate } = require('./db_validators');

const usernameRegex = '^[a-zA-Z0-9]+$';

exports.createUserValidator = [
  check('username', 'username is required').not().isEmpty(),
  check('username', 'Username must be unique').custom(usernameValidate),
  check('name', 'The name is required').not().isEmpty(),
  check('lastname', 'The lastname is required').not().isEmpty(),
  check('password', 'The password must have at least 8 characters')
    .isLength({ min: 8 }),
  check('password', 'Password must be alphanumeric')
    .matches(usernameRegex),
  check('coin', 'You must have a selected coin').not().isEmpty(),
  check('coin', 'Coin no identified').isIn(['EUR', 'USD', 'ARS']),
];
