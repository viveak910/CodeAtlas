import { Profile,  UserHandle } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export const addProfile = async (UserHandle: UserHandle): Promise<Profile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserHandle),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data =  await response.json();
    return data ; 
    
  } catch (error) {
    console.error('Failed to add profile:', error);
    throw error;
  }
};

export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch profiles:', error);
    throw error;
  }
};

export const getProfileStats = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${userId}/stats`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Failed to fetch profile stats:', error);
    throw error;
  }
};