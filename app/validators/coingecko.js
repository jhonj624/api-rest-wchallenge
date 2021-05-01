const { response } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate_jwt');
const { topIsOk } = require('./util_validators');

exports.listCoinsValidator = [
  validateJWT,
];

exports.addCoinsValidator = [
  validateJWT,
  check('ids', 'Insert at least one crypto currencie id').not().isEmpty(),
  check('ids', 'The ids must be an Array vector').isArray(),
];

exports.getTopCoinsValidator = [
  validateJWT,
  check('top', 'Must be numeric (1 - 25)').custom(topIsOk),
  check('order', ' Select and option between ASC or DESC')
    .isIn(['ASC', 'DESC', '']),

];
