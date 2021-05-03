const { response } = require('express');
const CoingeckoApi = require('coingecko-api');

const CryptoCurrency = require('../models/crypto_currency');
const utils = require('../helpers/utils');

// const CoinGecko = require('coingecko-api');

const coingeckoService = require('../services/coingecko');
const { cryptoCurrencieValidatorDB } = require('../validators/db_validators');

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
  // eslint-disable-next-line no-underscore-dangle
  const iduser = req.user._id;
  await cryptoCurrencieValidatorDB(iduser);

  const cryptocurrenciesDB = await CryptoCurrency.findOne({ iduser });

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
    // eslint-disable-next-line array-callback-return
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
  const { order } = req.query;
  const { top } = req.query;

  // eslint-disable-next-line no-underscore-dangle
  const iduser = req.user._id;

  await cryptoCurrencieValidatorDB(iduser);

  // get list of cryptos
  const cryptocurrenciesDB = await CryptoCurrency.findOne({ iduser });

  const { ids } = cryptocurrenciesDB;

  if (!ids.length) return res.status(204).send({ msg: 'No Content to list' });

  try {
    const topList = await coingeckoService.getTopCoins(ids, top, order, iduser);
    // console.log(data);
    return res.status(200).send({
      msg: 'Cryptocurrencies top were successfully obtained',
      total_coins: ids.length,
      top_list: topList,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Contact system administrator' });
  }
};

module.exports = {
  getCoins,
  addCoins,
  getTopCoins,

};
