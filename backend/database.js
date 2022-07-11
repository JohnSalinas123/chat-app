const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.CHAT_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to mongodb!");
    } catch (error) {
        console.log(error);
    }

}

module.exports = dbConnect;