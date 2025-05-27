import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  RadialBarChart, 
  RadialBar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart,
  Bar
} from 'recharts';
import { exerciseCategories, getExercisesByCategory, getExerciseById } from './data/exercises';

// Enhanced Hero Section inspired by Ventriloc
export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZW1lcmFsZCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse"></div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-32 right-16 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        {/* Main heading with enhanced typography */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent leading-tight">
            Master Your Body
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        {/* Enhanced subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-3xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Join the elite community of calisthenics athletes. Track your progress, master advanced skills, and achieve extraordinary strength through progressive bodyweight training.
        </motion.p>

        {/* Enhanced stats section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
            <div className="text-3xl font-bold text-emerald-400 mb-2">500+</div>
            <div className="text-gray-300">Active Athletes</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
            <div className="text-3xl font-bold text-emerald-400 mb-2">70+</div>
            <div className="text-gray-300">Progressive Skills</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
            <div className="text-3xl font-bold text-emerald-400 mb-2">15+</div>
            <div className="text-gray-300">Universities</div>
          </div>
        </motion.div>

        {/* Enhanced CTA buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button 
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
          <motion.button 
            className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Categories
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center"
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Exercise Categories Section
export const ExerciseCategoriesSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Master Every Movement
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Progress through our comprehensive skill system designed by movement experts and backed by science
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exerciseCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 transform hover:-translate-y-2">
                <div className={`text-4xl mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-semibold">
                    {category.totalExercises} Exercises
                  </span>
                  <div className="text-emerald-400 transform group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Leaderboard Component
export const LeaderboardSection = () => {
  const globalLeaders = [
    { rank: 1, name: 'Maroof Akhtar', points: 5420, university: 'IIT Bombay', level: 'Elite', streak: 45 },
    { rank: 2, name: 'Alex Rodriguez', points: 5280, university: 'IIT Delhi', level: 'Elite', streak: 32 },
    { rank: 3, name: 'Sarah Chen', points: 4950, university: 'IIT Kanpur', level: 'Advanced', streak: 28 },
    { rank: 4, name: 'David Kim', points: 4720, university: 'IIT Bombay', level: 'Advanced', streak: 22 },
    { rank: 5, name: 'Maya Patel', points: 4560, university: 'IIT Kharagpur', level: 'Advanced', streak: 19 }
  ];

  const universityStats = [
    { name: 'IIT Bombay', members: 156, avgPoints: 3420, color: 'emerald' },
    { name: 'IIT Delhi', members: 142, avgPoints: 3280, color: 'cyan' },
    { name: 'IIT Kanpur', members: 98, avgPoints: 3150, color: 'blue' },
    { name: 'IIT Kharagpur', members: 87, avgPoints: 2980, color: 'purple' }
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Global Leaderboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compete with athletes worldwide and climb the ranks in your university community
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Global Rankings */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                🏆 Top Global Athletes
              </h3>
              <div className="space-y-4">
                {globalLeaders.map((leader, index) => (
                  <motion.div
                    key={leader.rank}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30' :
                      index === 1 ? 'bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-gray-400/30' :
                      index === 2 ? 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/30' :
                      'bg-gray-800 border-gray-600 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-500 text-white' :
                          'bg-emerald-500 text-white'
                        }`}>
                          {leader.rank}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">{leader.name}</div>
                          <div className="text-sm text-gray-400">{leader.university}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-400 text-lg">{leader.points.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">{leader.streak} day streak</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* University Stats */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                🏛️ University Rankings
              </h3>
              <div className="space-y-3">
                {universityStats.map((uni, index) => (
                  <motion.div
                    key={uni.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gray-800 rounded-lg border border-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-white text-sm">{uni.name}</span>
                      <span className="text-emerald-400 font-bold">{uni.avgPoints}</span>
                    </div>
                    <div className="text-xs text-gray-400">{uni.members} members</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">🔥 This Week</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Most Active</span>
                  <span className="text-emerald-400 font-semibold">IIT Bombay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Top Gainers</span>
                  <span className="text-emerald-400 font-semibold">156 Athletes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">New Records</span>
                  <span className="text-emerald-400 font-semibold">23 Skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Shop Section without pricing
export const ShopSection = ({ products = [] }) => {
  const cardboardImage = "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8";
  
  return (
    <div className="bg-gray-900 rounded-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Training Equipment</h2>
        <p className="text-gray-300">Professional gear for serious athletes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 6).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="aspect-square bg-gray-700 relative overflow-hidden">
              <img 
                src={cardboardImage} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {product.category && (
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {product.category.toUpperCase()}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {product.rating > 0 && (
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-300 ml-1">{product.rating}</span>
                    </div>
                  )}
                  {product.stock_quantity && (
                    <span className="text-xs text-emerald-400">In Stock</span>
                  )}
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
          View All Equipment
        </button>
      </div>
    </div>
  );
};

// Exercise Category Detail Page
export const ExerciseCategoryDetail = ({ categoryId }) => {
  const category = exerciseCategories.find(cat => cat.id === categoryId);
  const exercises = getExercisesByCategory(categoryId);
  
  if (!category) return <div>Category not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{category.description}</p>
          <div className="text-emerald-400 font-semibold">
            Muscle Focus: {category.muscle_focus}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  exercise.level === 1 ? 'bg-green-500/20 text-green-400' :
                  exercise.level === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                  exercise.level === 3 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  Level {exercise.level}
                </div>
                <div className="text-sm text-gray-400">
                  {exercise.archivedDate}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{exercise.name}</h3>
              <p className="text-gray-300 mb-4">{exercise.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="text-sm text-emerald-400 font-semibold">Phase: {exercise.phase}</div>
                {exercise.demoVideoPlaceholder && (
                  <div className="bg-gray-700 rounded p-3 text-center text-sm text-gray-400">
                    📹 Demo Video Coming Soon
                  </div>
                )}
              </div>
              
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition-colors">
                View Exercise Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Exercise Detail Page
export const ExerciseDetail = ({ exerciseId, onBack }) => {
  const exercise = getExerciseById(exerciseId);
  
  if (!exercise) return <div>Exercise not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
        >
          ← Back to Category
        </button>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              exercise.level === 1 ? 'bg-green-500/20 text-green-400' :
              exercise.level === 2 ? 'bg-yellow-500/20 text-yellow-400' :
              exercise.level === 3 ? 'bg-orange-500/20 text-orange-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              Level {exercise.level}
            </div>
            <div className="text-gray-400">Archived: {exercise.archivedDate}</div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{exercise.name}</h1>
          <p className="text-xl text-gray-300 mb-6">{exercise.description}</p>
          
          <div className="mb-8 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="text-emerald-400 font-semibold mb-2">Training Phase</div>
            <div className="text-white">{exercise.phase}</div>
          </div>

          {/* Demo Video Placeholder */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Demo Video</h3>
            <div className="bg-gray-700 rounded-xl p-12 text-center border-2 border-dashed border-gray-600">
              <div className="text-4xl mb-4">📹</div>
              <div className="text-gray-300 text-lg">Demo video will be uploaded soon</div>
              <div className="text-gray-500 text-sm mt-2">Check back for detailed movement demonstrations</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Prerequisites */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Prerequisites</h3>
              <ul className="space-y-3">
                {exercise.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Benefits</h3>
              <ul className="space-y-3">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progressive Steps */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Progressive Steps</h3>
            <div className="space-y-4">
              {exercise.progressionSteps.map((step, index) => (
                <div key={index} className="bg-gray-700 rounded-xl p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      {index + 1}
                    </div>
                    <div className="font-semibold text-emerald-400">Step {index + 1}</div>
                  </div>
                  <p className="text-gray-300 ml-11">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Common Mistakes to Avoid</h3>
            <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
              <ul className="space-y-3">
                {exercise.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-400 mr-3 text-xl">⚠️</span>
                    <span className="text-gray-300">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metrics */}
          {exercise.metrics && (
            <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-4">Target Metrics</h3>
              <div className="space-y-2">
                {exercise.metrics.isometric && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Target Hold Time:</span>
                    <span className="text-emerald-400 font-semibold">{exercise.metrics.isometric.targetHold}</span>
                  </div>
                )}
                {exercise.metrics.dynamic && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Rep Range:</span>
                    <span className="text-emerald-400 font-semibold">{exercise.metrics.dynamic.repRange}</span>
                  </div>
                )}
                {exercise.metrics.dynamic?.weightTarget && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Weight Target:</span>
                    <span className="text-emerald-400 font-semibold">{exercise.metrics.dynamic.weightTarget}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Rest of existing components (ProgressChart, ProductCard, etc.) remain the same...
export const ProgressChart = ({ data, title }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={data}>
          <RadialBar dataKey="value" cornerRadius={10} fill="#10b981" />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ProductCard = ({ product }) => {
  const cardboardImage = "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
    >
      <div className="aspect-square bg-gray-700 relative overflow-hidden">
        <img 
          src={cardboardImage} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          {product.category?.toUpperCase()}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.rating > 0 && (
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-300 ml-1">{product.rating}</span>
              </div>
            )}
            <span className="text-xs text-emerald-400">In Stock</span>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const SignupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl p-8 max-w-md w-full border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Join the Community</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              University/Institution
            </label>
            <select className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-emerald-500 focus:outline-none transition-colors">
              <option value="">Select your institution</option>
              <option value="iit-bombay">IIT Bombay</option>
              <option value="iit-delhi">IIT Delhi</option>
              <option value="iit-kanpur">IIT Kanpur</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              City
            </label>
            <select className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-emerald-500 focus:outline-none transition-colors">
              <option value="">Select your city</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Join Community
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export const getProgressData = (exercises, userProgress) => {
  return exercises.map(exercise => ({
    ...exercise,
    unlocked: isExerciseUnlocked(exercise.id, userProgress)
  }));
};

export const isExerciseUnlocked = (exerciseId, userProgress) => {
  // Simple unlock logic - in real app this would be more complex
  return userProgress.unlockedExercises?.includes(exerciseId) || false;
};

export const getMockUserProgress = () => {
  return {
    level: "Intermediate",
    points: 2450,
    skillsUnlocked: 23,
    nextSkill: "Front Lever",
    nextSkillProgress: 65,
    unlockedExercises: ['wall-handstand-holds', 'box-headstand-pushups', 'german-hang-entries'],
    strengthProfile: [
      { category: 'Horizontal Pull', value: 75 },
      { category: 'Vertical Pull', value: 68 },
      { category: 'Horizontal Push', value: 82 },
      { category: 'Vertical Push', value: 71 },
      { category: 'Core', value: 88 },
      { category: 'Legs', value: 64 }
    ],
    weeklyProgress: [
      { day: 'Mon', points: 120 },
      { day: 'Tue', points: 180 },
      { day: 'Wed', points: 150 },
      { day: 'Thu', points: 200 },
      { day: 'Fri', points: 175 },
      { day: 'Sat', points: 220 },
      { day: 'Sun', points: 190 }
    ],
    streakDays: 12
  };
};