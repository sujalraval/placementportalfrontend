import React, { useState } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useParams<{ role: string }>();
  const { setAuth } = useAuthStore();

  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';
  const title = displayRole ? `${displayRole} Login` : 'Welcome Back';
  const subtitle = displayRole 
    ? `Sign in to access your ${role} portal` 
    : 'Sign in to access your placement portal';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  // Where to send the user after login
  const from = location.state?.from?.pathname || '/dashboard';

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await authApi.login({ email, password });
      setAuth(data.accessToken, data.user);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authApi.requestOtp(email);
      
      // Navigate to verify page and pass email, intent, and role
      navigate('/verify-otp', { state: { email, isLogin: true, role } });
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to send OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    // Redirect to backend OAuth start endpoint
    window.location.href = `http://localhost:4000/api/v1/auth/oauth/${provider}/start`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded border border-line shadow-sm">
        <div>
          <h2 className="mt-2 text-center text-3xl font-serif font-semibold text-navy tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            {subtitle}
          </p>
        </div>

        {/* OAuth Buttons */}
        {role !== 'admin' && role !== 'erp' && (
          <>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => handleOAuth('google')}
                className="w-full flex items-center justify-center py-2 px-4 border border-line rounded text-sm font-medium text-ink bg-white hover:bg-paper transition-colors"
              >
                {/* SVG inline for Google logo */}
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <button
                onClick={() => handleOAuth('microsoft')}
                className="w-full flex items-center justify-center py-2 px-4 border border-line rounded text-sm font-medium text-ink bg-white hover:bg-paper transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4 24H0V12.6H11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0H11.4V11.4ZM24 11.4H12.6V0H24V11.4Z" fill="#00A4EF"/>
                </svg>
                Continue with Microsoft
              </button>
              
              <button
                onClick={() => handleOAuth('linkedin')}
                className="w-full flex items-center justify-center py-2 px-4 border border-line rounded text-sm font-medium text-ink bg-white hover:bg-paper transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.31195 23.9961H0.28125V7.95703H5.31195V23.9961ZM2.79375 5.76562C1.17188 5.76562 0 4.69531 0 3.35156C0 1.97344 1.20469 0.9375 2.86172 0.9375C4.51641 0.9375 5.65547 1.97344 5.68828 3.35156C5.68828 4.69531 4.54922 5.76562 2.79375 5.76562ZM23.9977 23.9961H18.9698V15.5414C18.9698 13.4203 18.2039 11.9719 16.2914 11.9719C14.8313 11.9719 13.9711 12.9516 13.5891 13.9031C13.4531 14.2383 13.4175 14.707 13.4175 15.1781V23.9984H8.38828C8.38828 23.9984 8.45625 9.37031 8.38828 7.95937H13.4175V10.2305C14.0855 9.20156 15.2761 7.73438 17.9292 7.73438C21.2217 7.73438 23.9977 9.88594 23.9977 14.7117V23.9961Z" fill="#0A66C2"/>
                </svg>
                Continue with LinkedIn
              </button>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted">Or continue with email</span>
              </div>
            </div>
          </>
        )}
        
        <form className="mt-6 space-y-6" onSubmit={loginMethod === 'password' ? handlePasswordLogin : handleOtpRequest}>
          {error && (
            <div className="bg-red-soft border border-red rounded p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red mt-0.5" />
              <p className="text-sm text-red">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-line rounded focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm transition-colors bg-white text-ink placeholder-muted"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            {loginMethod === 'password' && (
              <div>
                <label className="block text-sm font-medium text-ink mb-1" htmlFor="password">
                  Password
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
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setLoginMethod(loginMethod === 'password' ? 'otp' : 'password');
                setError('');
              }}
              className="text-sm font-medium text-navy hover:text-navy-2 transition-colors"
            >
              {loginMethod === 'password' 
                ? 'Sign in with a login code instead' 
                : 'Sign in with a password instead'}
            </button>
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
                  {loginMethod === 'password' ? 'Signing in...' : 'Sending code...'}
                </>
              ) : (
                loginMethod === 'password' ? 'Sign in' : 'Send Login Code'
              )}
            </button>
          </div>
        </form>

        {/* Registration is now integrated into the OTP flow */}
      </div>
    </div>
  );
}
