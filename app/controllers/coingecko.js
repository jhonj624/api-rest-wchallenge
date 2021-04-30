const { response } = require('express');

// const CoinGecko = require('coingecko-api');

const coingeckoService = require('../services/coingecko');

const getCoins = async(req, res = response) => {

    const { per_page = 25, page = 1 } = req.query;
    console.log(req.user);
    const params = {
        vs_currency: req.user.coin.toLowerCase(),
        per_page,
        page,
    }
    console.log(params);

    try {
        const { finalList, total_coins } = await coingeckoService.getCoinsList(params);
        // console.log(data);
        return res.status(200).send({
            msg: "Cryptocurrencies successfully obtained",
            total_coins,
            finalList
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Contact system administrator' })
    }
}

module.exports = {
    getCoins
}