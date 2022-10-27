const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    };
};

module.exports = { getAllUsers }