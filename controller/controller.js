const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
let notesData = require("../data/notes.json");

const dbPath = path.join(__dirname, "../data", "notes.json");

//* Method: GET
//* /notes/getAllNotes
const getAllNotes = (req, res) => {
    try {
        res.status(200).json(notesData);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getOneNote = (req, res) => {
    try {
        const id = req.params.id;
        const note = notesData.find((note) => note.id === id);
        console.log(note);
        if (!note) {
            res.status(404).json({ message: "Note not found" });
        } else {
            res.status(200).json(note);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addNote = async (req, res) => {
    try {
        let errors = [];

        const { category, title, noteBody } = req.body;

        !category
            ? errors.push({ name: "category", message: "Category is required" })
            : !title
            ? errors.push({ name: "Title", message: "Title is required" })
            : !noteBody
            ? errors.push({ name: "noteBody", message: "noteBody is required" })
            : "";

        if (errors.length) return res.status(400).json(errors);
        notesData.push({ id: uuid(), category, title, noteBody });
        await fsPromise.writeFile(
            dbPath,
            JSON.stringify(notesData, null, 2),
            "utf-8"
        );
        res.status(201).json({
            message: `A note titled '${title}' has been added`,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const updateNote = async (req, res) => {
    try {
        const reqBody = req.body;
        const id = req.params.id;

        let indexNum = 0;

        const foundNote = notesData.find((note, index) => {
            if (note.id === id) {
                indexNum = index;
                return note;
            }
        });

        if (!foundNote)
            return res.status(404).json({ message: "Note not found" });
        notesData[indexNum] = reqBody;
        await fsPromise.writeFile(
            dbPath,
            JSON.stringify(notesData, null, 2),
            "utf-8"
        );
        res.status(201).json({
            message: `A note titled '${reqBody.title}' has been updated`,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;

        const noteToDelete = notesData.find((note) => note.id == id);
        // console.log("Deleted Note: ", noteToDelete);
        if (!noteToDelete)
            return res
                .status(404)
                .json({ message: "Note to delete not found" });
        const updatedData = notesData.filter((note) => note.id !== id);
        console.log(notesData);
        fs.writeFile(
            dbPath,
            JSON.stringify(updatedData, null, 2),
            "utf-8",
            (error) => {
                if (error) throw error;
                notesData = updatedData;
                res.status(201).json({
                    message: `A note titled '${noteToDelete.title}' has been deleted`,
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = {
    getAllNotes,
    getOneNote,
    addNote,
    updateNote,
    deleteNote,
};
