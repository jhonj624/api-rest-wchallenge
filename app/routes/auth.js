const { Router } = require('express');

const { validateInputs } = require('../middlewares/validate_inputs');
const { loginValidator } = require('../validators/auth');

const authController = require('../controllers/auth');

const router = Router();

router.post('/login', validateInputs(loginValidator), authController.loginUser);

module.exports = router;
