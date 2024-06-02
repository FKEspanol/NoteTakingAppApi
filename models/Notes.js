const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    category: {
        required: true,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
    noteBody: {
        required: true,
        type: String,
    },
});

const Notes = mongoose.model("notes", schema);

module.exports = Notes;
