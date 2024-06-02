const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes/router");
const connectDB = require("./config/dbConfig");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/notes", router);

mongoose.connection.once("open", () => {
    const PORT = process.env.PORT || 7000;

    console.log("Connection to MongoDB Server is now open");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
