import React, { useState, useEffect, useRef, Suspense, lazy, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock,
  Users, 
  Trophy, 
  Target,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  Package,
  Eye,
  ArrowRight,
  Zap,
  CheckCircle,
  Award,
  TrendingUp,
  Gift,
  Truck,
  Shield,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus
} from 'lucide-react';

// ================================
// OPTIMIZED HEADER COMPONENT
// ================================

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'categories', label: 'Exercise Categories', path: '/categories' },
    { id: 'progress', label: 'Progress Tracker', path: '/progress' },
    { id: 'community', label: 'Community', path: '/community' },
    { id: 'leaderboard', label: 'Leaderboard', path: '/leaderboard' },
    { id: 'shop', label: 'Shop', path: '/shop' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Dominion
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="py-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-emerald-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// ================================
// ENHANCED PRODUCT CARD WITH ADVANCED VISUALS
// ================================

const ProductCard = ({ product, onViewProduct, onAddToCart, viewMode = 'grid' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative lg:w-80 h-64 lg:h-48 overflow-hidden">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={imageLoaded ? "visible" : "hidden"}
              whileHover="hover"
              className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"
            >
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.discount_price && (
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                  </motion.div>
                )}
                {product.stock_quantity > 0 && product.stock_quantity < 5 && (
                  <motion.div 
                    className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Only {product.stock_quantity} left!
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-500 text-white shadow-lg scale-110' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={16} fill={isLiked ? 'white' : 'none'} />
                </motion.button>
                
                <motion.button
                  onClick={() => onViewProduct(product)}
                  className="p-2 rounded-full bg-emerald-500 text-white backdrop-blur-md hover:bg-emerald-600 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye size={16} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full capitalize font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm text-gray-600 ml-1 font-medium">
                      {product.rating} ({product.review_count})
                    </span>
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                {product.name}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="flex items-center justify-between mb-4 mt-auto">
                <div className="flex items-center gap-3">
                  {product.discount_price ? (
                    <>
                      <span className="text-2xl font-bold text-emerald-600">
                        ₹{product.discount_price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                  )}
                </div>
                
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  product.stock_quantity > 5 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock_quantity > 0
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock_quantity > 5 ? 'In Stock' : 
                   product.stock_quantity > 0 ? `Only ${product.stock_quantity} left` : 'Out of Stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => onViewProduct(product)}
                  className="flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye size={16} />
                  View Details
                </motion.button>
                <motion.button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          whileHover="hover"
          className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"
        >
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount_price && (
            <motion.div 
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
            </motion.div>
          )}
          {product.featured && (
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles size={10} />
              Featured
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Heart size={16} fill={isLiked ? 'white' : 'none'} />
          </motion.button>
          
          <motion.button
            onClick={() => onViewProduct(product)}
            className="p-2 rounded-full bg-emerald-500 text-white backdrop-blur-md hover:bg-emerald-600 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Eye size={16} />
          </motion.button>
        </div>

        {/* Quick Add to Cart Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => onAddToCart(product)}
            disabled={product.stock_quantity === 0}
            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 disabled:bg-gray-300 transition-all duration-300 flex items-center gap-2 shadow-lg"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: isHovered ? 1 : 0.8, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            Quick Add
          </motion.button>
        </motion.div>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full capitalize font-medium">
            {product.category}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm text-gray-600 ml-1 font-medium">
              {product.rating}
            </span>
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {product.discount_price ? (
              <>
                <span className="text-xl font-bold text-emerald-600">
                  ₹{product.discount_price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ₹{product.price}
              </span>
            )}
          </div>
          
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.stock_quantity > 5 
              ? 'bg-green-100 text-green-800' 
              : product.stock_quantity > 0
              ? 'bg-orange-100 text-orange-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock_quantity > 5 ? 'In Stock' : 
             product.stock_quantity > 0 ? `${product.stock_quantity} left` : 'Out of Stock'}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => onViewProduct(product)}
            className="flex-1 bg-gray-100 text-gray-900 py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
          <motion.button
            onClick={() => onAddToCart(product)}
            disabled={product.stock_quantity === 0}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2.5 px-4 rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 text-sm font-medium shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ================================
// ADVANCED SHOP HEADER
// ================================

const ShopHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  selectedCategory, 
  setSelectedCategory,
  onToggleFilters,
  filtersOpen 
}) => {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-3xl mb-8"
      style={{ y: headerY, opacity: headerOpacity }}
    >
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
      </div>

      <div className="relative z-10 px-8 py-12">
        {/* Hero Content */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium Gear
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your training with professional-grade equipment
          </motion.p>
        </div>

        {/* Search and Controls */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Enhanced Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for equipment, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-md rounded-2xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500 text-lg"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Filters Toggle */}
              <motion.button
                onClick={onToggleFilters}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${
                  filtersOpen 
                    ? 'bg-white text-emerald-600 shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
              
              {/* View Mode Toggle */}
              <div className="flex bg-white/20 backdrop-blur-md rounded-2xl p-1">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-lg' : 'text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid size={20} />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-white text-emerald-600 shadow-lg' : 'text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-8 text-emerald-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Shield size={20} />
            <span className="text-sm font-medium">Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={20} />
            <span className="text-sm font-medium">Free Shipping ₹2000+</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={20} />
            <span className="text-sm font-medium">Expert Approved</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ================================
// ENHANCED CATEGORY SECTION
// ================================

const CategorySection = ({ selectedCategory, setSelectedCategory, subcategory, setSubcategory }) => {
  const categories = [
    { 
      id: 'all', 
      name: 'All Products', 
      icon: Package, 
      color: 'from-gray-500 to-gray-600',
      description: 'Complete collection'
    },
    { 
      id: 'resistance', 
      name: 'Resistance Training', 
      icon: Target, 
      color: 'from-emerald-500 to-green-600',
      description: 'Build strength'
    },
    { 
      id: 'cardio', 
      name: 'Cardio Equipment', 
      icon: TrendingUp, 
      color: 'from-blue-500 to-indigo-600',
      description: 'Boost endurance'
    },
    { 
      id: 'accessories', 
      name: 'Accessories', 
      icon: Star, 
      color: 'from-purple-500 to-pink-600',
      description: 'Essential gear'
    },
    { 
      id: 'recovery', 
      name: 'Recovery & Wellness', 
      icon: Heart, 
      color: 'from-orange-500 to-red-600',
      description: 'Restore & heal'
    }
  ];

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
        <p className="text-gray-600 text-lg">Find the perfect equipment for your training goals</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSubcategory('all');
              }}
              className={`group relative p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden ${
                isSelected 
                  ? 'bg-white shadow-2xl ring-2 ring-emerald-500 ring-offset-2' 
                  : 'bg-white hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                {category.description}
              </p>

              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

// ================================
// SKILL BUNDLES SECTION
// ================================

const SkillBundles = ({ onSelectBundle }) => {
  const bundles = [
    {
      id: 'beginner',
      name: 'Beginner Starter Pack',
      price: 4999,
      originalPrice: 6500,
      image: '/api/placeholder/400/300',
      items: ['Resistance Bands', 'Push-up Bars', 'Exercise Mat', 'Guide Book'],
      color: 'from-green-400 to-emerald-600',
      badge: 'Most Popular'
    },
    {
      id: 'intermediate',
      name: 'Intermediate Power Set',
      price: 8999,
      originalPrice: 11000,
      image: '/api/placeholder/400/300',
      items: ['Pull-up Bar', 'Gymnastics Rings', 'Weighted Vest', 'Foam Roller'],
      color: 'from-blue-400 to-indigo-600',
      badge: 'Best Value'
    },
    {
      id: 'advanced',
      name: 'Advanced Pro Kit',
      price: 15999,
      originalPrice: 19000,
      image: '/api/placeholder/400/300',
      items: ['Parallettes', 'Suspension Trainer', 'Balance Board', 'Recovery Tools'],
      color: 'from-purple-400 to-pink-600',
      badge: 'Premium'
    }
  ];

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Skill-Based Bundles</h2>
        <p className="text-gray-600 text-lg">Complete training packages designed for your level</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {bundles.map((bundle, index) => (
          <motion.div
            key={bundle.id}
            className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Badge */}
            <div className={`absolute top-4 left-4 z-10 bg-gradient-to-r ${bundle.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
              {bundle.badge}
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${bundle.color} opacity-90`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Package className="w-16 h-16 mx-auto mb-3 opacity-80" />
                  <h3 className="text-xl font-bold">{bundle.name}</h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Items List */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                <ul className="space-y-1">
                  {bundle.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">₹{bundle.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">₹{bundle.originalPrice}</span>
                </div>
                <div className="text-emerald-600 font-semibold">
                  Save ₹{bundle.originalPrice - bundle.price}
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={() => onSelectBundle(bundle)}
                className={`w-full bg-gradient-to-r ${bundle.color} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Select Bundle
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ================================
// MAIN SHOP PAGE WITH PERFORMANCE OPTIMIZATIONS
// ================================

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const navigate = useNavigate();

  // Performance: Memoized filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSubcategory = subcategory === 'all' || product.subcategory === subcategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, subcategory, priceRange]);

  // Performance: Memoized sorted products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Performance: Optimized handlers with useCallback
  const handleViewProduct = useCallback((product) => {
    navigate(`/product/${product.id}`);
  }, [navigate]);

  const handleAddToCart = useCallback((product) => {
    console.log('Added to cart:', product.name);
    // TODO: Implement cart functionality
  }, []);

  const handleSelectBundle = useCallback((bundle) => {
    console.log('Selected bundle:', bundle.name);
    // TODO: Implement bundle selection
  }, []);

  const toggleFilters = useCallback(() => {
    setFiltersOpen(!filtersOpen);
  }, [filtersOpen]);

  // Performance: Smooth scroll optimization
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      document.body.style.transform = `translate3d(0, 0, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-gray-600 text-xl font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading premium gear...
          </motion.p>
          <motion.div
            className="flex justify-center gap-1 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Hero */}
        <ShopHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onToggleFilters={toggleFilters}
          filtersOpen={filtersOpen}
        />

        {/* Category Section */}
        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
        />

        {/* Skill-Based Bundles */}
        <SkillBundles onSelectBundle={handleSelectBundle} />

        {/* Enhanced Filters Sidebar */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            >
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Sort Options */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      Sort By
                    </h3>
                    <div className="space-y-3">
                      {[
                        { value: 'featured', label: 'Featured', icon: Star },
                        { value: 'price-low', label: 'Price: Low to High', icon: TrendingUp },
                        { value: 'price-high', label: 'Price: High to Low', icon: TrendingUp },
                        { value: 'rating', label: 'Highest Rated', icon: Award },
                        { value: 'newest', label: 'Newest', icon: Sparkles }
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <motion.label 
                            key={option.value} 
                            className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-emerald-50 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <input
                              type="radio"
                              name="sort"
                              value={option.value}
                              checked={sortBy === option.value}
                              onChange={(e) => setSortBy(e.target.value)}
                              className="text-emerald-500 w-4 h-4"
                            />
                            <Icon className="w-4 h-4 text-emerald-600" />
                            <span className="text-gray-700 font-medium">{option.label}</span>
                          </motion.label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald-600" />
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <span className="text-gray-500 font-medium">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div className="text-center text-sm text-gray-600 bg-emerald-50 rounded-xl p-3">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </div>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Package className="w-5 h-5 text-emerald-600" />
                      Availability
                    </h3>
                    <div className="space-y-3">
                      <motion.label 
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-emerald-50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <input type="checkbox" className="text-emerald-500 w-4 h-4 rounded" defaultChecked />
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 font-medium">In Stock</span>
                      </motion.label>
                      <motion.label 
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-emerald-50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <input type="checkbox" className="text-emerald-500 w-4 h-4 rounded" />
                        <Package className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700 font-medium">Out of Stock</span>
                      </motion.label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary */}
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <p className="text-gray-600 text-lg font-medium">
              Showing <span className="text-emerald-600 font-bold">{sortedProducts.length}</span> of <span className="font-bold">{products.length}</span> products
            </p>
            {searchQuery && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Results for "{searchQuery}"
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Updated just now
          </div>
        </motion.div>

        {/* Enhanced Products Grid with Performance Optimizations */}
        <motion.div 
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
          layout
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                viewMode={viewMode}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced No Products Found */}
        {sortedProducts.length === 0 && !loading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Package size={64} className="text-gray-400" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
              We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
            </p>
            <motion.button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSubcategory('all');
                setPriceRange([0, 50000]);
              }}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced Call to Action Section */}
        {sortedProducts.length > 0 && (
          <motion.div
            className="mt-20 relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
              <div className="absolute inset-0 bg-pattern opacity-20"></div>
            </div>

            <div className="relative z-10 p-12 text-white text-center">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Ready to Transform Your Training?
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Join thousands of athletes who trust our equipment for their calisthenics journey
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button 
                  className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Gift className="w-5 h-5" />
                  View Bundles
                </motion.button>
                <motion.button 
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-5 h-5" />
                  Join Community
                </motion.button>
              </motion.div>

              {/* Trust Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50,000+</div>
                  <div className="text-emerald-100">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <div className="text-emerald-100">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-emerald-100">Expert Support</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ================================
// ENHANCED EXERCISE DETAIL PAGE
// ================================

export const ExerciseDetailPage = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Mock exercise data
      const mockExercise = {
        id: exerciseId,
        name: "Push-up",
        category: "Upper Body",
        difficulty: "Beginner",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        description: "A classic bodyweight exercise that builds upper body strength.",
        instructions: [
          "Start in a plank position with hands shoulder-width apart",
          "Lower your body until your chest nearly touches the floor",
          "Push back up to the starting position",
          "Keep your core engaged throughout the movement"
        ],
        tips: [
          "Keep your body in a straight line",
          "Don't let your hips sag",
          "Control the movement",
          "Breathe out on the way up"
        ],
        progressions: ["Wall Push-up", "Knee Push-up", "Standard Push-up", "Diamond Push-up"],
        reps: "3 sets of 8-12 reps",
        image: "/api/placeholder/600/400"
      };
      setExercise(mockExercise);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [exerciseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600">Loading exercise details...</p>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Exercise not found</h1>
          <p className="text-gray-600">The exercise you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-4">{exercise.name}</h1>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {exercise.category}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {exercise.difficulty}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {exercise.reps}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Exercise Image */}
              <div className="space-y-6">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <img 
                    src={exercise.image} 
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Muscle Groups */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Muscles</h3>
                  <div className="flex flex-wrap gap-2">
                    {exercise.muscleGroups.map((muscle) => (
                      <span key={muscle} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exercise Details */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{exercise.description}</p>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
                  <ol className="space-y-2">
                    {exercise.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pro Tips</h3>
                  <ul className="space-y-2">
                    {exercise.tips.map((tip, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle className="flex-shrink-0 w-5 h-5 text-emerald-500 mt-0.5" />
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progressions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Progressions</h3>
                  <div className="space-y-2">
                    {exercise.progressions.map((progression, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-gray-900 font-medium">{progression}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ================================
// OTHER COMPONENTS (CategorySection, ProgressSection, etc.)
// ================================

export const ExerciseCategorySection = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Exercise Categories</h1>
        <p className="text-gray-600">Browse exercises by category...</p>
      </div>
    </div>
  );
};

export const ProgressSection = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Progress Tracker</h1>
        <p className="text-gray-600">Track your fitness progress...</p>
      </div>
    </div>
  );
};

export const CommunitySection = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Community</h1>
        <p className="text-gray-600">Connect with other athletes...</p>
      </div>
    </div>
  );
};

export const LeaderboardSection = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Leaderboard</h1>
        <p className="text-gray-600">See how you rank...</p>
      </div>
    </div>
  );
};

// ================================
// PRODUCT DETAIL PAGE
// ================================

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <span className="text-emerald-600 font-medium capitalize">{product.category}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < product.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.review_count} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {product.discount_price ? (
                  <>
                    <span className="text-3xl font-bold text-emerald-600">₹{product.discount_price}</span>
                    <span className="text-xl text-gray-500 line-through">₹{product.price}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ================================
// CONTACT PAGE COMPONENT
// ================================

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    lookingFor: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        lookingFor: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-900 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-emerald-200 max-w-3xl mx-auto">
              Ready to transform your fitness journey? Get in touch with our team of experts.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're looking for personalized training programs, corporate wellness solutions, 
                or partnership opportunities, our team is here to help you achieve your fitness goals.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900">Phone</h3>
                  <p className="text-gray-600">+91 8504848159</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900">Email</h3>
                  <p className="text-gray-600">maroof@dominionvault.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900">Address</h3>
                  <p className="text-gray-600">
                    Upcoming Location<br />
                    Mumbai, Maharashtra<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900">Office Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Meet Our Team</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Maroof Akhtar</p>
                    <p className="text-sm text-gray-600">Founder & Lead Fitness Consultant</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization/University
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="IIT Bombay, Corporate, etc."
                />
              </div>

              {/* Looking For */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you looking for?
                </label>
                <select
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="personal-training">Personal Training</option>
                  <option value="group-classes">Group Classes</option>
                  <option value="corporate-wellness">Corporate Wellness</option>
                  <option value="nutrition-consultation">Nutrition Consultation</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="general-inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell us about your fitness goals and how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
                >
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                >
                  <p className="font-medium">Error sending message.</p>
                  <p className="text-sm">Please try again or contact us directly.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6">
            <h3 className="text-2xl font-bold">Visit Our Mumbai Location</h3>
            <p className="text-emerald-100">Experience our state-of-the-art facilities at Marine Drive</p>
          </div>
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">Marine Drive Fitness Center, Mumbai</p>
              <p className="text-sm mt-2">19.0760° N, 72.8777° E</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper functions
export const isExerciseUnlocked = (exerciseId, userProgress) => {
  // Mock implementation
  return true;
};

export const getProgressData = (exercises, userProgress) => {
  // Mock implementation
  return {
    completedExercises: 15,
    totalExercises: 50,
    skillsUnlocked: 8,
    streakDays: 7
  };
};