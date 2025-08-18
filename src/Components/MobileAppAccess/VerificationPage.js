
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

const VerificationPage = () => {
  const [message, setMessage] = useState('Verifying your account...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (!accessToken || !refreshToken) {
          throw new Error("Verification tokens not found in URL.");
        }

        const { data: { session }, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          const user = session.user;
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ is_verified: true })
            .eq('id', user.id);

          if (updateError) {
            throw updateError;
          }

          setMessage('Your account has been successfully verified!');
        } else {
            throw new Error("Could not establish a session. Please try again.");
        }
      } catch (err) {
        setError(err.message);
        setMessage('Verification failed. Please try again or contact support.');
      }
    };

    verifyUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Account Verification</h1>
        <p className={error ? 'text-red-500' : 'text-green-500'}>{message}</p>
        {error && <p className="text-sm text-gray-600 mt-2">Error details: {error}</p>}
      </div>
    </div>
  );
};

export default VerificationPage;
