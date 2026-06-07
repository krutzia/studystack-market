import { connect } from '../lib/mongoose.js';
import Product from '../models/Product.js';

export default async function handler(req, res) {
  try {
    await connect();
  } catch (err) {
    return res.status(500).json({ error: 'DB connection error', details: String(err) });
  }

  const method = req.method;
  if (method === 'GET') {
    const products = await Product.find().sort({ created_at: -1 }).limit(200).lean();
    return res.json(products);
  }

  if (method === 'POST') {
    try {
      const payload = req.body;
      const product = new Product(payload);
      await product.save();
      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid payload', details: String(err) });
    }
  }

  res.setHeader('Allow', 'GET,POST');
  return res.status(405).end('Method Not Allowed');
}
