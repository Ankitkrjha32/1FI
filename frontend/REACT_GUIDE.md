# React Frontend - Quick Start Guide

## 🎨 Color Scheme

The application uses a modern, professional color palette:

- **Custom Black**: `#0f172a` - Primary dark color
- **Slate Dark**: `#1e293b` - Secondary dark
- **Slate Medium**: `#334155` - Medium contrast
- **Slate Light**: `#64748b` - Light accent
- **Dark Blue**: `#1e3a8a` - Brand color (CTAs, highlights)
- **White**: `#ffffff` - Background, text
- **Slate Grey**: Various shades for backgrounds and borders

## 🚀 Installation

### 1. Install Dependencies

```powershell
cd frontend
npm install
```

This will install:
- React 18
- React Router DOM
- Vite (build tool)
- Tailwind CSS
- Axios
- React Icons

### 2. Start Development Server

```powershell
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation bar
│   ├── pages/
│   │   ├── ProductList.jsx     # Home page with all products
│   │   ├── ProductDetail.jsx   # Individual product page
│   │   └── UploadProduct.jsx   # Admin upload page
│   ├── services/
│   │   └── api.js              # Axios API configuration
│   ├── App.jsx                 # Main app component with routes
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind + custom colors
├── postcss.config.js           # PostCSS config
└── package.json                # Dependencies
```

## 🎯 Key Features

### 1. **ProductList** (`/`)
- Grid layout of all products
- Dark gradient background (slate-dark to slate-900)
- Product cards with hover effects
- Shows: image, name, price, discount, EMI options, variants
- Color scheme: White cards on dark background with blue accents

### 2. **ProductDetail** (`/product/:slug`)
- Two-column layout (image + details)
- Variant selection
- EMI plan cards with selection
- Modal confirmation on proceed
- Color scheme: Light slate background with white cards

### 3. **UploadProduct** (`/upload`)
- Multi-section form
- Image upload with preview
- Dynamic variant and EMI plan inputs
- Form validation
- Color scheme: Clean white form on light background

### 4. **Navbar**
- Black background (`custom-black`)
- Blue brand accent (`dark-blue`)
- Sticky positioned
- Links: Products, Upload

## 🎨 Customizing Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'dark-blue': '#1e3a8a',      // Change this
      'slate-dark': '#1e293b',     // Or this
      'custom-black': '#0f172a',   // Or this
    },
  },
}
```

## 🛠️ Available Scripts

```powershell
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔌 API Configuration

Edit `src/services/api.js` to change backend URL:

```javascript
const API_URL = 'http://localhost:5000/api'; // Change this
```

## 📦 Component Usage

### Importing Components

```jsx
import { useNavigate } from 'react-router-dom'
import { productAPI } from '../services/api'
import { FaIcon } from 'react-icons/fa'
```

### Making API Calls

```javascript
// Get all products
const response = await productAPI.getAll()

// Get single product
const response = await productAPI.getBySlug('iphone-15-pro')

// Create product
const formData = new FormData()
formData.append('name', 'Product Name')
// ... add more fields
const response = await productAPI.create(formData)
```

### Navigation

```javascript
const navigate = useNavigate()

// Navigate to home
navigate('/')

// Navigate to product detail
navigate(`/product/${slug}`)

// Navigate to upload
navigate('/upload')
```

## 🎨 Styling Tips

### Using Custom Colors

```jsx
<div className="bg-custom-black text-white">
  <h1 className="text-dark-blue">Title</h1>
  <p className="text-slate-light">Description</p>
</div>
```

### Hover Effects

```jsx
<button className="bg-dark-blue hover:bg-blue-800 transition-colors">
  Click Me
</button>
```

### Responsive Design

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is busy, Vite will ask to use another port or you can specify:

```javascript
// vite.config.js
server: {
  port: 3001 // Change port
}
```

### API Not Connecting

1. Ensure backend is running on port 5000
2. Check `src/services/api.js` has correct URL
3. Verify CORS is enabled in backend

### Build Errors

```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Tailwind Not Working

Ensure these files exist:
- `tailwind.config.js`
- `postcss.config.js`
- `@tailwind` directives in `src/index.css`

## 🚀 Production Build

```powershell
# Build optimized production bundle
npm run build

# Files will be in dist/ folder
# Deploy the dist/ folder to your hosting service
```

## 📱 Responsive Breakpoints

Tailwind breakpoints used:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open http://localhost:3000
4. Ensure backend is running on port 5000
5. Upload products via `/upload` page
6. Browse products on home page

## 💡 Development Tips

1. **Hot Reload**: Changes are reflected instantly
2. **Component Structure**: Keep components small and focused
3. **State Management**: Use `useState` for local state
4. **API Calls**: Always handle loading and error states
5. **Styling**: Use Tailwind classes, avoid inline styles

## 🎨 Color Usage Guide

- **Backgrounds**: `bg-custom-black`, `bg-slate-dark`, `bg-slate-50`
- **Text**: `text-white`, `text-custom-black`, `text-slate-light`
- **Buttons**: `bg-dark-blue hover:bg-blue-800`
- **Borders**: `border-slate-200`, `border-slate-300`
- **Accents**: `text-dark-blue` for brand elements

---

**Ready to build! Run `npm run dev` to get started! 🚀**
