// types/auth.ts
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  signup: (formData: SignupFormData) => Promise<void>;
  login: (formData: LoginFormData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface SignupValidationErrors {
  username?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

export interface LoginValidationErrors {
  username?: string | null;
  password?: string | null;
}