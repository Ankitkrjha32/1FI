const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema({
  monthlyPayment: {
    type: Number,
    required: true
  },
  tenure: {
    type: Number,
    required: true,
    min: 1
  },
  interestRate: {
    type: Number,
    required: true,
    default: 0
  },
  cashback: {
    type: Number,
    default: 0
  },
  cashbackDescription: {
    type: String,
    default: ''
  },
  totalAmount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, { _id: true });

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['storage', 'color', 'finish'],
    required: true
  },
  value: {
    type: String,
    required: true
  },
  additionalPrice: {
    type: Number,
    default: 0
  }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    default: 'smartphones'
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  },
  mrp: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  ram: {
    type: String,
    required: true
  },
  storage: {
    type: String,
    required: true
  },
  variants: [variantSchema],
  emiPlans: [emiPlanSchema],
  specifications: {
    type: Map,
    of: String
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create index on slug for faster queries
productSchema.index({ slug: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
