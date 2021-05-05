const { userSchema } = require('./user');
const { cryptoCurrencyShema } = require('./crypto_currency');

module.exports = {
  userModel: userSchema,
  currencyModel: cryptoCurrencyShema,
};
