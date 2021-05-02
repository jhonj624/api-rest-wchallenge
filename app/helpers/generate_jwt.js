const jwt = require('jsonwebtoken');

const jwtGenerator = (uid = '') => new Promise((resolve, reject) => {
  const payload = { uid };
  jwt.sign(payload, process.env.SECRETKEY, {
    expiresIn: '1d',
  }, (err, token) => {
    if (err) {
      reject(new Error('Token was not ganerate'));
    } else {
      resolve(token);
    }
  });
});

module.exports = {
  jwtGenerator,
};
