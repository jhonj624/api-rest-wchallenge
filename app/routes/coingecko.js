const { Router } = require('express');

const { validateInputs } = require('../middlewares/validate_inputs');
const { listCoinsValidator } = require('../validators/coingecko')


const coingeckoController = require('../controllers/coingecko');

const router = Router();

router.get('/list', validateInputs(listCoinsValidator), coingeckoController.getCoins)

module.exports = router;