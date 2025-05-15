import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { Search, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface LeaderboardTableProps {
  profiles: Profile[];
  loading: boolean;
}

type SortField = 'userId' | 'lcHandle' | 'cfHandle' | 'college' | 'cfRating';
type SortOrder = 'asc' | 'desc';

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ profiles, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('cfRating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.userId.toLowerCase().includes(searchLower) ||
      profile.lcHandle.toLowerCase().includes(searchLower) ||
      profile.cfHandle.toLowerCase().includes(searchLower) ||
      profile.college.toLowerCase().includes(searchLower)
    );
  });

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortField === 'cfRating') {
      return sortOrder === 'asc' ? a.cfRating - b.cfRating : b.cfRating - a.cfRating;
    }

    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-800"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {sortedProfiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No profiles match your search' : 'No profiles available'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('userId')}
                >
                  <div className="flex items-center space-x-1">
                    <span>User ID</span>
                    {getSortIcon('userId')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lcHandle')}
                >
                  <div className="flex items-center space-x-1">
                    <span>LeetCode</span>
                    {getSortIcon('lcHandle')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('cfHandle')}
                >
                  <div className="flex items-center space-x-1">
                    <span>CodeForces</span>
                    {getSortIcon('cfHandle')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('college')}
                >
                  <div className="flex items-center space-x-1">
                    <span>College</span>
                    {getSortIcon('college')}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('cfRating')}
                >
                  <div className="flex items-center space-x-1">
                    <span>CF Rating</span>
                    {getSortIcon('cfRating')}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProfiles.map((profile) => (
                <tr key={profile.userId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-navy-900">{profile.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {profile.lcHandle}
                      <a 
                        href={`https://leetcode.com/${profile.lcHandle}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block ml-2 text-gray-400 hover:text-navy-800"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {profile.cfHandle}
                      <a 
                        href={`https://codeforces.com/profile/${profile.cfHandle}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block ml-2 text-gray-400 hover:text-navy-800"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{profile.college}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/profile/${profile.userId}`}
                      className="text-teal-600 hover:text-teal-900 transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;