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
      res.status(201).json(newProduct); // o res.redirect('/dashboard/products'); o res.redirect(`/dashboard/products/${newProduct._id}`); // A la vista de detalle
      // Buscar y devolver todos los productos
      //const allProducts = await Product.find();
      //res.status(201).json(allProducts);
    } catch (error) {
      res.status(500).send('Error al crear producto');
    }
  },

  showNewProduct: async (req, res) => {
  try{
    const form = `
      <form action="/dashboard" method="POST" enctype="multipart/form-data">
        <input type="text" name="name" placeholder="Nombre del producto" required>
        <textarea name="description" placeholder="Descripción del producto" required></textarea>
        <input type="file" name="image" accept="image/*" required>
        <select name="category">
          ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        </select>
        <select name="size">
          ${sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
        </select>
        <input type="number" name="price" placeholder="Precio del producto" required>
        <button type="submit">Crear Producto</button>
      </form>`;
  } catch(err){
    res.status(500).send('Error al cargar el formulario de nuevo producto');
  }
},
  showEditProduct: async (req, res) => {
    try{
      const editForm = `
        <form action="/dashboard/${req.params.productId}" method="POST" enctype="multipart/form-data">
          <input type="text" name="name" placeholder="Nombre del producto" required>
          <textarea name="description" placeholder="Descripción del producto" required></textarea>
          <input type="file" name="image" accept="image/*">
          <select name="category">
            ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
          </select>
          <select name="size">
            ${sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
          </select>
          <input type="number" name="price" placeholder="Precio del producto" required>
          <button type="submit">Actualizar Producto</button>
        </form>`;
        res.status(200).send(editForm);
    } catch (error) {
      res.status(500).send('Error al cargar el formulario de edición del producto');
    }
},
  updateProduct: async (req, res) => {
    try{
      const productId = req.params.productId;
      const { name, description, image, category, size, price } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, image, category, size, price }, { new: true });
      if (!updatedProduct) {
        return res.status(404).send('Producto no encontrado');
      }
      res.status(200).json(updatedProduct);
    } catch(err){
      res.status(500).send('Error al actualizar el producto');
    }
  },

  deleteProduct: async (req, res) => {
    try{
      const productId = req.params.productId;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).send('Producto no encontrado');
      } 
      res.status(200).send('Producto eliminado correctamente');
    } catch(err){
      res.status(500).send('Error al eliminar el producto');
    } 
}
};

module.exports = productController;


