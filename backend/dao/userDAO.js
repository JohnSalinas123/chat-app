const mongoose = require('mongoose');
const userModel = require('../models/User');


const createUser = (user) => {
    userModel.create(user)
}

const checkIfUserExists = (username) => {
    return userModel.exists({username: username});
}


module.exports = {
    createUser: createUser,
    checkIfUserExists: checkIfUserExists,
};
