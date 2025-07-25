import { ReactNode } from 'react';

// Common Props Types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'booking' | 'technical' | 'feedback' | 'partnership';
}

export interface ContactInfo {
  icon: React.ComponentType<any>;
  title: string;
  primary: string;
  secondary: string;
  description: string;
  action: string;
}

export interface Location {
  city: string;
  address: string;
  phone: string;
  hours: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Booking Form Types
export interface BookingFormData {
  location: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  dropoffDate?: string;
  pickupTime?: string;
  dropoffTime?: string;
  vehicleType?: string;
  driverAge?: string;
}

// Car Types
export interface Car {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  image: string;
  features: string[];
  rating: number;
  reviews: number;
  transmission: 'automatic' | 'manual';
  fuel: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  doors: number;
}

// Navigation Types
export interface NavItem {
  text: string;
  url: string;
  submenu?: NavItem[];
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

// Social Media Types
export interface SocialMedia {
  icon: React.ComponentType<any>;
  name: string;
  color: string;
  url?: string;
}

// Sign Form Types
export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// Component State Types
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

// Event Handler Types
export type FormChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
export type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
export type ButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
