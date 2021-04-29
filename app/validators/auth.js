const { check } = require('express-validator');

const { validateJWT } = require('../validators/db_validators');

exports.loginValidator = [
    check('nickname', 'The nickname is required').not().isEmpty(),
    check('password', 'The password is required').notEmpty(),

];