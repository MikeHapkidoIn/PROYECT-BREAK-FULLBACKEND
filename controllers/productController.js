const { Product, sizes, categories } = require('../models/Product');
const getNavBar = require('../helpers/getNavBar');
const getProductCards = require('../helpers/getProductCards');
const baseHtml = require('../helpers/baseHtml');


const productController = {
     showProducts: async (req, res) => {
    try {
     const isDashboard = req.originalUrl.includes('/dashboard');
      const products = await Product.find();
      const productCards = getProductCards(products);
      const html = baseHtml + getNavBar() + productCards;
      res.send(html);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching all products');
    }
  },
      async showProductById (req, res) {
    try{
        const idProduct = await Product.findById(req.params.productId); //productId es como se pasa en la ruta.
        res.status(200).send(idProduct);

    }catch(err){
        console.error(err);
        res.status(500).send('Error fetching product by ID');
    }
 },
    //async showNewProduct (req, res) {
      //  try {
       //     const product = await Product.findById(req.params.id);
            
       // } catch (err) {
        //    console.error(err);
       //     res.status(500).send('Error showing new product');
        //}
    //},
     async createProduct (req, res) {
        try{ 
          const { name, description, price, category, size } = req.body;
          const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            size
          });
          res.status(201).send(newProduct);
        }catch(err){
            console.error(err);
            res.status(500).send('Error creating product')
        }
    },

    async showEditProduct (req, res) {
        try {
            const editedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
            if (!editedProduct) {
                return res.status(404).send('Product not found');
            }   
            res.status(200).send(editedProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error showing edit product');
        }
    },

     async updateProduct (req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).send('Product not found');
            }   
            res.status(200).send(updatedProduct);   
        } catch (err) {
            console.error(err);
            res.status(500).send('Error updating product');
        }                                               
     },

     async deleteProduct (req, res) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
            if (!deletedProduct) {
                return res.status(404).send('Product not found');
            }                                       
            res.status(200).send('Product deleted successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error deleting product');
        }   
    }

}

module.exports = productController;


/*A continuación crearemos el controlador de productos. Este controlador se dedicará a manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.
Para ello, crearemos algunas funciones auxiliares que nos ayudarán a devolver las vistas con SSR.

Las funciones principales del controlador serán:

- showProducts: Devuelve la vista con todos los productos.
- showProductById: Devuelve la vista con el detalle de un producto.
- showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
- createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- showEditProduct: Devuelve la vista con el formulario para editar un producto.
- updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard. */