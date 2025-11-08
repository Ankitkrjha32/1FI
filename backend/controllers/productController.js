const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create a new product
// @route   POST /api/products
// @access  Public (in production, should be protected)
const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      brand,
      description,
      mrp,
      price,
      ram,
      storage,
      variants,
      emiPlans,
      specifications
    } = req.body;

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }

    // Create product with Cloudinary image
    const product = await Product.create({
      name,
      slug,
      category,
      brand,
      description,
      image: {
        url: req.file.path,
        publicId: req.file.filename
      },
      mrp,
      price,
      discount: ((mrp - price) / mrp * 100).toFixed(2),
      ram,
      storage,
      variants: variants ? JSON.parse(variants) : [],
      emiPlans: emiPlans ? JSON.parse(emiPlans) : [],
      specifications: specifications ? JSON.parse(specifications) : {}
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    
    // Delete uploaded image from Cloudinary if product creation fails
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public (in production, should be protected)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // If new image is uploaded, delete old one from Cloudinary
    if (req.file) {
      await cloudinary.uploader.destroy(product.image.publicId);
      product.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    // Update fields
    const fieldsToUpdate = [
      'name', 'slug', 'category', 'brand', 'description',
      'mrp', 'price', 'ram', 'storage', 'inStock'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    // Update complex fields
    if (req.body.variants) {
      product.variants = JSON.parse(req.body.variants);
    }
    if (req.body.emiPlans) {
      product.emiPlans = JSON.parse(req.body.emiPlans);
    }
    if (req.body.specifications) {
      product.specifications = JSON.parse(req.body.specifications);
    }

    // Recalculate discount
    if (req.body.mrp || req.body.price) {
      product.discount = ((product.mrp - product.price) / product.mrp * 100).toFixed(2);
    }

    await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public (in production, should be protected)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(product.image.publicId);

    // Delete product from database
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
};
