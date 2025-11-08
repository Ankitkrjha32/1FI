import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productAPI } from '../services/api'
import { FaSpinner, FaArrowLeft, FaCheckCircle, FaShoppingCart, FaCreditCard, FaLock, FaGift, FaTimes } from 'react-icons/fa'

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedFormData,setSelectedFormData]=useState([])

  useEffect(() => {
    loadProduct()
  }, [slug])

  const loadProduct = async () => {
    try {
      setLoading(true)
      console.log("slug is",slug);
      const response = await productAPI.getBySlug(slug)
      if (response.data.success) {
        setProduct(response.data.data)
      }
    } catch (err) {
      setError('Product not found')
      console.error('Error loading product:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleProceed = () => {
    if (!selectedEmiPlan) {
      alert('Please select an EMI plan first')
      return
    }
    
    // Create the selected data object
    const selected = {
      ...product,
      selectedVariant: product.variants?.[selectedVariant] || null,
      selectedEmiPlan: selectedEmiPlan
    }
    
    // Log the actual selected data (not state, which updates async)
    console.log("Selected data for review:", selected)
    
    // Update state and show modal
    setSelectedFormData(selected)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-5xl text-dark-blue" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center">
        <h3 className="text-xl font-semibold text-slate-dark mb-2">Product Not Found</h3>
        <p className="text-slate-light mb-6">The product you're looking for doesn't exist</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-dark-blue text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          <FaArrowLeft className="inline mr-2" />
          Back to Products
        </button>
      </div>
    )
  }

  const discount = product.discount > 0 ? Math.round(product.discount) : 0

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-slate-600 hover:text-slate-dark flex items-center space-x-2 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-slate-200 h-[full]">
            <img
              src={product.image.url}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{product.brand}</p>
                  <h1 className="text-3xl font-bold text-custom-black mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <span>{product.ram}</span>
                    <span>•</span>
                    <span>{product.storage}</span>
                  </div>
                </div>
                {discount > 0 && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-slate-600 mb-6">{product.description}</p>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-custom-black">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-xl text-slate-500 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600 font-semibold flex items-center">
                  <FaCheckCircle className="mr-2" />
                  In Stock
                </p>
              </div>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-custom-black mb-4">Available Variants</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.variants.map((variant, idx) => {
                    const isSelected = selectedVariant === idx
                    return (
                      <div
                        key={idx}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedVariant(idx)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedVariant(idx) }}
                        className={`border-2 rounded-lg p-3 text-center transition-colors cursor-pointer ${isSelected ? 'border-dark-blue bg-blue-50' : 'border-slate-300 hover:border-dark-blue'}`}
                      >
                        <p className="text-sm font-semibold text-slate-700">{variant.type}</p>
                        <div className="text-sm text-slate-600 mt-1 flex items-center justify-center">
                          {variant.type === 'color' && variant.value?.startsWith('#') ? (
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-6 h-6 rounded-full border-2 ${isSelected ? 'border-dark-blue' : 'border-slate-300'}`}
                                style={{ backgroundColor: variant.value }}
                              />
                              <span>{variant.name}</span>
                            </div>
                          ) : (
                            <span>{variant.name}</span>
                          )}
                        </div>
                        <div className="mt-3">
                          <span className={`inline-flex items-center text-sm font-semibold ${isSelected ? 'text-dark-blue' : 'text-transparent'}`}>
                            <FaCheckCircle className="mr-2" /> Selected
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* EMI Plans */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-custom-black mb-2 flex items-center">
                <FaCreditCard className="mr-2 text-dark-blue" />
                Choose Your EMI Plan
              </h3>
              <p className="text-sm text-slate-600 mb-4">Select a plan that works best for you</p>

              {product.emiPlans?.length > 0 ? (
                <div className="space-y-3">
                  {product.emiPlans.map((plan, idx) => (
                    <EMIPlanCard
                      key={idx}
                      plan={plan}
                      isSelected={selectedEmiPlan?.monthlyPayment === plan.monthlyPayment && selectedEmiPlan?.tenure === plan.tenure}
                      onSelect={() => setSelectedEmiPlan(plan)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500">
                  <p>No EMI plans available for this product</p>
                </div>
              )}
            </div>

            {/* Proceed Button */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
              <button
                onClick={handleProceed}
                disabled={!selectedEmiPlan}
                className="w-full bg-dark-blue text-white py-4 rounded-lg hover:bg-blue-800 transition-colors font-bold text-lg disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" />
                Proceed with Selected Plan
              </button>
              <p className="text-xs text-slate-500 text-center mt-3 flex items-center justify-center">
                <FaLock className="mr-1" />
                Secure checkout powered by mutual funds
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && selectedFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-[600px] w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <FaTimes className="text-xl" />
            </button>

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-3xl text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-custom-black mb-2 text-center">Review Your Selection</h3>
            <p className="text-slate-600 mb-6 text-center">Please review your choices before proceeding</p>
            
            {/* Product Review Section */}
            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
              <div className="flex gap-4">
                <img 
                  src={selectedFormData.image?.url} 
                  alt={selectedFormData.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-custom-black">{selectedFormData.name}</h4>
                  <p className="text-sm text-slate-600">{selectedFormData.brand}</p>
                  <p className="text-xl font-bold text-dark-blue mt-2">
                    ₹{selectedFormData.price?.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Variant */}
            {selectedFormData.selectedVariant && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                <h5 className="font-semibold text-custom-black mb-2 flex items-center">
                  <FaCheckCircle className="mr-2 text-dark-blue" />
                  Selected Variant
                </h5>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{selectedFormData.selectedVariant.type}:</span>
                  <div className="flex items-center space-x-2">
                    {selectedFormData.selectedVariant.type === 'color' && selectedFormData.selectedVariant.value?.startsWith('#') ? (
                      <>
                        <div
                          className="w-6 h-6 rounded-full border-2 border-dark-blue"
                          style={{ backgroundColor: selectedFormData.selectedVariant.value }}
                        />
                        <span className="font-semibold">{selectedFormData.selectedVariant.name}</span>
                      </>
                    ) : (
                      <span className="font-semibold">{selectedFormData.selectedVariant.name}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Selected EMI Plan */}
            {selectedFormData.selectedEmiPlan && (
              <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                <h5 className="font-semibold text-custom-black mb-3 flex items-center">
                  <FaCreditCard className="mr-2 text-dark-blue" />
                  Selected EMI Plan
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Monthly Payment:</span>
                    <span className="font-bold text-dark-blue text-lg">
                      ₹{selectedFormData.selectedEmiPlan.monthlyPayment?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Tenure:</span>
                    <span className="font-semibold">{selectedFormData.selectedEmiPlan.tenure} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Interest Rate:</span>
                    <span className="font-semibold">
                      {selectedFormData.selectedEmiPlan.interestRate === 0 ? (
                        <span className="text-green-600">0% Interest</span>
                      ) : (
                        `${selectedFormData.selectedEmiPlan.interestRate}%`
                      )}
                    </span>
                  </div>
                  {selectedFormData.selectedEmiPlan.cashback > 0 && (
                    <div className="flex justify-between items-center bg-yellow-100 -mx-2 px-2 py-1 rounded">
                      <span className="text-slate-700 flex items-center">
                        <FaGift className="mr-2 text-yellow-600" />
                        Cashback:
                      </span>
                      <span className="font-bold text-yellow-800">
                        ₹{selectedFormData.selectedEmiPlan.cashback?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-green-300">
                    <span className="text-slate-700 font-semibold">Total Amount:</span>
                    <span className="font-bold text-custom-black text-lg">
                      ₹{selectedFormData.selectedEmiPlan.totalAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  // Here you would normally proceed to checkout/payment
                  console.log('Proceeding to buy with:', selectedFormData)
                  alert('Proceeding to checkout! (Payment integration pending)')
                  setShowModal(false)
                }}
                className="w-full px-6 py-4 bg-dark-blue text-white rounded-lg hover:bg-blue-800 transition-colors font-bold flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" />
                Proceed to Buy
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Go Back & Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const EMIPlanCard = ({ plan, isSelected, onSelect }) => {
  const isZeroInterest = plan.interestRate === 0
  const hasCashback = plan.cashback > 0

  return (
    <div
      onClick={onSelect}
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-dark-blue bg-blue-50'
          : 'border-slate-300 hover:border-dark-blue'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-2xl font-bold text-custom-black">
              ₹{plan.monthlyPayment.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-slate-500">/month</span>
          </div>
          <p className="text-sm text-slate-600">{plan.tenure} months tenure</p>
        </div>
        <div className="text-right">
          {isZeroInterest ? (
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
              0% Interest
            </span>
          ) : (
            <span className="text-sm text-slate-600">{plan.interestRate}% interest</span>
          )}
        </div>
      </div>

      {hasCashback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
          <p className="text-sm text-yellow-800 font-semibold flex items-center">
            <FaGift className="mr-2" />
            {plan.cashbackDescription || `₹${plan.cashback} Cashback`}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3">
        <span className="text-slate-600">Total Amount</span>
        <span className="font-bold text-custom-black">
          ₹{plan.totalAmount.toLocaleString('en-IN')}
        </span>
      </div>

      {plan.description && (
        <p className="text-xs text-slate-500 mt-2 flex items-center">
          <FaCheckCircle className="mr-1" />
          {plan.description}
        </p>
      )}

      <div className="flex items-center mt-3 text-dark-blue font-semibold text-sm">
        <FaCheckCircle className={`mr-2 ${isSelected ? '' : 'invisible'}`} />
        <span>{isSelected ? 'Selected' : 'Select Plan'}</span>
      </div>
    </div>
  )
}

export default ProductDetail
