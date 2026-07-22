import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2, AlertCircle, Lock, User } from 'lucide-react';
import { authApi } from '../api/auth';
import type { UserRole } from '../store/useAuthStore';

export default function SetupPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const email = location.state?.email;
  const otp = location.state?.otp;
  const defaultRole = location.state?.role ? location.state.role.toUpperCase() : 'STUDENT';
  
  const [fullName, setFullName] = useState('');
  const [role] = useState<UserRole>(defaultRole as UserRole);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper py-12 px-4">
        <div className="max-w-md w-full bg-card p-8 rounded border border-line text-center">
          <p className="text-muted mb-4">Unauthorized access.</p>
          <button onClick={() => navigate('/login')} className="text-navy hover:underline">
            Go back to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 10) {
      setError('Password must be at least 10 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const data = await authApi.register({ fullName, email, password, role, otp });
      setAuth(data.accessToken, data.user);
      
      const mappedRole = role === 'COORDINATOR' ? 'dept' : role.toLowerCase();
      // If student, go to profile, else go to their specific dashboard
      const redirectPath = role === 'STUDENT' ? '/student/profile' : `/${mappedRole}/dashboard`;
      
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      const apiError = err.response?.data?.error;
      if (apiError?.code === 'VALIDATION_ERROR' && Array.isArray(apiError.details)) {
        const detailsStr = apiError.details.map((d: any) => `${d.path}: ${d.message}`).join(', ');
        setError(`Validation Failed: ${detailsStr}`);
      } else {
        setError(apiError?.message || 'Failed to complete registration. Please try again.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded border border-line shadow-sm">
        <div>
          <h2 className="mt-2 text-center text-3xl font-serif font-semibold text-navy tracking-tight">
            Complete Registration
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Set up your profile and password for <span className="font-medium text-ink">{email}</span>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-soft border border-red rounded p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red mt-0.5" />
              <p className="text-sm text-red">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-line rounded focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm transition-colors bg-white text-ink placeholder-muted"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1" htmlFor="password">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-line rounded focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm transition-colors bg-white text-ink placeholder-muted"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-line rounded focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm transition-colors bg-white text-ink placeholder-muted"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-navy hover:bg-navy-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Complete Registration'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
