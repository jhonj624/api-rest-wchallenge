const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate_jwt');

exports.listCoinsValidator = [
    validateJWT,
];