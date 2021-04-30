const { Router } = require('express');

const { validateInputs } = require('../middlewares/validate_inputs');
const { listCoinsValidator, addCoinsValidator } = require('../validators/coingecko')


const coingeckoController = require('../controllers/coingecko');

const router = Router();

router.get('/list', validateInputs(listCoinsValidator), coingeckoController.getCoins)
router.post('/currencies', validateInputs(addCoinsValidator), coingeckoController.addCoins);


module.exports = router;