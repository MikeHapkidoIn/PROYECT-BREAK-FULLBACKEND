const mongoose = require('mongoose');
const size = ['XS', 'S', 'M', 'L', 'XL'];  // enum de talles
const ProductSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, enum: size, required: true },
  price: { type: Number, required: true, min: 0 }
}, {timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
module.exports.size = size;   // exportado solo si lo necesitas en otros archivos

