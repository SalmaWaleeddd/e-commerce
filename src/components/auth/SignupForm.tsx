// components/auth/SignupForm.tsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { ButtonSpinner } from '@/components/common/Spinner';
import { useAuth } from '@/contexts/AuthContext';
import { validateSignupForm } from '@/utils/auth.validation';
import type { SignupFormData, SignupValidationErrors } from '@/types';

interface SignupFormProps {
  onSuccess?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { signup, error: authError, clearError, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<SignupValidationErrors>({});
  const [localError, setLocalError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user types
    if (errors[name as keyof SignupValidationErrors]) {
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
    
    // For password confirmation, we need both password fields
    if (name === 'confirmPassword' || name === 'password') {
      const { errors: validationErrors } = validateSignupForm(formData);
      setErrors(validationErrors);
    } else {
      // For other fields, just validate that specific field
      const { errors: validationErrors } = validateSignupForm({
        ...formData,
        [name]: formData[name as keyof SignupFormData]
      });
      setErrors(prev => ({
        ...prev,
        [name]: validationErrors[name as keyof SignupValidationErrors]
      }));
    }
  };

    const { isValid: isFormValid } = useMemo(() => {
    return validateSignupForm(formData);
  }, [formData]);
  const isSubmitDisabled = authLoading || !isFormValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate entire form
    const { isValid, errors: validationErrors } = validateSignupForm(formData);
    setErrors(validationErrors);
    
    // Check if form is valid
    if (!isValid) {
      setLocalError('Please fix the errors in the form');
      return;
    }
    
    try {
      // Use auth context to handle signup
      await signup(formData);
      
      // Success - navigation handled by context or props
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/products');
      }
      
    } catch (err) {
      // Error is already handled by context, but we can show a local message too
      const errorMessage = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setLocalError(errorMessage);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
        
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
                errors.username ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your username"
              disabled={authLoading}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              disabled={authLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="At least 6 characters"
              disabled={authLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              disabled={authLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
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
          <span className="ml-2">Creating Account...</span>
        </>
      ) : (
        'Sign Up'
      )}
    </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-800 font-medium"
              disabled={authLoading}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;