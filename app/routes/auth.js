const { Router } = require('express');

const { validarInputs } = require('../middlewares/validate_inputs');
const { loginValidator } = require('../validators/auth');

const { loginController } = require('../controllers/auth');

const router = Router();

router.post('/login', validarInputs(loginValidator), loginController);

module.exports = router;