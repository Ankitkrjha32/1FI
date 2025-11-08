const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes
router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
