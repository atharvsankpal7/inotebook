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
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      date: Date.now(),
    });
    const savedNote = await newNote.save();

    res.send(savedNote);
  },
);

// endpoint --> /api/notes/updatenote. Login required
router.put(
  "/updatenote/:id",fetchuser,async (req, res) => {
      const {title, description,tag} =req.body;
      const newNote = {};
      
      if(title) newNote.title = title;
      if(description) newNote.description = description;
      if(tag) newNote.tag = tag;
      let note = await Notes.findById(req.params.id);
      if(!note){
          res.status(400).send("Note not found");
      }
      
      if(note.user.toString() !== req.user.id){
          res.status(401).send("Unautheticated user");
      }

      note = await Note.findByIdAndUpdate(req.params.id, newNote, {new: true});
  })

module.exports = router;
