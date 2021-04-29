//1. Import coingecko-api
const CoinGecko = require('coingecko-api');



const listCoins = async(req, res) => {
    // //2. Initiate the CoinGecko API Client
    const CoinGeckoClient = new CoinGecko();
    // //3. Make calls
    let data;
    try {
        data = await CoinGeckoClient.ping();
    } catch (error) {
        console.log(object);
    }

    res.json({
        "msg": "aca vamos",
        data
    })
}



module.exports = {
    listCoins
}