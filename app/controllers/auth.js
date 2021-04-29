const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { jwtGenerator } = require('../helpers/generate_jwt');

const loginUser = async(req, res = response) => {

    const { nickname, password } = req.body;

    try {
        // Verify nickname
        const user = await User.findOne({ nickname });
        if (!user) return res.status(400).json({ msg: 'Nickname/Password incorrects' });

        // Verify user state
        if (!user.state) return res.status(400).json({ msg: 'Nickname/Password incorrects' });

        // Verify password
        const validatePassword = bcrypt.compareSync(password, user.password);
        if (!validatePassword) return res.status(400).json({ msg: 'Nickname/Password incorrects' });

        // Generate JWT
        const token = await jwtGenerator(user.id);

        res.status(200).json({
            msg: "Login successfully",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Contact system administrator' })
    }
}

module.exports = {
    loginUser
}