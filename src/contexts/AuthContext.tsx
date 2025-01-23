import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { authService, LoginData, SignupData, ProfileData } from '@/services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  updateProfile: (data: ProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      localStorage.setItem('adminToken', response.token);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout",
      });
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const response = await authService.signup(data);
      localStorage.setItem('adminToken', response.token);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create account",
      });
    }
  };

  const updateProfile = async (data: ProfileData) => {
    try {
      await authService.updateProfile(data);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};