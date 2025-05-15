import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, UserPlus, Code2 } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-soft backdrop-blur-sm bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <Code2 className="text-primary-500 transition-transform duration-300 transform group-hover:rotate-12" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              CodeTracker
            </span>
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50 font-medium' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <UserPlus size={20} />
              <span>Add Profile</span>
            </Link>
            
            <Link 
              to="/leaderboard" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/leaderboard')
                  ? 'text-primary-600 bg-primary-50 font-medium'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Trophy size={20} />
              <span>Leaderboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;