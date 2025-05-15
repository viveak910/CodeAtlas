import React from 'react';
import { Profile } from '../types';

interface PerformanceGraphsProps {
  stats: Profile;
}

const PerformanceGraphs: React.FC<PerformanceGraphsProps> = ({ stats }) => {
  // Calculate LeetCode completion percentages
  const leetcodeTotal = stats.lcTotalSolved;
  const easyPercentage = Math.round((stats.lcEasySolved / leetcodeTotal) * 100) || 0;
  const mediumPercentage = Math.round((stats.lcMediumSolved / leetcodeTotal) * 100) || 0;
  const hardPercentage = Math.round((stats.lcHardSolved / leetcodeTotal) * 100) || 0;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-navy-900 mb-6">Performance Summary</h2>
      
      <div className="space-y-8">
        {/* LeetCode Problems Distribution */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">LeetCode Problems Distribution</h3>
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div 
                className="bg-green-500 transition-all duration-500 ease-out" 
                style={{ width: `${easyPercentage}%` }}
                title={`Easy: ${stats.lcEasySolved} (${easyPercentage}%)`}
              ></div>
              <div 
                className="bg-yellow-500 transition-all duration-500 ease-out" 
                style={{ width: `${mediumPercentage}%` }}
                title={`Medium: ${stats.lcMediumSolved} (${mediumPercentage}%)`}
              ></div>
              <div 
                className="bg-red-500 transition-all duration-500 ease-out" 
                style={{ width: `${hardPercentage}%` }}
                title={`Hard: ${stats.lcHardSolved} (${hardPercentage}%)`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Easy ({stats.lcEasySolved})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <span>Medium ({stats.lcMediumSolved})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Hard ({stats.lcHardSolved})</span>
            </div>
          </div>
        </div>
        
        {/* CodeForces Rating Progress */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">CodeForces Rating</h3>
          <div className="relative h-16 flex items-end">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <span className="text-xl font-bold text-navy-900">{stats.cfRating}</span>
                <span className="block text-xs text-gray-500">Current Rating</span>
              </div>
            </div>
            
            {/* Rating visualization */}
            <div className="relative w-full h-8 bg-gray-100 rounded-md overflow-hidden">
              {/* This would ideally be a more complex visualization with proper scaling */}
              <div 
                className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ 
                  width: `${Math.min(100, (stats.cfRating / 3000) * 100)}%`,
                }}
              ></div>
              <div 
                className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-purple-400 to-purple-600"
                style={{ 
                  width: `${Math.min(100, (stats.cfMaxRating / 3000) * 100)}%`,
                  opacity: 0.3
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>0</span>
            <span>1000</span>
            <span>2000</span>
            <span>3000+</span>
          </div>
          <div className="flex justify-end mt-1">
            <div className="flex items-center text-xs text-gray-600">
              <div className="w-3 h-3 rounded-full bg-purple-500 opacity-30 mr-1"></div>
              <span>Max: {stats.cfMaxRating}</span>
            </div>
          </div>
        </div>
        
        {/* Competitive Stats Comparison */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Problem-Solving Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">{stats.lcTotalSolved}</div>
              <div className="text-sm text-gray-500 mt-1">LeetCode Problems</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.cfRating}</div>
              <div className="text-sm text-gray-500 mt-1">CodeForces Problems</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraphs;
