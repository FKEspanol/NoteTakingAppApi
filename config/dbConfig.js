const mongoose = require("mongoose");

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;
