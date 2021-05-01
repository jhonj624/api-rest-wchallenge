const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'The lastname is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'The username is required'],
  },
  password: {
    type: String,

    required: [true, 'The password is required'],
  },
  coin: {
    type: String,
    required: true,
    enum: ['EUR', 'USD', 'ARS'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  idcryptocurrencies: {
    type: Schema.Types.ObjectId,
    ref: 'CryptoCurrency',
    default: null,
  },
});

module.exports = model('User', UserSchema);
