import React from 'react';
import ProfileForm from '../components/ProfileForm';
import { BarChart3, Star, Code, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">
          Competitive Coding Profile Tracker
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track, analyze, and compare your competitive programming journey across platforms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <BarChart3 className="text-amber-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900">Track Your Progress</h3>
              <p className="text-gray-600 mt-1">
                Visualize your coding journey with beautiful graphs and detailed statistics
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <Star className="text-teal-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900">Compare with Peers</h3>
              <p className="text-gray-600 mt-1">
                See how you rank against others on our dynamic leaderboard
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Code className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900">Multiple Platforms</h3>
              <p className="text-gray-600 mt-1">
                Track your performance across LeetCode and CodeForces in one place
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900">Skill Development</h3>
              <p className="text-gray-600 mt-1">
                Identify your strengths and areas for improvement
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;