const { Router } = require('express');

const { validateInputs } = require('../middlewares/validate_inputs');
const {
  listCoinsValidator,
  addCoinsValidator,
  getTopCoinsValidator,
} = require('../validators/coingecko');

const coingeckoController = require('../controllers/coingecko');

const router = Router();

router.get('/list', validateInputs(listCoinsValidator), coingeckoController.getCoins);
router.post('/currencies', validateInputs(addCoinsValidator), coingeckoController.addCoins);
router.get('/top', validateInputs(getTopCoinsValidator), coingeckoController.getTopCoins);

module.exports = router;
