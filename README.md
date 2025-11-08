# EMI Products - Full Stack Application

A complete full-stack web application for displaying products (smartphones) with multiple EMI plans backed by mutual funds. Built with Node.js, Express, MongoDB, and Tailwind CSS.

## 🚀 Features

- **Product Management**: Upload products with images, specifications, and pricing
- **Cloudinary Integration**: Automatic image upload and storage
- **Dynamic EMI Plans**: Multiple EMI options with different tenures and interest rates
- **Product Variants**: Support for colors, storage, and other variants
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **RESTful API**: Complete backend API for product management
- **Unique URLs**: SEO-friendly product URLs using slugs

## 📁 Project Structure

```
1FI/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   └── productController.js  # Product CRUD operations
│   ├── models/
│   │   └── Product.js         # Product schema with EMI plans
│   ├── routes/
│   │   └── productRoutes.js   # API routes
│   ├── .env.example           # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Express server
└── frontend/
    ├── js/
    │   ├── products.js        # Product listing logic
    │   ├── product.js         # Product detail logic
    │   └── upload.js          # Product upload logic
    ├── index.html             # Product listing page
    ├── product.html           # Product detail page
    └── upload.html            # Admin upload page
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Image storage and CDN
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**
- **Cloudinary Account** (free tier available)

## ⚙️ Installation & Setup

### 1. Clone or Navigate to Project Directory

```bash
cd e:\1FI
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

### 3. Configure Environment Variables

Edit `backend/.env` file with your credentials:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/emi-products
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**To get Cloudinary credentials:**
1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

### 4. Start MongoDB

Ensure MongoDB is running on your system:

```bash
# Windows
mongod

# Or if installed as service, it should already be running
```

### 5. Start Backend Server

```bash
# From backend directory
npm start

# For development with auto-reload
npm run dev
```

Server should be running at `http://localhost:5000`

### 6. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 7. Start Frontend Development Server

```bash
# From frontend directory
npm run dev
```

Frontend should open automatically at `http://localhost:3000`

## 🎯 Usage Guide

### 1. Upload Products

1. Navigate to `http://localhost:3000/upload`
2. Fill in product details:
   - **Basic Information**: Name, brand, category, description
   - **Specifications**: RAM, Storage
   - **Pricing**: MRP and selling price
   - **Product Image**: Upload from your computer
   - **Variants**: Add color, storage, or finish variants
   - **EMI Plans**: Add multiple EMI options with tenure and interest
3. Click "Upload Product"

### 2. View Products

1. Navigate to `http://localhost:3000`
2. Browse all uploaded products
3. Click on any product to view details

### 3. View Product Details

1. Click on any product card
2. View complete product information
3. See all available variants
4. Select an EMI plan
5. Click "Proceed with Selected Plan"

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Products
```http
GET /products
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

#### 2. Get Product by Slug
```http
GET /products/:slug
```

**Example:** `/products/apple-iphone-15-pro`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Apple iPhone 15 Pro",
    "slug": "apple-iphone-15-pro",
    "price": 129900,
    "emiPlans": [...],
    ...
  }
}
```

#### 3. Create Product
```http
POST /products
Content-Type: multipart/form-data
```

**Form Data:**
- `name`: Product name (string, required)
- `slug`: URL-friendly slug (string, required, unique)
- `brand`: Brand name (string, required)
- `category`: Product category (string, required)
- `description`: Product description (string, required)
- `ram`: RAM specification (string, required)
- `storage`: Storage specification (string, required)
- `mrp`: Maximum retail price (number, required)
- `price`: Selling price (number, required)
- `image`: Product image file (file, required)
- `variants`: JSON string of variants array
- `emiPlans`: JSON string of EMI plans array

**Response:**
```json
{
  "success": true,
  "data": {...}
}
```

#### 4. Update Product
```http
PUT /products/:id
Content-Type: multipart/form-data
```

#### 5. Delete Product
```http
DELETE /products/:id
```

## 🗄️ Database Schema

### Product Schema

```javascript
{
  name: String,           // Product name
  slug: String,           // URL-friendly slug (unique)
  category: String,       // Product category
  brand: String,          // Brand name
  description: String,    // Product description
  image: {
    url: String,          // Cloudinary URL
    publicId: String      // Cloudinary public ID
  },
  mrp: Number,           // Maximum retail price
  price: Number,         // Selling price
  discount: Number,      // Auto-calculated discount %
  ram: String,           // RAM specification
  storage: String,       // Storage specification
  variants: [{
    name: String,        // Variant name
    type: String,        // color, storage, finish
    value: String,       // Variant value
    additionalPrice: Number
  }],
  emiPlans: [{
    monthlyPayment: Number,      // Monthly EMI amount
    tenure: Number,              // Tenure in months
    interestRate: Number,        // Interest rate %
    cashback: Number,            // Cashback amount
    cashbackDescription: String, // Cashback details
    totalAmount: Number,         // Total amount to pay
    description: String          // Plan description
  }],
  specifications: Map,   // Additional specifications
  inStock: Boolean,      // Stock status
  createdAt: Date,
  updatedAt: Date
}
```