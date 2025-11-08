n UI/UX

---

## 📂 Project Files Created

### Backend (9 files)
```
backend/
├── config/
│   ├── cloudinary.js           ✓ Cloudinary & Multer setup
│   └── database.js             ✓ MongoDB connection
├── controllers/
│   └── productController.js    ✓ CRUD operations
├── models/
│   └── Product.js              ✓ Mongoose schema
├── routes/
│   └── productRoutes.js        ✓ API routes
├── .env                        ✓ Environment variables

├── .gitignore                  ✓ Git ignore
├── package.json                ✓ Dependencies
└── server.js                   ✓ Main server
```


y**
   - Sign up at https://cloudinary.com (free)
   - Get your credentials from Dashboard
   - Add to `backend/.env`

3. **Start MongoDB**
   ```powershell
   mongod
   ```

4. **Start Backend**
   ```powershell
   npm start
   ```


## 🎯 What You Can Do

### 1. Upload Products
- Go to upload page
- Fill product details (name, brand, RAM, storage, price)
- Upload product image
- Add variants (colors, storage options)
- Add EMI plans (tenure, monthly payment, interest rate)
- Submit

### 2. View Products
- Browse all products on home page
- See product images, prices, discounts
- View lowest EMI option
- Click to see details

### 3. View Product Details
- See full product information
- View all variants
- Choose from multiple EMI plans
- Select plan and proceed

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/products` | GET | Get all products |
| `/api/products/:slug` | GET | Get product by slug |
| `/api/products` | POST | Create product |
| `/api/products/:id` | PUT | Update product |
| `/api/products/:id` | DELETE | Delete product |

---

## 🗄️ Database Schema

### Product Model
```javascript
{
  name: String,
  slug: String (unique),
  brand: String,
  category: String,
  description: String,
  image: {
    url: String,      // Cloudinary URL
    publicId: String  // Cloudinary ID
  },
  mrp: Number,
  price: Number,
  discount: Number,   // Auto-calculated
  ram: String,
  storage: String,
  variants: [         // Array of variants
    {
      name: String,
      type: String,
      value: String,
      additionalPrice: Number
    }
  ],
  emiPlans: [         // Array of EMI plans
    {
      monthlyPayment: Number,
      tenure: Number,
      interestRate: Number,
      cashback: Number,
      totalAmount: Number,
      description: String
    }
  ],
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📱 Sample Data to Test

### Product Example
- **Name**: Apple iPhone 15 Pro
- **Slug**: apple-iphone-15-pro
- **Brand**: Apple
- **RAM**: 8GB
- **Storage**: 256GB
- **MRP**: ₹139,900
- **Price**: ₹129,900

### EMI Plan Example
- **Monthly**: ₹10,825
- **Tenure**: 12 months
- **Interest**: 0%
- **Total**: ₹129,900
- **Description**: No cost EMI

See **QUICKSTART.md** for complete sample data

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Cloudinary** - Image storage
- **Multer** - File upload

### Frontend
- **HTML5** - Structure
- **Tailwind CSS** - Styling
- **JavaScript** - Logic
- **Fetch API** - HTTP requests

---

## ✅ Assignment Requirements Met

### Required Features
✓ Product details (name, variant, MRP, price, image)
✓ List of EMI plans with monthly payment, tenure, interest
✓ Selectable EMI plans
✓ Proceed button for selected plan
✓ Data loaded from backend API (no hardcoded data)
✓ Unique URLs for each product using slugs
✓ At least 3 products supported
✓ 2 or more variants per product

### Backend Requirements
✓ APIs to serve product and EMI data
✓ Database storage (MongoDB)
✓ Proper schema defined
✓ Image storage on Cloudinary
✓ Separate routes and controllers

### Additional Features Implemented
✓ Admin upload interface
✓ Image upload to Cloudinary
✓ Responsive design
✓ Loading states and error handling
✓ Product variants system
✓ Discount calculation
✓ Complete CRUD operations

---

## 🎨 UI Features

### Home Page
- Grid layout of products
- Product images from Cloudinary
- Price with discount badge
- Lowest EMI highlighted
- Variants count display
- Responsive cards

### Product Detail Page
- Large product image
- Brand and name
- Specifications (RAM, storage)
- Price with MRP strikethrough
- Variants display with colors
- EMI plans with selection
- Proceed button
- Success modal

### Upload Page
- Multi-section form
- Image upload with preview
- Auto-slug generation
- Dynamic variant addition
- Dynamic EMI plan addition
- Form validation
- Upload progress


### Immediate
1. Install backend dependencies: `npm install`
2. Setup Cloudinary account (free)
3. Update `.env` with credentials
4. Start MongoDB
5. Run backend: `npm start`
6. Open frontend with Live Server
7. Upload sample products


## 🆘 Getting Help

### Common Issues

**Backend won't start**
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Run `npm install` in backend folder

**Images won't upload**
- Verify Cloudinary credentials
- Check internet connection
- Ensure image is under 5MB

**Frontend shows errors**
- Check if backend is running on port 5000
- Verify API_URL in JS files
- Check browser console for errors

---
