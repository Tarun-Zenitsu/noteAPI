import noteModel from '../models/note.js'

export const createNote = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    const newNote = new noteModel({
        title,
        description,
        userId: req.userId
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const updatedNote = {
        title,
        description,
        userId: req.userId
    };

    try {
        const updatedNoteFromDB = await noteModel.findByIdAndUpdate(id, updatedNote, { new: true });
        res.status(200).json(updatedNoteFromDB);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedNote = await noteModel.findOneAndDelete({ _id: id });
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(202).json(deletedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getNote = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
