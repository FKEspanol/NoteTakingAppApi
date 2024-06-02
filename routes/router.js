const router = require("express").Router();
const {
    getAllNotes,
    getOneNote,
    addNote,
    updateNote,
    deleteNote,
} = require("../controller/controller");

router.get("/getAllNotes", getAllNotes);
router.get("/getOneNote/:id", getOneNote);

router.post("/addNote", addNote);
router.put("/updateNote/:id", updateNote);
router.delete("/deleteNote/:id", deleteNote);

module.exports = router;
