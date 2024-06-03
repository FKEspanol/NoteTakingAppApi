const Notes = require("../models/Notes");

//* Method: GET
//* URL: /notes/getAllNotes
const getAllNotes = async (req, res) => {
    try {
        const allNotes = await Notes.find({});
        res.status(200).json({ allNotes });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
//* Method: GET
//* URL: /notes/getOneNote
const getOneNote = async (req, res) => {
    try {
        const id = req.params.id;
        const foundNote = await Notes.findById(id);
        if (!foundNote) {
            res.status(404).json({ message: "Note not found" });
        } else {
            res.status(200).json({ foundNote });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//* Method: POST
//* URL: /notes/addNote
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
        const newlyAddedNote = await new Notes({
            category,
            title,
            noteBody,
        }).save();
        res.status(201).json({
            message: `A New note with a title of ${newlyAddedNote.title} has been added`,
            newlyAddedNote,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//* Method: PUT
//* URL: /notes/updateNote/:id
const updateNote = async (req, res) => {
    try {
        const reqBody = req.body;
        const id = req.params.id;

        const noteToUpdate = await Notes.findById(id);
        if (!noteToUpdate)
            return res.status(404).json({ message: "Note not found" });

        await Notes.findByIdAndUpdate(id, {
            $set: reqBody,
        });

        const updatedNote = await Notes.findById(id);
        res.status(201).json({
            message: `A note titled '${updatedNote.title}' has been updated`,
            updatedNote,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//* Method: DELETE
//* URL: /notes/deleteNote/:id
const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const noteToDelete = await Notes.findById(id);

        if (!noteToDelete)
            return res
                .status(404)
                .json({ message: "Note to delete not found" });

        const deletedNote = await Notes.findByIdAndDelete(id);
        res.status(200).json({
            message: `A note with a title of ${deletedNote.title} has been deleted`,
            deletedNote,
        });
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
