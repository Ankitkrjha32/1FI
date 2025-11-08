import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { productAPI } from '../services/api'
import { FaSpinner, FaBoxOpen, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productAPI.getAll()
      if (response.data.success) {
        setProducts(response.data.data)
      }
    } catch (err) {
      setError('Failed to load products. Please ensure the backend server is running.')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-5xl text-dark-blue" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center">
        <FaExclamationCircle className="text-6xl text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-dark mb-2">Error Loading Products</h3>
        <p className="text-slate-light mb-6">{error}</p>
        <button
          onClick={loadProducts}
          className="px-6 py-3 bg-dark-blue text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center">
        <FaBoxOpen className="text-6xl text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
        <p className="text-slate-light mb-6">Start by uploading your first product</p>
        <button
          onClick={() => navigate('/upload')}
          className="px-6 py-3 bg-dark-blue text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          Upload Product
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b py-12 h-[100%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Shop Smart Phones on Easy EMI
          </h2>
          <p className="text-xl text-black">
            Zero interest EMI plans backed by mutual funds
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-10 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">
            Available Products
          </h3>
          <p className="text-slate-300">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onClick={() => navigate(`/product/${product.slug}`)} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product, onClick }) => {
  const discount = product.discount > 0 ? Math.round(product.discount) : 0
  const lowestEMI = product.emiPlans?.length > 0
    ? Math.min(...product.emiPlans.map(plan => plan.monthlyPayment))
    : null

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg h-full overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-slate-200"
    >
      <div className="relative">
        <img
          src={product.image.url}
          alt={product.name}
          className="w-full h-64 object-contain bg-slate-50 p-4"
        />
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-dark mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mb-3 text-sm text-slate-light">
          <span>{product.ram}</span>
          <span>•</span>
          <span>{product.storage}</span>
        </div>

        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-2xl font-bold text-custom-black">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-slate-light line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {lowestEMI && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
            <p className="text-sm text-green-800 flex items-center">
              <FaCheckCircle className="mr-2" />
              EMI starting at <span className="font-bold ml-1">₹{lowestEMI.toLocaleString('en-IN')}/mo</span>
            </p>
          </div>
        )}

        {product.variants?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-slate-500 mb-2">
              {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''} available
            </p>
            <div className="flex flex-wrap gap-1">
              {product.variants.slice(0, 3).map((variant, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                  {variant.name}
                </span>
              ))}
              {product.variants.length > 3 && (
                <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                  +{product.variants.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <button className="w-full bg-dark-blue text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
          View Details
        </button>
      </div>
    </div>
  )
}

export default ProductList
