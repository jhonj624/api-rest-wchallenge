const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


const createUser = async(req, res = response) => {

    const userInput = req.body;
    const user = new User(userInput);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(userInput.password, salt);

    // Save to DB
    await user.save();

    res.json({
        "msg": "Post API - Create User",
        user
    });
}

const loginUser = async(req, res = response) => {

    const { nickname, password } = req.body;
    res.json({
        msg: "Post API - Login",
        nickname,
        password
    })
}

module.exports = {
    createUser,
    loginUser
}