const User = require('../models/user');

const nicknameValidate = async(nickname = '') => {
    const nicknameExist = await User.findOne({ nickname });
    if (nicknameExist) {
        throw new Error(`Already exists an user with the nickname: ${nickname}`)
    }
}
module.exports = {
    nicknameValidate
}