import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import { Loader2, AlertCircle, Mail, KeyRound } from 'lucide-react';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If someone navigates here directly without requesting an OTP first
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper py-12 px-4">
        <div className="max-w-md w-full bg-card p-8 rounded border border-line text-center">
          <p className="text-muted mb-4">No pending verification found.</p>
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
    setIsLoading(true);

    try {
      // In a real implementation, you'd have an API call here:
      // const response = await authApi.verifyOtp({ email, otp });
      // If the user already has a password, log them in. 
      // If not, send them to setup-password.
      
      // We will assume for now they need to setup a password
      navigate('/setup-password', { state: { email, otp } });
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded border border-line shadow-sm">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-navy-soft mb-4">
            <Mail className="h-6 w-6 text-navy" />
          </div>
          <h2 className="text-center text-3xl font-serif font-semibold text-navy tracking-tight">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            We sent a 6-digit code to <span className="font-medium text-ink">{email}</span>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-soft border border-red rounded p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red mt-0.5" />
              <p className="text-sm text-red">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-ink mb-1" htmlFor="otp">
              6-Digit Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-muted" />
              </div>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-line rounded focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy sm:text-lg tracking-widest text-center transition-colors bg-white text-ink placeholder-muted"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-navy hover:bg-navy-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
