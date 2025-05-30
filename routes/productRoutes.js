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

//RUTAS PARA EL ADMINISTRADOR
//vista
router.get('/dashboard', productController.showDashboard); //Devuelve el dashboard del administrador, En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get('/dashboard/new', productController.showNewProductForm); // Devuelve el formulario para subir un artículo nuevo.
router.get('/dashboard/:productId', productController.showProductById); // Devuelve el detalle de un producto en el dashboard.      
router.get('/dashboard/:productId/edit', productController.showEditProductForm); // Devuelve el formulario para editar un producto.

//crea y actualiza
router.post('/dashboard', productController.createProduct);//Crea un nuevo producto.
router.post('/dashboard', upload.single('image'), productController.createProduct); //router.post('/dashboard', auth, upload.single('image'), productController.createProduct);
router.put('/dashboard/:productId', productController.updateProduct); // Actualiza un producto.

//elimina
router.delete('/dashboard/:productId/delete', productController.deleteProduct); // Elimina un producto.
router.post('/dashboard/:productId/delete', productController.deleteProduct); // Elimina un producto. Usamos POST para evitar problemas con los navegadores que no soportan DELETE en formularios.

module.exports = router;

