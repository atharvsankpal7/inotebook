const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// endpoint --> /api/notes/getallnotes. Login required
router.get("/getallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
});

// endpoint --> /api/notes/addnote. Login required
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Please enter the title").trim().isLength({ min: 1 }),
        body("description", "Please enter valid description")
            .trim()
            .isLength({ min: 1 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(400).json({ errors });
        }
        const newNote = new Notes({
            user:req.user.id,
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            date: Date.now()
        })
        const savedNote = await newNote.save();



        res.send(savedNote);
    }
);

module.exports = router;
