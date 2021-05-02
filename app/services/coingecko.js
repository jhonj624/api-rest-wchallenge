const CoingeckoApi = require('coingecko-api');

const User = require('../models/user');

const getCoinsList = async (params) => {
  const coingeckoClient = new CoingeckoApi();

  // get all ids - coins
  const { data } = await coingeckoClient.coins.list();
  const listIds = [];
  data.forEach((coin) => {
    if ((coin.id)) listIds.push(coin.id);
  });

  const paramsQuery = params;
  paramsQuery.ids = { listIds };

  // consulting api
  const response = await coingeckoClient.coins.markets(paramsQuery);

  // filtering data
  const finalList = response.data.map((res) => ({
    id: res.id,
    symbol: res.symbol,
    current_price: res.current_price,
    name: res.name,
    image: res.image,
    last_updated: res.last_updated,
  }));

  return ({
    totalCoins: listIds.length,
    finalList,
  });
};

const descendente = (key) => (a, b) => b[key] - a[key];
const ascendente = (key) => (a, b) => a[key] - b[key];

const getTopCoins = async (ids, top, order = 'DESC', iduser) => {
  const coingeckoClient = new CoingeckoApi();

  // eslint-disable-next-line no-nested-ternary
  const topN = (ids.length > 25) ? top : (top < ids.length) ? top : ids.length;

  const paramsEUR = {
    ids,
    vs_currency: 'eur',
  };
  const paramsARS = {
    ids,
    vs_currency: 'ars',
  };
  const paramsUSD = {
    ids,
    vs_currency: 'usd',
  };

  // const response = await coingeckoClient.coins.markets(paramsARS);

  const [dataEUR, dataARS, dataUSD] = await Promise.all([
    coingeckoClient.coins.markets(paramsEUR),
    coingeckoClient.coins.markets(paramsARS),
    coingeckoClient.coins.markets(paramsUSD),
  ]);

  // Mixing and filtering data
  let listCurrencies = dataARS.data.map((currencyArs, index) => ({
    id: currencyArs.id,
    symbol: currencyArs.symbol,
    current_price_ars: currencyArs.current_price,
    current_price_usd: dataUSD.data[index].current_price,
    current_price_eur: dataEUR.data[index].current_price,
    name: currencyArs.name,
    image: currencyArs.image,
    last_updated: currencyArs.last_updated,
  }));

  const user = await User.findById(iduser);

  const userCoin = user.coin.toLowerCase();

  if (order === 'DESC') {
    listCurrencies = listCurrencies
      .sort(descendente(`current_price_${userCoin}`))
      .slice(0, topN);
  } else {
    listCurrencies = listCurrencies
      .sort(ascendente(`current_price_${userCoin}`))
      .slice(0, topN);
  }

  return listCurrencies;
};

module.exports = {
  getCoinsList,
  getTopCoins,
};
