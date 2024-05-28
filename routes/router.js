const router = require("express").Router();
const {
    getAllNotes,
    getOneNote,
    addNote,
    updateNote,
    deleteNote,
    getCodingNotes,
    getRandomNotes,
} = require("../controller/controller");

router.get("/getAllNotes", getAllNotes);
router.get("/getOneNote/:id", getOneNote);
router.get("/getCodingNotes", getCodingNotes);
router.get("/getRandomNotes", getRandomNotes);
router.post("/addNote", addNote);
router.put("/updateNote/:id", updateNote);
router.delete("/deleteNote/:id", deleteNote);

module.exports = router;
