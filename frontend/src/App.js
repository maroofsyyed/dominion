import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { 
  Header, 
  HeroSection, 
  ExerciseCategoriesSection, 
  CommunitySection, 
  SignupModal,
  SkillTree,
  ExerciseDetail,
  ShopPage,
  ProductDetailPage
} from './components';
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { motion } from 'framer-motion';
import { exerciseCategories, getExercisesByCategory, mockUserProgress } from './data/exercises';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSignup, setShowSignup] = useState(false);

  // Mock data for different sections
  const mockProgressData = {
    currentLevel: 'Intermediate',
    totalPoints: 2450,
    streak: 12,
    skillsUnlocked: 23,
    nextSkill: 'Front Lever'
  };

  const mockLeaderboard = [
    { rank: 1, name: 'Maroof Singh', university: 'Indian Institute of Technology, Bombay', points: 5420, city: 'Mumbai' },
    { rank: 2, name: 'Vishal Sharma', university: 'Indian Institute of Technology, Delhi', points: 5180, city: 'Mumbai' },
    { rank: 3, name: 'Aryan Patel', university: 'Indian Institute of Technology, Kanpur', points: 4950, city: 'Mumbai' },
    { rank: 4, name: 'Anish Kumar', university: 'Indian Institute of Technology, Roorkee', points: 4720, city: 'Mumbai' },
    { rank: 5, name: 'Rahul Gupta', university: 'Indian Institute of Technology, Kharagpur', points: 4560, city: 'Mumbai' }
  ];

  // Enhanced Progress Dashboard with Charts
  const ProgressSection = () => {
    const strengthData = [
      { name: 'Horizontal Pull', current: 65, max: 100, color: '#10b981' },
      { name: 'Vertical Pull', current: 78, max: 100, color: '#059669' },
      { name: 'Horizontal Push', current: 45, max: 100, color: '#047857' },
      { name: 'Vertical Push', current: 52, max: 100, color: '#065f46' },
      { name: 'Core', current: 71, max: 100, color: '#064e3b' },
      { name: 'Legs', current: 83, max: 100, color: '#0f766e' }
    ];

    const weeklyProgress = [
      { day: 'Mon', skills: 2 },
      { day: 'Tue', skills: 1 },
      { day: 'Wed', skills: 3 },
      { day: 'Thu', skills: 1 },
      { day: 'Fri', skills: 2 },
      { day: 'Sat', skills: 4 },
      { day: 'Sun', skills: 2 }
    ];

    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-6">Your Progress Journey</h2>
            <p className="text-xl text-gray-300">Track your evolution from beginner to elite athlete</p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Current Stats */}
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Current Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Level:</span>
                  <span className="text-emerald-400 font-semibold">{mockProgressData.currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Points:</span>
                  <span className="text-emerald-400 font-semibold">{mockProgressData.totalPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Streak:</span>
                  <span className="text-emerald-400 font-semibold">{mockProgressData.streak} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Skills Unlocked:</span>
                  <span className="text-emerald-400 font-semibold">{mockProgressData.skillsUnlocked}</span>
                </div>
              </div>
            </div>

            {/* Strength Radar Chart */}
            <div className="bg-gradient-to-br from-green-800/50 to-emerald-900/50 rounded-2xl border border-emerald-600/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Strength Profile</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={strengthData}>
                  <RadialBar dataKey="current" cornerRadius={10} fill="#10b981" />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {/* Next Challenge */}
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Next Challenge</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{mockProgressData.nextSkill}</div>
                <div className="text-gray-300 mb-4">85% Progress</div>
                <div className="bg-emerald-800 rounded-full h-3 mb-4">
                  <motion.div 
                    className="bg-emerald-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
                <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all">
                  Train Now
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Weekly Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#064e3b',
                    border: '1px solid #10b981',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="skills" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Progress */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengthData.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-xl border border-emerald-600/30 p-6"
              >
                <h4 className="text-white font-semibold mb-3">{category.name}</h4>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{category.current}%</span>
                </div>
                <div className="bg-emerald-900/50 rounded-full h-2">
                  <motion.div 
                    className="bg-emerald-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.current}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Category Page Component
  const CategoryPage = () => {
    const location = useLocation();
    const categoryId = location.pathname.split('/').pop();
    const category = exerciseCategories[categoryId];
    
    if (!category) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
        <SkillTree categoryId={categoryId} />
      </div>
    );
  };

  // Leaderboard Section
  const LeaderboardSection = () => (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-6">Global Leaderboard</h2>
          <p className="text-xl text-gray-300">See how you rank among elite athletes worldwide</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 overflow-hidden">
          <div className="p-6 border-b border-emerald-600/30">
            <h3 className="text-2xl font-bold text-white">Top Performers This Month</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockLeaderboard.map((athlete, index) => (
                <motion.div 
                  key={athlete.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all hover:bg-emerald-700/30 ${
                    index < 3 ? 'bg-gradient-to-r from-emerald-600/20 to-green-600/20' : 'bg-emerald-800/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      index === 2 ? 'bg-orange-500 text-orange-900' :
                      'bg-emerald-600 text-white'
                    }`}>
                      {athlete.rank}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{athlete.name}</div>
                      <div className="text-sm text-gray-300">{athlete.university} • {athlete.city}</div>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold text-lg">{athlete.points}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Community Section Component
  const CommunityMainSection = () => (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-6">Your Fitness Community</h2>
          <p className="text-xl text-gray-300">Connect, compete, and grow with athletes from your area</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* University Community */}
          <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Indian Institute of Technology, Bombay</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Active Members:</span>
                <span className="text-emerald-400 font-semibold">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">This Week's Challenge:</span>
                <span className="text-emerald-400 font-semibold">100 Pull-ups</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Your Rank:</span>
                <span className="text-emerald-400 font-semibold">#23</span>
              </div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all">
                View University Leaderboard
              </button>
            </div>
          </div>

          {/* City Community */}
          <div className="bg-gradient-to-br from-green-800/50 to-emerald-900/50 rounded-2xl border border-emerald-600/30 p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Mumbai, Maharashtra</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Active Athletes:</span>
                <span className="text-emerald-400 font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Upcoming Meetup:</span>
                <span className="text-emerald-400 font-semibold">Saturday 2PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Location:</span>
                <span className="text-emerald-400 font-semibold">Marine Drive</span>
              </div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all">
                Join City Group
              </button>
            </div>
          </div>
        </div>

        {/* Recent Community Activity */}
        <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
          <h3 className="text-2xl font-bold text-white mb-6">Recent Community Activity</h3>
          <div className="space-y-4">
            {[
              { user: "Arjun M.", action: "unlocked Front Lever", time: "2 hours ago", university: "IIT Bombay" },
              { user: "Priya K.", action: "completed 50 push-ups challenge", time: "4 hours ago", university: "IIT Delhi" },
              { user: "Rohan R.", action: "achieved new handstand PR", time: "6 hours ago", university: "IIT Kanpur" },
              { user: "Sneha T.", action: "joined Mumbai meetup group", time: "1 day ago", university: "IIT Roorkee" }
            ].map((activity, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-emerald-700/30 rounded-lg"
              >
                <div>
                  <span className="font-semibold text-white">{activity.user}</span>
                  <span className="text-gray-300"> {activity.action}</span>
                  <div className="text-sm text-gray-400">{activity.university} • {activity.time}</div>
                </div>
                <div className="text-emerald-400">🎉</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="App">
      <Router>
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
        
        <Routes>
          <Route path="/" element={
            <div>
              <HeroSection setShowSignup={setShowSignup} />
              <ExerciseCategoriesSection />
              <CommunitySection setShowSignup={setShowSignup} />
            </div>
          } />
          <Route path="/categories" element={<ExerciseCategoriesSection />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/exercise/:exerciseId" element={<ExerciseDetail />} />
          <Route path="/progress" element={<ProgressSection />} />
          <Route path="/community" element={<CommunityMainSection />} />
          <Route path="/leaderboard" element={<LeaderboardSection />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/product/:productId" element={<ProductDetailPage />} />
        </Routes>
        
        <SignupModal 
          isOpen={showSignup} 
          onClose={() => setShowSignup(false)} 
        />
      </Router>
    </div>
  );
}

export default App;