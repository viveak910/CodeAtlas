import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProfile } from '../services/api';
import { UserPlus, AlertCircle, Code2, Trophy, GraduationCap } from 'lucide-react';

interface FormData {
  userId: string;
  leetcodeUsername: string;
  codeforcesUsername: string;
  college: string;
}

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    leetcodeUsername: '',
    codeforcesUsername: '',
    college: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.userId || !formData.leetcodeUsername || !formData.codeforcesUsername || !formData.college) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      await addProfile(formData);
      navigate('/leaderboard');
    } catch (err) {
      console.log(err);
      setError('Failed to add profile. Please verify your handles and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8 max-w-md w-full mx-auto backdrop-blur-sm bg-opacity-90">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800 mb-3">Add Your Profile</h2>
        <p className="text-gray-600">Join the competitive programming community</p>
      </div>

      {error && (
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 mb-6 flex items-start">
          <AlertCircle className="text-accent-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-accent-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="userId" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Code2 size={18} className="mr-2 text-primary-500" />
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Choose a unique identifier"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="leetcodeUsername" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Trophy size={18} className="mr-2 text-secondary-500" />
            LeetCode Username
          </label>
          <input
            type="text"
            id="leetcodeUsername"
            name="leetcodeUsername"
            value={formData.leetcodeUsername}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-400 focus:border-secondary-400 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Your LeetCode handle"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="codeforcesUsername" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Trophy size={18} className="mr-2 text-accent-500" />
            CodeForces Username
          </label>
          <input
            type="text"
            id="codeforcesUsername"
            name="codeforcesUsername"
            value={formData.codeforcesUsername}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-400 focus:border-accent-400 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Your CodeForces handle"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="college" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <GraduationCap size={18} className="mr-2 text-primary-500" />
            College/University
          </label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Your institution"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-glow ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <UserPlus size={20} />
          <span>{loading ? 'Adding Profile...' : 'Add Profile'}</span>
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;