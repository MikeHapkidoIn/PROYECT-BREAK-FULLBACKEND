const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');
const requireAuth = require('../middlewares/authMiddleware');


// Redireccionamiento raíz
router.get('/', (req, res) => {
  res.redirect('/products');
});

// RUTAS PÚBLICAS
router.get('/products', productController.showProducts); 
router.get('/products/:productId', productController.showProductById); 

// RUTAS ADMINISTRACIÓN
router.get('/dashboard', requireAuth, productController.showProducts); 

router.get('/dashboard/new',requireAuth, productController.showNewProduct); 
router.post('/dashboard', requireAuth, upload.single('image'), productController.createProduct); 

router.get('/dashboard/:productId', requireAuth, productController.showProductById); 
router.get('/dashboard/:productId/edit', requireAuth, productController.showEditProduct); 
router.put('/dashboard/:productId', requireAuth, upload.single('image'), productController.updateProduct); 
router.delete('/dashboard/:productId/delete', requireAuth, productController.deleteProduct); 

module.exports = router;


