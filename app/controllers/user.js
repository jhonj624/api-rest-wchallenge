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

    res.status(200).json({
        msg: "User created successfully",
        user
    });
}

module.exports = {
    createUser
}