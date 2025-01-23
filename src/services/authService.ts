import api from '@/lib/axios';

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ProfileData {
  name?: string;
  email?: string;
  password?: string;
}

export const authService = {
  signup: async (data: SignupData) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  updateProfile: async (data: ProfileData) => {
    const response = await api.put('/auth/update-profile', data);
    return response.data;
  },
};