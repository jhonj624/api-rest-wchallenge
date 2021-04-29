const { Router } = require('express');

const coingeckoController = require('../controllers/coingecko');



const router = Router();

router.get('/list', coingeckoController.listCoins)

module.exports = router;