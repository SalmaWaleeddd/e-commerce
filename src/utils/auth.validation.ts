// utils/validation/auth.validation.ts
import { LoginFormData, LoginValidationErrors, SignupFormData, SignupValidationErrors } from "@/types";

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username.trim()) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 20) return "Username must be less than 20 characters";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

export const validateSignupForm = (
  formData: SignupFormData,
): { isValid: boolean; errors: SignupValidationErrors } => {
  const errors: SignupValidationErrors = {};

  errors.username = validateUsername(formData.username);
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  errors.confirmPassword = validateConfirmPassword(
    formData.password,
    formData.confirmPassword,
  );

  const isValid = !Object.values(errors).some((error) => error !== null);

  return { isValid, errors };
};

export const validateLoginForm = (
  formData: LoginFormData,
): { isValid: boolean; errors: LoginValidationErrors } => {
  const errors: LoginValidationErrors = {};

  errors.username = validateUsername(formData.username);
  errors.password = validatePassword(formData.password);

  const isValid = !Object.values(errors).some((error) => error !== null);

  return { isValid, errors };
};
