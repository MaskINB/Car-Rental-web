// components/forms/SignInForm.tsx
'use client';
import React, { useState } from 'react';
import { SignInFormData, FormChangeHandler, FormSubmitHandler } from '@/types';

interface SignInFormProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onClose, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange: FormChangeHandler = (e) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit: FormSubmitHandler = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Sign in data:', formData);
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Sign In</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-white hover:bg-gray-700/50 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
        >
          Sign In
        </button>
      </form>

      {/* Social Sign In Options */}
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600/50"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-gray-900 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          {/* Google Sign In */}
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-gray-600/50 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 group"
            onClick={() => console.log('Google sign in')}
            title="Sign in with Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>

          {/* Facebook Sign In */}
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-gray-600/50 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 group"
            onClick={() => console.log('Facebook sign in')}
            title="Sign in with Facebook"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          {/* X (Twitter) Sign In */}
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-gray-600/50 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 group"
            onClick={() => console.log('X sign in')}
            title="Sign in with X"
          >
            <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don&apos;t have an account?
          <button
            onClick={onSwitchToSignUp}
            className="text-blue-400 hover:text-blue-300 ml-1 font-medium transition-colors duration-200"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
