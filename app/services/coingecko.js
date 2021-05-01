const CoingeckoApi = require('coingecko-api');

const getCoinsList = async (params = {}) => {
  const coingeckoClient = new CoingeckoApi();

  // get all ids - coins
  const { data } = await coingeckoClient.coins.list();
  const listIds = new Array();
  data.forEach((coin) => {
    if ((coin.id)) listIds.push(coin.id);
  });
  params.ids = { listIds };

  // consulting api
  const response = await coingeckoClient.coins.markets(params);

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

module.exports = {
  getCoinsList,
};
