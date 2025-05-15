import React from 'react';
import { Profile } from '../types'; // Import the new Profile interface
import { User, Award, TrendingUp, ListChecks, BarChart, Target } from 'lucide-react';

interface ProfileStatsProps {
  stats: Profile;  // Use the updated Profile interface
  username: {
    leetcode: string;
    codeforces: string;
  };
  loading: boolean;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats, username, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LeetCode Stats Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#F89F1B] text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">LeetCode Stats</h3>
              <a 
                href={`https://leetcode.com/${username.leetcode}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline flex items-center"
              >
                Visit Profile <span className="ml-1">→</span>
              </a>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Award className="text-[#F89F1B] mr-2" size={20} />
                <span className="text-gray-600">Ranking</span>
              </div>
              <span className="font-semibold text-navy-900">#{stats.lcRanking}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="text-[#F89F1B] mr-2" size={20} />
                <span className="text-gray-600">Contest Rating</span>
              </div>
              <span className="font-semibold text-navy-900">{stats.lcAcceptanceRate || 'N/A'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <ListChecks className="text-[#F89F1B] mr-2" size={20} />
                <span className="text-gray-600">Total Solved</span>
              </div>
              <span className="font-semibold text-navy-900">{stats.lcTotalSolved}</span>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-600 mb-3">Problems Solved by Difficulty</h4>
              <div className="flex space-x-4">
                <div className="flex-1 bg-green-50 rounded-md p-3 text-center">
                  <div className="text-green-600 font-semibold text-xl">{stats.lcEasySolved}</div>
                  <div className="text-xs text-gray-500 mt-1">Easy</div>
                </div>
                <div className="flex-1 bg-yellow-50 rounded-md p-3 text-center">
                  <div className="text-yellow-600 font-semibold text-xl">{stats.lcMediumSolved}</div>
                  <div className="text-xs text-gray-500 mt-1">Medium</div>
                </div>
                <div className="flex-1 bg-red-50 rounded-md p-3 text-center">
                  <div className="text-red-600 font-semibold text-xl">{stats.lcHardSolved}</div>
                  <div className="text-xs text-gray-500 mt-1">Hard</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CodeForces Stats Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#1F8ACB] text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">CodeForces Stats</h3>
              <a 
                href={`https://codeforces.com/profile/${username.codeforces}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline flex items-center"
              >
                Visit Profile <span className="ml-1">→</span>
              </a>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <User className="text-[#1F8ACB] mr-2" size={20} />
                <span className="text-gray-600">Rank</span>
              </div>
              <span className="font-semibold text-navy-900">{stats.cfRank}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <BarChart className="text-[#1F8ACB] mr-2" size={20} />
                <span className="text-gray-600">Current Rating</span>
              </div>
              <span className="font-semibold text-navy-900">{stats.cfRating}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Target className="text-[#1F8ACB] mr-2" size={20} />
                <span className="text-gray-600">Max Rating</span>
              </div>
              <span className="font-semibold text-navy-900">{stats.cfMaxRating}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Award className="text-[#1F8ACB] mr-2" size={20} />
                <span className="text-gray-600">Contest Count</span>
              </div>
              <span className="font-semibold text-navy-900">{stats.cfRank}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <ListChecks className="text-[#1F8ACB] mr-2" size={20} />
                <span className="text-gray-600">Problems Solved</span>
              </div>
              <span className="font-semibold text-navy-900">{stats.cfRank}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
