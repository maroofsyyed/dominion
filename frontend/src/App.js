import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  ExerciseCategoriesSection, 
  CommunitySection, 
  SignupModal 
} from './components';

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
    { rank: 1, name: 'Alex Chen', university: 'MIT', points: 5420, city: 'Cambridge' },
    { rank: 2, name: 'Sarah Johnson', university: 'Harvard', points: 5180, city: 'Boston' },
    { rank: 3, name: 'Mike Rodriguez', university: 'Stanford', points: 4950, city: 'Palo Alto' },
    { rank: 4, name: 'Emma Thompson', university: 'Berkeley', points: 4720, city: 'Berkeley' },
    { rank: 5, name: 'David Kim', university: 'Caltech', points: 4560, city: 'Pasadena' }
  ];

  // Progress Tracker Section
  const ProgressSection = () => (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-6">Your Progress Journey</h2>
          <p className="text-xl text-gray-300">Track your evolution from beginner to elite athlete</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Stats Cards */}
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

          {/* Next Skill Card */}
          <div className="bg-gradient-to-br from-green-800/50 to-emerald-900/50 rounded-2xl border border-emerald-600/30 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Next Challenge</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">{mockProgressData.nextSkill}</div>
              <div className="text-gray-300 mb-4">85% Progress</div>
              <div className="bg-emerald-800 rounded-full h-3 mb-4">
                <div className="bg-emerald-400 h-3 rounded-full w-[85%]"></div>
              </div>
              <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all">
                Train Now
              </button>
            </div>
          </div>

          {/* Achievement Card */}
          <div className="bg-gradient-to-br from-emerald-800/50 to-green-900/50 rounded-2xl border border-emerald-600/30 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Recent Achievement</h3>
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-lg font-semibold text-emerald-400 mb-2">Pull-up Master</div>
              <div className="text-gray-300 text-sm">Completed 15 consecutive pull-ups</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

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
                <div 
                  key={athlete.rank}
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
                </div>
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
            <h3 className="text-2xl font-bold text-white mb-6">Harvard University</h3>
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
            <h3 className="text-2xl font-bold text-white mb-6">Boston, MA</h3>
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
                <span className="text-emerald-400 font-semibold">Boston Common</span>
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
              { user: "Alex M.", action: "unlocked Front Lever", time: "2 hours ago", university: "MIT" },
              { user: "Sarah K.", action: "completed 50 push-ups challenge", time: "4 hours ago", university: "Harvard" },
              { user: "Mike R.", action: "achieved new handstand PR", time: "6 hours ago", university: "BU" },
              { user: "Emma T.", action: "joined Boston meetup group", time: "1 day ago", university: "Northeastern" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-emerald-700/30 rounded-lg">
                <div>
                  <span className="font-semibold text-white">{activity.user}</span>
                  <span className="text-gray-300"> {activity.action}</span>
                  <div className="text-sm text-gray-400">{activity.university} • {activity.time}</div>
                </div>
                <div className="text-emerald-400">🎉</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div>
            <HeroSection setShowSignup={setShowSignup} />
            <ExerciseCategoriesSection />
            <CommunitySection setShowSignup={setShowSignup} />
          </div>
        );
      case 'categories':
        return <ExerciseCategoriesSection />;
      case 'progress':
        return <ProgressSection />;
      case 'community':
        return <CommunityMainSection />;
      case 'leaderboard':
        return <LeaderboardSection />;
      default:
        return (
          <div>
            <HeroSection setShowSignup={setShowSignup} />
            <ExerciseCategoriesSection />
            <CommunitySection setShowSignup={setShowSignup} />
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        showSignup={showSignup}
        setShowSignup={setShowSignup}
      />
      
      {renderSection()}
      
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)} 
      />
    </div>
  );
}

export default App;