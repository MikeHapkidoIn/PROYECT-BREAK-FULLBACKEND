const { Product, sizes, categories } = require('../models/Product');

const apiController = {
// GET /api/products
showProducts: async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
},

// GET /api/products/:productId
showProductById: async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
},

// POST /api/create
createProduct: async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto' });
  }
},

// PUT /api/products/:productId
updateProduct: async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el producto' });
  }
}, 

// DELETE /api/products/:productId
 deleteProduct:  async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente', producto: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

};

module.exports = apiController;









