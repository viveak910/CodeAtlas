import { Profile } from '../types';
import { mockProfiles } from '../mock/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock validation response
const mockValidateHandles = async (userId: string, lcHandle: string, cfHandle: string) => {
  await delay(800);
  return {
    userId,
    lcHandle,
    cfHandle,
    isValid: true,
  };
};

// Mock profile data fetch
const mockFetchProfileData = async (lcHandle: string, cfHandle: string) => {
  await delay(1000);
  return {
    cfRating: 1022,
    cfMaxRating: 1061,
    cfRank: "newbie",
    cfMaxRank: "newbie",
    lcTotalSolved: 219,
    lcTotalQuestions: 3526,
    lcEasySolved: 64,
    lcMediumSolved: 132,
    lcHardSolved: 23,
    lcAcceptanceRate: 61.46,
    lcRanking: 527627,
  };
};

export const addProfile = async (profile: Omit<Profile, 'id'>): Promise<Profile> => {
  await delay(800);
  
  // Simulate handle validation
  const validation = await mockValidateHandles(profile.userId, profile.lcHandle, profile.cfHandle);
  if (!validation.isValid) {
    throw new Error('Invalid handles');
  }

  // Simulate fetching profile data
  const profileData = await mockFetchProfileData(profile.lcHandle, profile.cfHandle);
  
  // Combine user input with fetched profile data
  const newProfile: Profile = {
    ...profile,
    ...profileData,
  };
  
  console.log('Profile added:', newProfile);
  return newProfile;
};

export const getProfiles = async (): Promise<Profile[]> => {
  await delay(1000);
  return mockProfiles;
};

export const getProfileStats = async (userId: string): Promise<Profile> => {
  await delay(1200);
  const profile = mockProfiles.find(p => p.userId === userId);
  if (!profile) {
    throw new Error('Profile not found');
  }
  return profile;
};