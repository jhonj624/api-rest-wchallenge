const User = require('../models/user');
const CryptoCurrency = require('../models/crypto_currency');

const usernameValidate = async (username = '') => {
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    throw new Error(`Already exists an user with the username: ${username}`);
  }
};

const cryptoCurrencieValidatorDB = async (id) => {
  const cryptocurrenciesDB = await CryptoCurrency.findOne({ iduser: id });
  if (!cryptocurrenciesDB) {
    // create cryptocurrencie on db
    const cryptocurrencies = new CryptoCurrency({ iduser: id });
    cryptocurrencies.ids = [];
    await cryptocurrencies.save();
    // save idcryptocurrencie to user
    // eslint-disable-next-line no-underscore-dangle
    await User.findByIdAndUpdate(id, { idcryptocurrencies: cryptocurrencies._id });
  }
};

module.exports = {
  usernameValidate,
  cryptoCurrencieValidatorDB,
};
