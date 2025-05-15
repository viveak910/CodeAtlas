import React, { useState, useEffect } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import { getProfiles } from '../services/api';
import { Profile } from '../types';
import { Trophy, Users } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const fetchedProfiles = await getProfiles();
        setProfiles(fetchedProfiles);
      } catch (err) {
        console.error('Failed to fetch profiles:', err);
        setError('Failed to load profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 flex items-center">
            <Trophy className="mr-3 text-amber-500" size={32} />
            Competitive Coding Leaderboard
          </h1>
          <p className="text-gray-600 mt-2">
            Compare performance across platforms and see how you rank
          </p>
        </div>
        
        <div className="bg-gray-100 px-4 py-2 rounded-lg">
          <div className="flex items-center text-gray-700">
            <Users className="mr-2 text-navy-800" size={18} />
            <span className="font-medium">{profiles.length}</span>
            <span className="ml-1">Coders</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <LeaderboardTable profiles={profiles} loading={loading} />
    </div>
  );
};

export default LeaderboardPage;