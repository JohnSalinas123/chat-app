const Message = require("../models/Message")

const getMessages = async (req, res) => {

    const allMessages = await Message.find();

    if (!allMessages) {
        res.status(400).json();
    }

    res.status(200).json(allMessages);
}



module.exports = {
    getMessages,
}