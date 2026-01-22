// components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { ButtonSpinner } from '@/components/common/Spinner';
import { useAuth } from '@/contexts/AuthContext';
import { validateLoginForm } from '@/utils/auth.validation';
import type { LoginFormData, LoginValidationErrors } from '@/types';


interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login, error: authError, clearError, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [localError, setLocalError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear field-specific error when user types
    if (errors[name as keyof LoginValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear local errors
    if (localError) setLocalError('');
    if (authError) clearError();
  };

  // Validate individual field on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate the field
    const { errors: validationErrors } = validateLoginForm(formData);
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name as keyof LoginValidationErrors]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = validateLoginForm(formData);
    console.log('Validation result:', validationResult);
  console.log('Form data:', formData);
    
    // Mark all fields as touched to show all errors
    setTouched({
      username: true,
      password: true
    });
    
    // Validate entire form
    const { isValid, errors: validationErrors } = validateLoginForm(formData);
    setErrors(validationErrors);
    
    // Check if form is valid
    if (!isValid) {
      setLocalError('Please fix the errors in the form');
      return;
    }
    
    try {
      // Use auth context to handle login
      await login(formData);
      
      // Success - navigation handled by context or props
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/products');
      }
      
    } catch (err) {
      // Error is already handled by context, but we can show a local message too
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setLocalError(errorMessage);
    }
  };

  const displayError = localError || authError;
  const isSubmitDisabled = authLoading || !validateLoginForm(formData).isValid;

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
        
        {displayError && (
          <ErrorMessage
            message={displayError}
            type="error"
            className="mb-4"
            showClose
            onClose={() => {
              setLocalError('');
              clearError();
            }}
          />
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                touched.username && errors.username ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your username"
              disabled={authLoading}
              autoComplete="username"
            />
            {touched.username && errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                touched.password && errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
              disabled={authLoading}
              autoComplete="current-password"
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
                Forgot password?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full text-white py-2.5 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center ${
              isSubmitDisabled
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {authLoading ? (
              <>
                <ButtonSpinner />
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;