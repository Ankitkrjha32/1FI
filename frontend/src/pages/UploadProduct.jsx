import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productAPI } from '../services/api'
import { FaUpload, FaPlus, FaTrash, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'

const UploadProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [variants, setVariants] = useState([])
  const [emiPlans, setEmiPlans] = useState([])
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    brand: '',
    category: 'smartphones',
    description: '',
    ram: '',
    storage: '',
    mrp: '',
    price: '',
    image: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const addVariant = () => {
    setVariants([...variants, { name: '', type: 'color', value: '', additionalPrice: 0 }])
  }

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const updateVariant = (index, field, value) => {
    const updated = [...variants]
    updated[index][field] = value
    setVariants(updated)
  }

  const addEmiPlan = () => {
    setEmiPlans([...emiPlans, {
      monthlyPayment: '',
      tenure: '',
      interestRate: 0,
      totalAmount: '',
      cashback: 0,
      description: ''
    }])
  }

  const removeEmiPlan = (index) => {
    setEmiPlans(emiPlans.filter((_, i) => i !== index))
  }

  const updateEmiPlan = (index, field, value) => {
    const updated = [...emiPlans]
    updated[index][field] = value
    setEmiPlans(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.image) {
      alert('Please select a product image')
      return
    }

    setLoading(true)

    try {
      const data = new FormData()
      Object.keys(formData).forEach(key => {
        if (key !== 'image') {
          data.append(key, formData[key])
        }
      })
      data.append('image', formData.image)
      data.append('variants', JSON.stringify(variants.filter(v => v.name && v.value)))
      data.append('emiPlans', JSON.stringify(emiPlans.filter(p => p.monthlyPayment && p.tenure)))

      const response = await productAPI.create(data)
      
      if (response.data.success) {
        alert('Product uploaded successfully!')
        navigate('/')
      }
    } catch (error) {
      console.error('Error uploading product:', error)
      alert('Error uploading product: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
          <h2 className="text-2xl font-bold text-custom-black mb-6">Upload New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-dark mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug (URL-friendly) *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">e.g., apple-iphone-15-pro</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Brand *</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="tablets">Tablets</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartwatches">Smartwatches</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Specifications */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-dark mb-4">Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">RAM *</label>
                  <input
                    type="text"
                    name="ram"
                    value={formData.ram}
                    onChange={handleInputChange}
                    placeholder="e.g., 8GB"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Storage *</label>
                  <input
                    type="text"
                    name="storage"
                    value={formData.storage}
                    onChange={handleInputChange}
                    placeholder="e.g., 256GB"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-dark mb-4">Pricing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">MRP (₹) *</label>
                  <input
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Selling Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-dark mb-4">Product Image</h3>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaCloudUploadAlt className="text-4xl text-slate-400 mb-3" />
                      <p className="mb-2 text-sm text-slate-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Variants */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-dark mb-4">Variants</h3>
              <div className="space-y-3">
                {variants.map((variant, index) => (
                  <VariantInput
                    key={index}
                    variant={variant}
                    index={index}
                    onChange={updateVariant}
                    onRemove={removeVariant}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="mt-4 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Variant</span>
              </button>
            </div>

            {/* EMI Plans */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-dark mb-4">EMI Plans</h3>
              <div className="space-y-4">
                {emiPlans.map((plan, index) => (
                  <EMIPlanInput
                    key={index}
                    plan={plan}
                    index={index}
                    onChange={updateEmiPlan}
                    onRemove={removeEmiPlan}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={addEmiPlan}
                className="mt-4 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add EMI Plan</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-dark-blue text-white rounded-lg hover:bg-blue-800 disabled:bg-slate-400 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FaUpload />
                    <span>Upload Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const VariantInput = ({ variant, index, onChange, onRemove }) => (
  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-semibold text-slate-700">Variant {index + 1}</h4>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-500 hover:text-red-700"
      >
        <FaTrash />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
        <input
          type="text"
          value={variant.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          placeholder="e.g., Silver"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
        <select
          value={variant.type}
          onChange={(e) => onChange(index, 'type', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        >
          <option value="color">Color</option>
          <option value="storage">Storage</option>
          <option value="finish">Finish</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
        <input
          type="text"
          value={variant.value}
          onChange={(e) => onChange(index, 'value', e.target.value)}
          placeholder="e.g., #C0C0C0"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  </div>
)

const EMIPlanInput = ({ plan, index, onChange, onRemove }) => (
  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-semibold text-slate-700">EMI Plan {index + 1}</h4>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-500 hover:text-red-700"
      >
        <FaTrash />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Payment (₹)</label>
        <input
          type="number"
          value={plan.monthlyPayment}
          onChange={(e) => onChange(index, 'monthlyPayment', e.target.value)}
          placeholder="5000"
          min="0"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Tenure (months)</label>
        <input
          type="number"
          value={plan.tenure}
          onChange={(e) => onChange(index, 'tenure', e.target.value)}
          placeholder="12"
          min="1"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Interest Rate (%)</label>
        <input
          type="number"
          value={plan.interestRate}
          onChange={(e) => onChange(index, 'interestRate', e.target.value)}
          placeholder="0"
          min="0"
          step="0.1"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount (₹)</label>
        <input
          type="number"
          value={plan.totalAmount}
          onChange={(e) => onChange(index, 'totalAmount', e.target.value)}
          placeholder="60000"
          min="0"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Cashback (₹)</label>
        <input
          type="number"
          value={plan.cashback}
          onChange={(e) => onChange(index, 'cashback', e.target.value)}
          placeholder="0"
          min="0"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <input
          type="text"
          value={plan.description}
          onChange={(e) => onChange(index, 'description', e.target.value)}
          placeholder="No cost EMI"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  </div>
)

export default UploadProduct
