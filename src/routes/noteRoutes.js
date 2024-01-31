import express from 'express';
import { createNote, deleteNote, getNote, updateNote } from '../controllers/notecontrollers.js';
import { auth } from '../middilewares/auth.js';

const noteRoute = express.Router();

noteRoute.get('/', auth, getNote);

noteRoute.post('/', auth, createNote);

noteRoute.delete('/:id', auth, deleteNote);

noteRoute.put('/:id', auth, updateNote); 

export default noteRoute;