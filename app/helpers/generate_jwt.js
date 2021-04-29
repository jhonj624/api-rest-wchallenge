const jwt = require('jsonwebtoken');

const jwtGenerator = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '1d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token was not ganerate')

            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    jwtGenerator,
}