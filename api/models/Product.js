import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  verified: Boolean,
  college: String,
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  original_price: Number,
  category: String,
  condition: String,
  image: String,
  seller: SellerSchema,
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
