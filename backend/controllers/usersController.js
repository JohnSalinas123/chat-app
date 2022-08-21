const User = require("../models/User");
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    
    const { username, password } = req.body;
    console.log(username + " " + password)

    // check for empty fields
    if (!username || !password) {
        res.status(400).json({message: "All fields required!" });
        return;
    }

    // check if user already exists
    const userExists = await User.findOne({username: username})
    if (userExists) {
        res.status(400).json({message: "Username taken!"});
        return;
    }

    const newUser = await User.create({
        username: username,
        password: password,
    })

    if (newUser) {

        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
        })
    } else {
        res.status(400).json({message: "Failed to create user!"});

    }



}

async function loginUser(req, res) {

    const { username,password } = req.body;

    // check for empty fields
    if (!username || !password) {
        res.status(400).json({message: "All fields required"});
        return;
    }

    // check if user exists
    const user = await User.findOne({username: username});
    if (!user) {
        res.status(400).json({message: "User not found!"});
        return;
    }

    // check if password is correct

    bcrypt.compare(password, user.password, (err, valid) => {
        if (err) {
            res.status(400).json({message: "Password error!"});
            return;
        }

        if (!valid) {
            res.status(400).json({message: "Invalid password!"});
            return;
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
        })
        return;

    });

}

module.exports = {
    registerUser,
    loginUser,
}