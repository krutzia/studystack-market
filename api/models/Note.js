import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  rating: Number,
  price: Number,
  pages: Number,
  subject: String,
  fileUrl: String,
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
