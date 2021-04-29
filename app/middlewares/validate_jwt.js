const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async(req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        const { nickname } = jwt.verify(token, process.env.SECRETKEY);

        // get the user by the nickname
        const user = await User.findOne(nickname);

        if (!user) {
            return res.status(401).json({
                msg: 'User was not found'
            })
        }

        // State must be state:true
        if (!user.state) {
            return res.status(401).json({
                msg: 'User was not found'
            })
        }

        req.user = user;
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}

module.exports = {
    validarJWT
}