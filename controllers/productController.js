const { Product, sizes, categories } = require('../models/Product');
//const getNavBar = require('../helpers/getNavBar');
//const getProductCards = require('../helpers/getProductCards');
//const baseHtml = require('../helpers/baseHtml');


const productController = {
  showProducts: async (req, res) =>{
    try {
       const products = await Product.find();
       const isAdmin = req.originalUrl.startsWith('/dashboard');
       res.status(200).json(products);
    }catch (error) {
      res.status(500).send('Error al cargar productos');
    }
  },

  showProductById: async (req, res) => {
    try{
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send('Producto no encontrado');
        const isAdmin = req.originalUrl.startsWith('/dashboard/:productId');
      }
    }catch{
      res.status(500).send('Error al cargar producto');
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, description, image, category, size, price } = req.body;
      const newProduct = new Product({ name, description, image, category, size, price });
      await newProduct.save();
      res.status(201).json(newProduct); // o res.redirect('/dashboard/productos'); o res.redirect(`/dashboard/productos/${newProduct._id}`); // A la vista de detalle
      // Buscar y devolver todos los productos
      //const allProducts = await Product.find();
      //res.status(201).json(allProducts);
    } catch (error) {
      res.status(500).send('Error al crear producto');
    }
  },
}

module.exports = productController;


