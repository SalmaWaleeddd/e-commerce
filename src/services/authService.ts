// services/authService.ts
import { SignupFormData, LoginFormData, User } from '@/types';
import { AuthStorage } from '@/utils/auth.storage';
import { config } from '@/config';

interface AuthResponse {
  token?: string;
  user: User;
}
const { baseUrl } = config.api;
export class AuthService {
  static async signup(formData: SignupFormData): Promise<AuthResponse> {
    try {
      // 1. Create user in FakeStore API ( for demo persistence)
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password
        })
      });

      let apiUser;
      if (response.ok) {
        apiUser = await response.json();
      }
      
      // 2. Create local user object
      const user: User = {
        id: apiUser?.id || Date.now(),
        username: formData.username,
        email: formData.email
      };
      
      // 3. Generate mock token
      const mockToken = `mock_token_${Date.now()}_${user.id}`;
      
      return {
        token: mockToken,
        user
      };
      
    } catch (error) {
      // If API fails, still create user locally for demo
      console.log('API signup failed, using local auth');
      
      const user: User = {
        id: Date.now(),
        username: formData.username,
        email: formData.email
      };
      
      const mockToken = `mock_token_${Date.now()}_${user.id}`;
      
      return {
        token: mockToken,
        user
      };
    }
  }

  static async login(formData: LoginFormData): Promise<AuthResponse> {
    // 1. First try to get from localStorage (mock auth)
    const storedUser = AuthStorage.getUser();
    
    if (storedUser && storedUser.username === formData.username) {
      // User exists in localStorage, "log them in"
      const mockToken = `mock_token_${Date.now()}_${storedUser.id}`;
      return {
        token: mockToken,
        user: storedUser
      };
    }
    
    // 2. Try FakeStore API (it accepts any username/password)
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // 3. Create user from successful API response
      const user: User = {
        id: Date.now(), // FakeStore doesn't return user ID
        username: formData.username,
        email: `${formData.username}@demo.com` // Mock email
      };
      
      return {
        token: data.token || `mock_token_${Date.now()}`,
        user
      };
      
    } catch (error) {
      // 4. If all fails, create a new demo user
      const user: User = {
        id: Date.now(),
        username: formData.username,
        email: `${formData.username}@demo.com`
      };
      
      const mockToken = `mock_token_${Date.now()}_${user.id}`;
      
      return {
        token: mockToken,
        user
      };
    }
  }

  static async logout(): Promise<void> {
    // Clear local storage
    AuthStorage.clear();
    
    // NOTE: No real API logout endpoint in FakeStore
    // await fetch('/auth/logout', { method: 'POST' });
  }
}