const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/productApiController');

router.get('/products', productApiController.showProducts);
router.get('/products/:productId', productApiController.showProductById);
router.post('/products', productApiController.createProduct);
router.put('/products/:productId', productApiController.updateProduct);
router.delete('/products/:productId', productApiController.deleteProduct);

module.exports = router; 
