const mongoose = require("mongoose");

var dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {

    const url = process.env.MONGO_URI;
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;