const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// endpoint --> /api/notes/getallnotes. Login required
router.get("/getallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
});

// endpoint --> /api/notes/addnote. Login required
router.post(
    "/addnote",
    fetchuser,
    [
        body("baseImage", "Please enter the baseImage")
            .trim()
            .isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.send(400).json({ errors });
            }
            const newNote = new Notes({
                user: req.user.id,
                baseImage: req.body.baseImage,
                date: Date.now(),
            });
            const savedNote = await newNote.save();

            res.send(savedNote);
        } catch (e) {
            res.status(500).send("database connectivity error");
        }
    }
);

// endpoint --> /api/notes/updatenote. Login required
router.put("/updatenote/:id", async (req, res) => {
    try {
        const { baseImage, description, tag, maskedImage } = req.body;
        const newNote = {};

        // check for updated parameters
        if (baseImage) newNote.baseImage = baseImage;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        if (maskedImage) newNote.maskedImage = maskedImage;

        // Find the note by id provided in the url
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(400).send("Note not found");
        }

        // // If logged in user don't own the Note
        //  if (note.user.toString() !== req.user.id) {
        //     res.status(401).send("Unautheticated user");
        // }

        // Updation success
        //findByIdAndUpdate(note_to_be_updated, what_should_be_updated,if_new_parameters_are_updated_add_them)
        note = await Notes.findByIdAndUpdate(req.params.id, newNote, {
            new: true,
        });
        res.json(note);
    } catch (e) {
        res.status(500).send("database connectivity error");
        console.log("database connectivity error");
    }
});

// endpoint --> api/notes/deletenote/id
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note in database
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("note not found");
        }
        // If logged in user don't own the Note
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Unautheticated user");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.send("note deleted successfully");
    } catch (e) {
        res.send("database connectivity error");
    }
});



module.exports = router;
