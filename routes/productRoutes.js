const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', (req, res) => {
  res.redirect('/products');
});

//RUTAS DE VISTA AL PUBLICO
router.get('/products', productController.showProducts); // Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get('/products/:productId', productController.showProductById); //Devuelve el detalle de un producto.

// RUTAS ADMIN
router.get('/dashboard', productController.showProducts); //Devuelve el dashboard del administrador, En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.post('/dashboard', productController.createProduct);//Crea un nuevo producto. Esta es la de prueba con los nuevos controllers
router.get('/dashboard/new', productController.showNewProduct); // Devuelve el formulario para subir un artículo nuevo.
router.get('/dashboard/:productId', productController.showProductById); // Devuelve el detalle de un producto en el dashboard.      
router.get('/dashboard/:productId/edit', productController.showEditProduct); // Devuelve el formulario para editar un producto.
router.put('/dashboard/:productId', productController.updateProduct); // Actualiza un producto.
router.delete('/dashboard/:productId/delete', productController.deleteProduct); // Elimina un producto.


module.exports = router;

