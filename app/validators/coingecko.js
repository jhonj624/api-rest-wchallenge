const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate_jwt');

exports.listCoinsValidator = [
    validateJWT,
];

exports.addCoinsValidator = [
    validateJWT,
    check('ids', 'Insert at least one crypto currencie id').not().isEmpty()
]