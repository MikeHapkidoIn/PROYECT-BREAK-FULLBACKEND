const mongoose = require('mongoose');
const sizes = ['xs', 's', 'm', 'l', 'xl'];  // enum de talles
const categories = ["camisetas", "pantalones", "zapatos", "accesorios"]
const ProductSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  description: { type: String},
  image: { type: String},
  category: { type: String, enum: categories},
  size: { type: String, enum: sizes },
  price: { type: Number, min: 0 }
}, {timestamps: true });

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  sizes,
  categories
};