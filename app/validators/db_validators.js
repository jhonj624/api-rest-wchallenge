const User = require('../models/user');

const usernameValidate = async (username = '') => {
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    throw new Error(`Already exists an user with the username: ${username}`);
  }
};
module.exports = {
  usernameValidate,
};
