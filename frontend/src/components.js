import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  Trophy, 
  Target,
  ChevronRight,
  Star,
  BookOpen,
  Zap,
  ArrowRight,
  CheckCircle,
  X,
  Menu,
  Play,
  TrendingUp,
  Award,
  Globe,
  UserCheck,
  Lock,
  Unlock,
  Timer,
  RotateCcw,
  Home,
  ArrowLeft,
  ExternalLink,
  ShoppingCart,
  Heart,
  Filter,
  Search,
  Grid,
  List,
  Package,
  ShoppingBag,
  Minus,
  Plus,
  Eye
} from 'lucide-react';
import { RadialBarChart, RadialBar, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { 
  exercises, 
  exerciseCategories, 
  skillLevels, 
  mockUserProgress, 
  getExercisesByCategory, 
  isExerciseUnlocked,
  getNextUnlockableExercises 
} from './data/exercises';

// Header Component
export const Header = ({ activeSection, setActiveSection, showSignup, setShowSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'categories', label: 'Exercise Categories', path: '/categories' },
    { id: 'progress', label: 'Progress Tracker', path: '/progress' },
    { id: 'community', label: 'Community', path: '/community' },
    { id: 'leaderboard', label: 'Leaderboard', path: '/leaderboard' },
    { id: 'shop', label: 'Shop', path: '/shop' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    navigate(item.path);
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-gradient-to-r from-emerald-900/95 to-green-800/95 backdrop-blur-lg border-b border-emerald-700/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation({ id: 'home', path: '/' })}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Dominion</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-emerald-300' 
                    : 'text-gray-200 hover:text-emerald-300'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={() => setShowSignup(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:from-emerald-600 hover:to-green-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${
                    activeSection === item.id 
                      ? 'text-emerald-300 bg-emerald-800/50' 
                      : 'text-gray-200 hover:text-emerald-300 hover:bg-emerald-800/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setShowSignup(true);
                  setIsMenuOpen(false);
                }}
                className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                Join Community
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// Hero Section Component
export const HeroSection = ({ setShowSignup }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/4803717/pexels-photo-4803717.jpeg" 
          alt="Calisthenics Training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-green-800/85 to-emerald-900/90"></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400 rotate-45"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-green-400 rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-emerald-300 rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-white">Together</span>
              <span className="text-emerald-400">,</span>
              <span className="text-white"> we turn</span>
              <br />
              <span className="text-white">effort into </span>
              <span className="text-emerald-400">strength</span>
              <span className="text-emerald-400">.</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Master bodyweight fitness through community-driven progression tracking. 
              Connect with athletes from your university and city.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setShowSignup(true)}
            className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          {/* Demo Video Area */}
          <motion.div
            className="relative mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="relative bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 backdrop-blur-sm p-8 hover:from-emerald-700/50 hover:to-green-800/50 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-white text-xl font-semibold mb-2">Progressive Skills Tracking</h3>
                  <p className="text-gray-300">Visualize your journey from basic exercises to advanced skills</p>
                </div>
                <motion.button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-8 h-8" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Exercise Categories Section
export const ExerciseCategoriesSection = () => {
  const navigate = useNavigate();
  
  const categories = Object.values(exerciseCategories).map(category => ({
    ...category,
    exercises: getExercisesByCategory(category.id),
    completedCount: getExercisesByCategory(category.id).filter(ex => 
      mockUserProgress[ex.id]?.status === 'completed'
    ).length,
    totalCount: getExercisesByCategory(category.id).length
  }));

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: 'from-emerald-600 to-green-700',
      green: 'from-green-600 to-emerald-700', 
      teal: 'from-teal-600 to-emerald-700',
      cyan: 'from-cyan-600 to-teal-700',
      lime: 'from-lime-600 to-green-700',
      forest: 'from-green-700 to-emerald-800'
    };
    return colorMap[color] || 'from-emerald-600 to-green-700';
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-emerald-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Master the <span className="text-emerald-400">Six Pillars</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Progress through comprehensive skill trees in each fundamental movement category
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 cursor-pointer"
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${getColorClasses(category.color)}/60 to-transparent`}></div>
                
                {/* Progress overlay */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold">
                    {category.completedCount}/{category.totalCount}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{category.name}</h3>
                <p className="text-gray-300 mb-4">{category.description}</p>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round((category.completedCount / category.totalCount) * 100)}%</span>
                  </div>
                  <div className="bg-emerald-900/50 rounded-full h-2">
                    <motion.div 
                      className={`bg-gradient-to-r ${getColorClasses(category.color)} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(category.completedCount / category.totalCount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                <motion.button
                  className={`w-full bg-gradient-to-r ${getColorClasses(category.color)} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center space-x-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore Skills</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skill Tree Visualization Component
export const SkillTree = ({ categoryId }) => {
  const exercises = getExercisesByCategory(categoryId);
  const category = exerciseCategories[categoryId];
  
  const skillsByLevel = {
    beginner: exercises.filter(ex => ex.skillLevel === 'beginner'),
    intermediate: exercises.filter(ex => ex.skillLevel === 'intermediate'),
    advanced: exercises.filter(ex => ex.skillLevel === 'advanced'),
    elite: exercises.filter(ex => ex.skillLevel === 'elite')
  };

  const getSkillLevelColor = (level) => {
    const colorMap = {
      beginner: 'bg-green-500',
      intermediate: 'bg-blue-500', 
      advanced: 'bg-yellow-500',
      elite: 'bg-orange-500'
    };
    return colorMap[level] || 'bg-gray-500';
  };

  const getSkillStatus = (exerciseId) => {
    const progress = mockUserProgress[exerciseId];
    if (!progress) return isExerciseUnlocked(exerciseId) ? 'unlocked' : 'locked';
    return progress.status;
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">{category.name} Skill Tree</h2>
        <p className="text-gray-300">{category.description}</p>
      </div>

      <div className="space-y-12">
        {Object.entries(skillsByLevel).map(([level, levelExercises]) => (
          <div key={level} className="relative">
            <div className="flex items-center mb-6">
              <div className={`w-4 h-4 rounded-full ${getSkillLevelColor(level)} mr-3`}></div>
              <h3 className="text-2xl font-bold text-white capitalize">{level}</h3>
              <div className="ml-4 text-sm text-gray-400">
                {levelExercises.filter(ex => getSkillStatus(ex.id) === 'completed').length} / {levelExercises.length} completed
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelExercises.map((exercise, index) => {
                const status = getSkillStatus(exercise.id);
                const progress = mockUserProgress[exercise.id];
                
                return (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-xl border border-emerald-600/30 p-4 transition-all duration-300 cursor-pointer ${
                      status === 'locked' ? 'opacity-50' : 'hover:border-emerald-400/50 hover:scale-105'
                    }`}
                    onClick={() => status !== 'locked' && navigate(`/exercise/${exercise.id}`)}
                  >
                    {/* Status indicator */}
                    <div className="absolute top-2 right-2">
                      {status === 'locked' && <Lock className="w-4 h-4 text-gray-500" />}
                      {status === 'unlocked' && <Unlock className="w-4 h-4 text-yellow-500" />}
                      {status === 'current' && <Timer className="w-4 h-4 text-blue-500" />}
                      {status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>

                    <h4 className="text-white font-semibold mb-2 pr-6">{exercise.name}</h4>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{exercise.description}</p>
                    
                    {/* Progress bar for current exercise */}
                    {status === 'current' && progress?.progress && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{progress.progress}%</span>
                        </div>
                        <div className="bg-emerald-900/50 rounded-full h-1">
                          <div 
                            className="bg-emerald-400 h-1 rounded-full transition-all duration-500"
                            style={{ width: `${progress.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Completion info */}
                    {status === 'completed' && progress && (
                      <div className="text-xs text-green-400">
                        ✓ Completed on {new Date(progress.completedDate).toLocaleDateString()}
                      </div>
                    )}

                    {/* Prerequisites */}
                    {exercise.prerequisites && exercise.prerequisites.length > 0 && (
                      <div className="text-xs text-gray-500 mt-2">
                        Requires: {exercise.prerequisites.join(', ')}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Connection lines between levels */}
            {level !== 'elite' && (
              <div className="absolute left-2 top-full w-0.5 h-8 bg-emerald-600/30"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Exercise Detail Page Component
export const ExerciseDetail = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const exercise = exercises[exerciseId];
  const progress = mockUserProgress[exerciseId];
  
  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Exercise Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const status = progress?.status || (isExerciseUnlocked(exerciseId) ? 'unlocked' : 'locked');
  const category = exerciseCategories[exercise.category];
  const skillLevel = skillLevels[exercise.skillLevel];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation breadcrumb */}
        <div className="flex items-center space-x-2 text-gray-400 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-emerald-400 transition-colors">
            <Home className="w-4 h-4" />
          </button>
          <ChevronRight className="w-4 h-4" />
          <button 
            onClick={() => navigate(`/category/${exercise.category}`)}
            className="hover:text-emerald-400 transition-colors"
          >
            {category.name}
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{exercise.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video and main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Exercise header */}
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{exercise.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      skillLevel.color === 'green' ? 'bg-green-500 text-white' :
                      skillLevel.color === 'blue' ? 'bg-blue-500 text-white' :
                      skillLevel.color === 'yellow' ? 'bg-yellow-500 text-black' :
                      'bg-orange-500 text-white'
                    }`}>
                      {skillLevel.name}
                    </span>
                    <span className="text-gray-400">{category.name}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  {status === 'completed' && <CheckCircle className="w-8 h-8 text-green-500" />}
                  {status === 'current' && <Timer className="w-8 h-8 text-blue-500" />}
                  {status === 'unlocked' && <Unlock className="w-8 h-8 text-yellow-500" />}
                  {status === 'locked' && <Lock className="w-8 h-8 text-gray-500" />}
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed">{exercise.description}</p>
            </div>

            {/* Demo video */}
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 overflow-hidden">
              <div className="p-6 border-b border-emerald-600/30">
                <h3 className="text-2xl font-bold text-white mb-2">Exercise Demonstration</h3>
                <p className="text-gray-300">Watch the proper form and technique</p>
              </div>
              <div className="aspect-video">
                <iframe
                  src={exercise.demoVideo}
                  title={`${exercise.name} demonstration`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Step-by-Step Instructions</h3>
              <ol className="space-y-4">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <span className="text-gray-300 leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips and Mistakes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-800/50 to-emerald-900/50 rounded-2xl border border-emerald-600/30 p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  Pro Tips
                </h4>
                <ul className="space-y-2">
                  {exercise.tips.map((tip, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-2xl border border-red-600/30 p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  <X className="w-5 h-5 mr-2 text-red-400" />
                  Common Mistakes
                </h4>
                <ul className="space-y-2">
                  {exercise.commonMistakes.map((mistake, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress card */}
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
              <h4 className="text-xl font-bold text-white mb-4">Your Progress</h4>
              
              {status === 'completed' && progress && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Completed!</span>
                  </div>
                  <div className="text-gray-300 text-sm">
                    Completed on {new Date(progress.completedDate).toLocaleDateString()}
                  </div>
                  {progress.holdTime && (
                    <div className="text-gray-300 text-sm">
                      Best hold: {progress.holdTime}
                    </div>
                  )}
                  {progress.reps && (
                    <div className="text-gray-300 text-sm">
                      Best performance: {progress.reps}
                    </div>
                  )}
                </div>
              )}

              {status === 'current' && progress && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Timer className="w-5 h-5" />
                    <span className="font-semibold">In Progress</span>
                  </div>
                  <div className="text-gray-300 text-sm">
                    Started on {new Date(progress.startedDate).toLocaleDateString()}
                  </div>
                  {progress.progress && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progress.progress}%</span>
                      </div>
                      <div className="bg-emerald-900/50 rounded-full h-2">
                        <div 
                          className="bg-emerald-400 h-2 rounded-full transition-all"
                          style={{ width: `${progress.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {status === 'unlocked' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Unlock className="w-5 h-5" />
                    <span className="font-semibold">Ready to Start</span>
                  </div>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition-colors">
                    Begin Training
                  </button>
                </div>
              )}

              {status === 'locked' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Lock className="w-5 h-5" />
                    <span className="font-semibold">Locked</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Complete prerequisite exercises to unlock this skill.
                  </p>
                </div>
              )}
            </div>

            {/* Prerequisites */}
            {exercise.prerequisites && exercise.prerequisites.length > 0 && (
              <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
                <h4 className="text-xl font-bold text-white mb-4">Prerequisites</h4>
                <div className="space-y-2">
                  {exercise.prerequisites.map(prereqId => {
                    const prereq = exercises[prereqId];
                    const prereqStatus = mockUserProgress[prereqId]?.status || 'locked';
                    
                    return (
                      <div key={prereqId} className="flex items-center justify-between p-2 bg-emerald-900/30 rounded-lg">
                        <span className="text-gray-300 text-sm">{prereq?.name}</span>
                        {prereqStatus === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {prereqStatus !== 'completed' && <X className="w-4 h-4 text-red-500" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
              <h4 className="text-xl font-bold text-white mb-4">Exercise Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Difficulty:</span>
                  <span className="text-white">{skillLevel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{category.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Order:</span>
                  <span className="text-white">#{exercise.progressionOrder}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Community Section
export const CommunitySection = ({ setShowSignup }) => {
  const communityStats = [
    { number: "25,000+", label: "Active Athletes", icon: Users },
    { number: "500+", label: "Universities", icon: BookOpen },
    { number: "150+", label: "Countries", icon: Globe },
    { number: "1M+", label: "Skills Unlocked", icon: Trophy }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-900 to-green-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Build Your <span className="text-emerald-400">Strength Community</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with fellow athletes from your university and city. Share progress, 
              compete in challenges, and grow stronger together.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {communityStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => setShowSignup(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-green-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Your Community
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1472722266948-a898ab5ff257"
              alt="Fitness Community"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-green-800/20 rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Sign-up Modal Component (keeping the existing implementation)
export const SignupModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    university: '',
    city: '',
    fitnessLevel: '',
    goals: []
  });

  const totalSteps = 4;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
    setCurrentStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      university: '',
      city: '',
      fitnessLevel: '',
      goals: []
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-emerald-900 to-green-900 rounded-2xl border border-emerald-600/30 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-green-800 p-6 border-b border-emerald-600/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Join Dominion</h2>
                <p className="text-emerald-200">Step {currentStep} of {totalSteps}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-emerald-800 rounded-full h-2">
              <motion.div
                className="bg-emerald-400 h-2 rounded-full"
                initial={{ width: "25%" }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact & Location */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact & Location</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                          placeholder="your.email@university.edu"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">University</label>
                          <input
                            type="text"
                            value={formData.university}
                            onChange={(e) => handleInputChange('university', e.target.value)}
                            className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                            placeholder="Harvard University"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                            placeholder="Boston, MA"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Physical Stats */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Physical Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
                        <input
                          type="number"
                          value={formData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                          placeholder="175"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
                        <input
                          type="number"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                          placeholder="70"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Fitness Level</label>
                      <select
                        value={formData.fitnessLevel}
                        onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
                        className="w-full bg-emerald-800/50 border border-emerald-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="">Select your level</option>
                        <option value="beginner">Beginner (0-6 months)</option>
                        <option value="intermediate">Intermediate (6 months - 2 years)</option>
                        <option value="advanced">Advanced (2+ years)</option>
                        <option value="elite">Elite (Competitive level)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Goals & Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Your Goals</h3>
                    <p className="text-gray-300 mb-4">Select all that apply:</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Master Pull-ups',
                        'Learn Handstand',
                        'Achieve Muscle-up',
                        'Build Core Strength',
                        'Improve Flexibility',
                        'Compete in Events',
                        'Community Connection',
                        'Weight Management'
                      ].map((goal) => (
                        <motion.button
                          key={goal}
                          onClick={() => handleGoalToggle(goal)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            formData.goals.includes(goal)
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-emerald-800/50 border-emerald-600/30 text-gray-300 hover:border-emerald-400'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2">
                            {formData.goals.includes(goal) && (
                              <CheckCircle className="w-4 h-4 text-emerald-200" />
                            )}
                            <span className="text-sm">{goal}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-emerald-800/30 p-6 border-t border-emerald-600/30">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-700 text-white hover:bg-emerald-600'
                }`}
              >
                Previous
              </button>

              {currentStep === totalSteps ? (
                <motion.button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Dominion
                </motion.button>
              ) : (
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ================================
// SHOP COMPONENTS
// ================================

// 3D Product Viewer Component
const Product3DViewer = ({ modelUrl, productName }) => {
  const meshRef = useRef();
  
  // Simple rotating cube as placeholder since actual GLB models would need to be loaded
  const RotatingBox = () => {
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      }
    });

    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#10b981" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
    );
  };

  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow
          />
          <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <RotatingBox />
          </PresentationControls>
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -1.4, 0]}
            opacity={0.75}
            width={10}
            height={10}
            blur={2.6}
            far={2}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onViewProduct, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Discount Badge */}
        {product.discount_price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            SALE
          </div>
        )}
        
        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          <Heart size={16} fill={isLiked ? 'white' : 'none'} />
        </button>
        
        {/* Quick View Button */}
        <button
          onClick={() => onViewProduct(product)}
          className="absolute bottom-3 right-3 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors"
        >
          <Eye size={16} />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs text-gray-600 ml-1">
              {product.rating} ({product.review_count})
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Pricing */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {product.discount_price ? (
              <>
                <span className="text-lg font-bold text-emerald-600">
                  ${product.discount_price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.stock_quantity > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewProduct(product)}
            className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock_quantity === 0}
            className="flex-1 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 disabled:bg-gray-300 transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Categories Component
const CategorySection = ({ selectedCategory, setSelectedCategory, subcategory, setSubcategory }) => {
  const categories = [
    { 
      id: 'all', 
      label: 'All Products',
      icon: '🏋️',
      description: 'Complete equipment collection',
      subcategories: []
    },
    { 
      id: 'equipment', 
      label: 'Equipment',
      icon: '⚙️',
      description: 'Professional training gear',
      subcategories: [
        { id: 'resistance-systems', label: 'Resistance & Support', count: 3 },
        { id: 'parallettes', label: 'Parallettes', count: 3 },
        { id: 'suspension-training', label: 'Rings & Suspension', count: 1 },
        { id: 'weighted-training', label: 'Weighted Training', count: 3 }
      ]
    },
    { 
      id: 'accessories', 
      label: 'Accessories',
      icon: '🎯',
      description: 'Grip and support gear',
      subcategories: [
        { id: 'grip-enhancement', label: 'Grip Enhancement', count: 2 }
      ]
    },
    { 
      id: 'apparel', 
      label: 'Apparel',
      icon: '👕',
      description: 'Performance and lifestyle wear',
      subcategories: [
        { id: 'performance-wear', label: 'Performance Wear', count: 1 },
        { id: 'competition-wear', label: 'Competition Wear', count: 1 },
        { id: 'lifestyle-wear', label: 'Lifestyle Wear', count: 2 }
      ]
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Main Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSubcategory('all');
              }}
              className={`group p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className={`font-semibold text-sm md:text-base mb-2 ${
                selectedCategory === category.id ? 'text-emerald-700' : 'text-gray-900'
              }`}>
                {category.label}
              </h3>
              <p className="text-xs text-gray-600">{category.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {selectedCategoryData && selectedCategoryData.subcategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="border-t pt-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedCategoryData.label} Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSubcategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                subcategory === 'all'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All {selectedCategoryData.label}
            </button>
            {selectedCategoryData.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSubcategory(sub.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  subcategory === sub.id
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sub.label}
                <span className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">
                  {sub.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Skill-Based Bundles Component
const SkillBundles = ({ onSelectBundle }) => {
  const bundles = [
    {
      id: 'beginner-starter',
      name: 'Beginner Starter Kit',
      description: 'Perfect for starting your calisthenics journey',
      image: 'https://images.pexels.com/photos/7672096/pexels-photo-7672096.jpeg',
      products: ['premium-resistance-bands', 'elastic-bands-warmup', 'liquid-chalk-pro'],
      originalPrice: 81.97,
      bundlePrice: 69.97,
      level: 'beginner'
    },
    {
      id: 'muscle-up-mastery',
      name: 'Muscle-Up Mastery Bundle',
      description: 'Everything you need to achieve your first muscle-up',
      image: 'https://images.pexels.com/photos/6787172/pexels-photo-6787172.jpeg',
      products: ['workout-rings-set', 'premium-resistance-bands', 'liquid-chalk-pro'],
      originalPrice: 146.97,
      bundlePrice: 124.97,
      level: 'intermediate'
    },
    {
      id: 'handstand-hero',
      name: 'Handstand Hero Bundle',
      description: 'Master handstands with professional equipment',
      image: 'https://images.pexels.com/photos/9944851/pexels-photo-9944851.jpeg',
      products: ['parallettes-premium-set', 'wrist-wraps-performance', 'grip-tape-professional'],
      originalPrice: 222.97,
      bundlePrice: 189.97,
      level: 'advanced'
    },
    {
      id: 'weighted-warrior',
      name: 'Weighted Warrior Set',
      description: 'Take your training to the next level with weighted resistance',
      image: 'https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3ZWlnaHQlMjB2ZXN0fGVufDB8fHxibGFja3wxNzQ4Mzc1ODM5fDA&ixlib=rb-4.1.0&q=85',
      products: ['elite-weight-vest-10kg', 'premium-dip-belt', 'performance-training-tee'],
      originalPrice: 244.97,
      bundlePrice: 209.97,
      level: 'elite'
    }
  ];

  const getLevelColor = (level) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-blue-100 text-blue-800',
      advanced: 'bg-purple-100 text-purple-800',
      elite: 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Skill-Based Bundles</h2>
        <p className="text-gray-600 text-lg">Curated equipment packages for your training level</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bundles.map((bundle) => (
          <motion.div
            key={bundle.id}
            className="group cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => onSelectBundle(bundle)}
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={bundle.image} 
                  alt={bundle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${getLevelColor(bundle.level)}`}>
                    {bundle.level}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Save ${(bundle.originalPrice - bundle.bundlePrice).toFixed(2)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{bundle.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{bundle.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-emerald-600">${bundle.bundlePrice}</span>
                    <span className="text-sm text-gray-500 line-through">${bundle.originalPrice}</span>
                  </div>
                  <span className="text-xs text-gray-500">{bundle.products.length} items</span>
                </div>
                
                <button className="w-full bg-emerald-500 text-white py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
                  View Bundle
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Shop Header Component
const ShopHeader = ({ searchQuery, setSearchQuery, viewMode, setViewMode, selectedCategory, setSelectedCategory, subcategory, setSubcategory, onToggleFilters, filtersOpen }) => {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg"
          alt="Shop Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-lg text-white">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Premium Calisthenics Gear
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl mb-6 text-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Transform your training with professional equipment designed by athletes, for athletes.
              </motion.p>
              <motion.button 
                className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Filters Toggle */}
            <button
              onClick={onToggleFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter size={20} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Shop Page Component
export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const navigate = useNavigate();

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

  // Enhanced filtering with subcategories
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubcategory = subcategory === 'all' || product.subcategory === subcategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
  });

  // Enhanced sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const handleViewProduct = (product) => {
    navigate(`/shop/product/${product.id}`);
  };

  const handleAddToCart = (product) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product.name);
  };

  const handleSelectBundle = (bundle) => {
    console.log('Selected bundle:', bundle.name);
    // TODO: Implement bundle selection
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 text-lg">Loading premium gear...</p>
        </div>
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
          subcategory={subcategory}
          setSubcategory={setSubcategory}
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sort Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'featured', label: 'Featured' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest Rated' },
                      { value: 'newest', label: 'Newest' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={sortBy === option.value}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="text-emerald-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      ${priceRange[0]} - ${priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Stock Status */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="text-emerald-500" defaultChecked />
                      <span className="text-gray-700">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="text-emerald-500" />
                      <span className="text-gray-700">Out of Stock</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
          <div className="text-sm text-gray-500">
            {searchQuery && `Results for "${searchQuery}"`}
          </div>
        </div>

        {/* Enhanced Products Grid */}
        <motion.div 
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
          layout
        >
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onViewProduct={handleViewProduct}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced No Products Found */}
        {sortedProducts.length === 0 && !loading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Package size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSubcategory('all');
                setPriceRange([0, 500]);
              }}
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Call to Action Section */}
        {sortedProducts.length > 0 && (
          <motion.div
            className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Training?</h2>
            <p className="text-lg mb-6 text-emerald-100">
              Join thousands of athletes who trust our equipment for their calisthenics journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                View Training Programs
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
                Contact Support
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Product Detail Page Component
export const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          navigate('/shop');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <button onClick={() => navigate('/shop')} className="hover:text-emerald-600">
            Shop
          </button>
          <ChevronRight size={16} />
          <span className="capitalize">{product.category}</span>
          <ChevronRight size={16} />
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images & 3D Viewer */}
          <div className="space-y-6">
            {/* 3D Product Viewer */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">3D Product View</h3>
              <Product3DViewer modelUrl={product.assets_3d.model_url} productName={product.name} />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Click and drag to rotate • Scroll to zoom
              </p>
            </div>

            {/* Traditional Images */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full capitalize">
                  {product.category}
                </span>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                {product.discount_price ? (
                  <>
                    <span className="text-3xl font-bold text-emerald-600">
                      ${product.discount_price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      Save ${(product.price - product.discount_price).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.long_description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.specifications.dimensions && (
                  <div>
                    <span className="font-medium text-gray-900">Dimensions:</span>
                    <span className="text-gray-600 ml-2">{product.specifications.dimensions}</span>
                  </div>
                )}
                {product.specifications.weight && (
                  <div>
                    <span className="font-medium text-gray-900">Weight:</span>
                    <span className="text-gray-600 ml-2">{product.specifications.weight}</span>
                  </div>
                )}
                {product.specifications.material && (
                  <div>
                    <span className="font-medium text-gray-900">Material:</span>
                    <span className="text-gray-600 ml-2">{product.specifications.material}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Color Options */}
            {product.specifications.color_options.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Color Options</h3>
                <div className="flex gap-2">
                  {product.specifications.color_options.map((color, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:border-emerald-500"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Quantity:</span>
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
                
                <div className={`text-sm px-3 py-1 rounded-full ${
                  product.stock_quantity > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock_quantity > 0 
                    ? `${product.stock_quantity} in stock` 
                    : 'Out of stock'
                  }
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-600 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
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
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-gray-600">+91 87654 32109</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900">Email</h3>
                  <p className="text-gray-600">info@dominion.fit</p>
                  <p className="text-gray-600">support@dominion.fit</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900">Address</h3>
                  <p className="text-gray-600">
                    Marine Drive Fitness Center<br />
                    Nariman Point, Mumbai 400021<br />
                    Maharashtra, India
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
                    <p className="font-semibold text-emerald-900">Maroof Singh</p>
                    <p className="text-sm text-gray-600">Lead Fitness Consultant - IIT Bombay</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">V</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Vishal Sharma</p>
                    <p className="text-sm text-gray-600">Nutrition Specialist - IIT Delhi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Aryan Patel</p>
                    <p className="text-sm text-gray-600">Training Program Director - IIT Kanpur</p>
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