const { response } = require('express');
const CoingeckoApi = require('coingecko-api');

const CryptoCurrency = require('../models/crypto_currency');
const User = require('../models/user');
const utils = require('../helpers/utils');

// const CoinGecko = require('coingecko-api');

const coingeckoService = require('../services/coingecko');
const { collection } = require('../models/crypto_currency');

const getCoins = async (req, res = response) => {
  const { per_page = 25, page = 1 } = req.query;
  const params = {
    vs_currency: req.user.coin.toLowerCase(),
    per_page,
    page,
  };

  try {
    const { finalList, totalCoins } = await coingeckoService.getCoinsList(params);
    // console.log(data);
    return res.status(200).send({
      msg: 'Cryptocurrencies successfully obtained',
      totalCoins,
      finalList,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Contact system administrator' });
  }
};

const addCoins = async (req, res = response) => {
  const coingeckoClient = new CoingeckoApi();
  // validate cryptocurrencies collection

  let cryptocurrenciesDB = await CryptoCurrency.findOne(iduser = req.user_id);
  if (!cryptocurrenciesDB) {
    // create cryptocurrencie on db
    const cryptocurrencies = new CryptoCurrency({ iduser: req.user._id });
    await cryptocurrencies.save();
    // save idcryptocurrencie to user
    await User.findByIdAndUpdate(req.user._id, { idcryptocurrencies: cryptocurrencies._id });
  }

  cryptocurrenciesDB = await CryptoCurrency.findOne(iduser = req.user._id);

  const idsCoinsOld = cryptocurrenciesDB.ids;
  const idsCoinsNew = req.body.ids;

  // cryptomonedas soportadas
  const cryptoCoinsList = await coingeckoClient.coins.list();

  const idsCoinsValidated = idsCoinsNew.map(
    (id) => cryptoCoinsList.data.filter((crypto) => crypto.id === id)[0],
  );

  const idsCoinsRejected = [];
  const idsCoinsAccepted = [];
  idsCoinsValidated.filter(
    (value, index) => {
      if (!value) {
        idsCoinsRejected.push(idsCoinsNew[index]);
      } else {
        idsCoinsAccepted.push(value.id);
      }
    },
  );

  const ids = utils.deleteDuplicate(idsCoinsOld.concat(idsCoinsAccepted));

  cryptocurrenciesDB.ids = ids;

  await cryptocurrenciesDB.save();

  res.status(200).json({
    msg: 'Crypto currencies successfully added',
    coins_saved: idsCoinsAccepted,
    coins_rejected: idsCoinsRejected,
    coins_stored: ids,

  });
};

const getTopCoins = async (req, res = response) => {
  
  // get list of crytos
  const cryptocurrenciesDB = await CryptoCurrency.findOne(iduser = req.user._id);

console.log(cryptocurrenciesDB.ids);

  res.status(200).json({
    msg: ' Top crypto currencies successfully obtained',
  });
};

module.exports = {
  getCoins,
  addCoins,
  getTopCoins,

};
