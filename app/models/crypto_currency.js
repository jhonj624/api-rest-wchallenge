const { Schema, model } = require('mongoose');

const CryptoCurrencySchema = Schema({
  iduser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ids: {
    type: Array,
    default: [],
  },
});

module.exports = model('CryptoCurrency', CryptoCurrencySchema);
