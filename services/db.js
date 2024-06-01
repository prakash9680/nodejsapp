const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log("connected to database.");
    } catch (error) {
        console.log("could not connect to database", error);
    }
};