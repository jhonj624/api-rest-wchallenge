const { check } = require('express-validator');


const { nicknameValidate } = require('../validators/db_validators');

const nicknameRegex = "^[a-zA-Z0-9]+$";

exports.createUserValidator = [
    check('nickname', 'Nickname must be unique').custom(nicknameValidate),
    check('name', 'The name is required').not().isEmpty(),
    check('lastname', 'The lastname is required').not().isEmpty(),
    check('password', 'The password must have at least 8 characters')
    .isLength({ min: 8 }),
    check('password', 'Password must be alphanumeric')
    .matches(nicknameRegex),
    check('coin', 'You must have a selected coin').not().isEmpty(),
    check('coin', 'Coin no identified').isIn(['EUR', 'USD', 'ARS'])
];