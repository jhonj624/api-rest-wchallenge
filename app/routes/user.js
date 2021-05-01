const { Router } = require('express');

const { validateInputs } = require('../middlewares/validate_inputs');
const { createUserValidator } = require('../validators/user');

const userController = require('../controllers/user');

const router = Router();

router.post('/users', validateInputs(createUserValidator), userController.createUser);

module.exports = router;
