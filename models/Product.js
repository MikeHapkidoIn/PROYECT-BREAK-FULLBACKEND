const mongoose = require('mongoose');
const size = ['XS', 'S', 'M', 'L', 'XL'];  // enum de talles
const categories = ["Camisetas", "Pantalones", "Zapatos", "Accesorios"]
const ProductSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  description: { type: String},
  image: { type: String},
  category: { type: String},
  sizes: { type: String},
  price: { type: Number, min: 0 }
}, {timestamps: true });

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  size,
  categories
};