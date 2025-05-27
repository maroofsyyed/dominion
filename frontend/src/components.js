import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
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
  ExternalLink
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
    { id: 'leaderboard', label: 'Leaderboard', path: '/leaderboard' }
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