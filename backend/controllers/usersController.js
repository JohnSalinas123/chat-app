const User = require("../models/User");

async function registerUser(req, res) {
    
    const { username, password } = req.body;
    console.log(req.body)

    // check for empty fields
    if (!username || !password) {
        res.status(400).json({reason: "All fields required!" });
    }

    // check if user already exists
    const userExists = await User.findOne({username: username})
    if (userExists) {
        res.status(400).json({reason: "Username taken!"});
    }


    const newUser = await User.create({
        username: username,
        password: password,
    })

    if (newUser) {
        res.status(200).json(newUser)
    }



}

async function loginUser(req, res) {

    const { username,password } = req.body;

    // check for empty fields
    if (!username || !password) {
        res.status(400).json({reason: "All fields required"})
    }

}





module.exports = {
    registerUser,
    loginUser,
}