import { connect } from '../lib/mongoose.js';
import Product from '../models/Product.js';

export default async function handler(req, res) {
  try {
    await connect();
  } catch (err) {
    return res.status(500).json({ error: 'DB connection error', details: String(err) });
  }

  const { id } = req.query || req.params || {};
  const method = req.method;

  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (method === 'GET') {
    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.json(product);
  }

  if (method === 'PUT') {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Not found' });
    return res.json(updated);
  }

  if (method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET,PUT,DELETE');
  return res.status(405).end('Method Not Allowed');
}
