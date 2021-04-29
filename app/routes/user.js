const { Router } = require('express');

const { validateInputs } = require('../middlewares/validate_inputs');
const { createUserValidator } = require('../validators/user');

const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const router = Router();

router.post('/users', validateInputs(createUserValidator), userController.createUser);


router.post('/login', authController.loginUser);

module.exports = router;