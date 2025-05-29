const mongoose = require('mongoose');
const size = ['XS', 'S', 'M', 'L', 'XL'];  // enum de talles
const categories = ["Camisetas", "Pantalones", "Zapatos", "Accesorios"]
const ProductSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: categories, required: true },
  size: { type: String, enum: size, required: true },
  price: { type: Number, required: true, min: 0 }
}, {timestamps: true });

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  sizes,
  categories
};