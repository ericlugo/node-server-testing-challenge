const router = require('express').Router();
const Notes = require('../models/note-model.js');

router.get('/', async (req, res) => {
  try {
    const notes = await Notes.find();
    notes
      ? res.status(200).json({
          success: true,
          message: `Notes retrieved.`,
          notes,
        })
      : res.status(400).json({
          success: false,
          message: `Unable to retrieve notes.`,
        });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

router.post('/', async (req, res) => {
  const pendingNote = req.body;

  if (!pendingNote.name) {
    res.status(400).json({
      success: false,
      message: `'name' is a required field for all new notes.`,
    });
  } else {
    try {
      const note = await Notes.insert(pendingNote);

      note &&
        res.status(201).json({
          success: true,
          message: `Note successfully created.`,
          note,
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Fatal Error.\n${err}`,
      });
    }
  }
});

router.get('/:id', async (req, res) => {
  const [id] = req.params.id;

  try {
    const note = await Notes.find(id);
    note
      ? res.status(200).json({
          success: true,
          message: `Note retrieved.`,
          note,
        })
      : res.status(400).json({
          success: false,
          message: `Unable to retrieve note.`,
        });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const [id] = req.params.id;

  try {
    const deletedNote = await Notes.remove(id);
    deletedNote
      ? res.status(200).json({
          success: true,
          message: `Note deleted.`,
          deletedNote,
        })
      : res.status(400).json({
          success: false,
          message: `Unable to delete note.`,
        });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

module.exports = router;
