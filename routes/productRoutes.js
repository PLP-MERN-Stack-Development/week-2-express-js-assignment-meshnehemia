// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const auth = require('../middlewares/auth');
const validateProduct = require('../middlewares/validateProduct');

router.use(auth);

router.get('/', controller.getProducts);
router.get('/stats', controller.getStats);
router.get('/search', controller.searchProducts);
router.get('/:id', controller.getProduct);
router.post('/', validateProduct, controller.createProduct);
router.put('/:id', validateProduct, controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;