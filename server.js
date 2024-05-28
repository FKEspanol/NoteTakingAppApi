const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT;

const router = require("./routes/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/notes", router);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
