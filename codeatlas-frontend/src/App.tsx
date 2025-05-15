import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </main>
        <footer className="bg-navy-900 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Competitive Coding Profile Tracker</p>
            <p className="text-gray-400 text-sm mt-1">Track your coding journey across platforms</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;