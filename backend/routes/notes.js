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
                res.status(400).json({ errors });
                return; // Important: Add a return statement to exit the function here
            }
            const newNote = new Notes({
                user: req.user.id,
                baseImage: req.body.baseImage,
                title: req.user.id,
                date: Date.now(),
            });
            const savedNote = await newNote.save();
            // let base64Image = req.body.baseImage.split(",")[1];
            // await fetch("http://192.168.29.106:4000/predict", {
            //     method: "POST",
            //     body: JSON.stringify({
            //         baseImage: base64Image,
            //         id: savedNote._id,
            //     }),
            // }).then((response) => response.json());
            res.send(savedNote);
        } catch (e) {
            res.status(500).send("database connectivity error");
        }
    }
);

// endpoint --> /api/notes/updatenote. Login required
router.put("/updatenote/:id", async (req, res) => {
    try {
        const { description, tag, maskedImage } = req.body;
        const newNote = {};

        // check for updated parameters
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        if (maskedImage) newNote.maskedImage = maskedImage;

        // Find the note by id provided in the url
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(400).send("Note not found");
        }

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
        // Find the note in the database
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("note not found");
        }
        // If the logged-in user doesn't own the note
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Unauthenticated user");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.send("note deleted successfully");
    } catch (e) {
        res.send("database connectivity error");
    }
});

module.exports = router;
