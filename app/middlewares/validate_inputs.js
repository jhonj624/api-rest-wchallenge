const { validationResult } = require('express-validator');

const validateInputs = (schema) => [
  schema,
  (req, res, next) => {
    // Errors validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    return next();
  },
];

module.exports = { validateInputs };
