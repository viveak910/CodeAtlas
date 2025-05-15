import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProfileStats } from '../services/api';
import { Profile as ProfileStatsType } from '../types';
import ProfileStats from '../components/ProfileStats';
import PerformanceGraphs from '../components/PerformanceGraphs';
import { ArrowLeft, User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [stats, setStats] = useState<ProfileStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usernames, setUsernames] = useState({
    leetcode: '',
    codeforces: ''
  });

  useEffect(() => {
    const fetchProfileStats = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const fetchedStats = await getProfileStats(userId);
        setStats(fetchedStats);

        // Assuming `getProfileStats` returns the necessary usernames
        setUsernames({
          leetcode: fetchedStats.leetcodeUsername || `${userId}_leetcode`, // Default fallback
          codeforces: fetchedStats.codeforcesUsername || `${userId}_cf`,  // Default fallback
        });
      } catch (err) {
        console.error('Failed to fetch profile stats:', err);
        setError('Failed to load profile statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileStats();
  }, [userId]);

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 inline-block">
          Profile not found. Invalid user ID.
        </div>
        <Link to="/leaderboard" className="text-navy-800 hover:underline">
          Return to Leaderboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/leaderboard" className="inline-flex items-center text-navy-800 hover:text-navy-600 transition-colors">
          <ArrowLeft size={18} className="mr-1" />
          Back to Leaderboard
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-navy-100 p-4 rounded-full mr-4">
            <User className="text-navy-800" size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-900">
              {userId}'s Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Competitive programming statistics and performance
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {stats && !loading && (
        <div className="space-y-8">
          <ProfileStats 
            stats={stats} 
            username={usernames}
            loading={loading} 
          />
          
          <PerformanceGraphs stats={stats} />
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy-800"></div>
          <span className="ml-4 text-lg text-gray-600">Loading profile...</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
