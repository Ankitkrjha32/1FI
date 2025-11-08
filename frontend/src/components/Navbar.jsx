import { Link } from 'react-router-dom'
import { FaMobileAlt, FaPlus } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="bg-custom-black shadow-lg sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaMobileAlt className="text-2xl text-dark-blue" />
            <h1 className="text-2xl font-bold text-white">
              1FI <span className="text-dark-blue">Products</span>
            </h1>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              to="/upload" 
              className="flex items-center space-x-2 bg-dark-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <FaPlus />
              <span>Upload</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
