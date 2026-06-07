import { connect } from '../lib/mongoose.js';
import Note from '../models/Note.js';

export default async function handler(req, res) {
  try {
    await connect();
  } catch (err) {
    return res.status(500).json({ error: 'DB connection error', details: String(err) });
  }

  const method = req.method;
  if (method === 'GET') {
    const notes = await Note.find().sort({ created_at: -1 }).limit(200).lean();
    return res.json(notes);
  }

  if (method === 'POST') {
    try {
      const payload = req.body;
      const note = new Note(payload);
      await note.save();
      return res.status(201).json(note);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid payload', details: String(err) });
    }
  }

  res.setHeader('Allow', 'GET,POST');
  return res.status(405).end('Method Not Allowed');
}
