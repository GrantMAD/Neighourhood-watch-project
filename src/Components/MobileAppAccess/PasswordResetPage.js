import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

const PasswordResetPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    useEffect(() => {
        // Supabase often redirects with access_token and type in the URL hash
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1)); // Remove #
        const accessToken = params.get('access_token');
        const type = params.get('type');

        if (accessToken && type === 'recovery') {
            // Supabase automatically sets the session if access_token is present
            // We can verify the session is active
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (!session) {
                    setMessage("Invalid or expired password reset link. Please try again.");
                    setMessageType('error');
                }
            });
        } else {
            setMessage("Invalid password reset link. Please ensure you clicked the link from your email.");
            setMessageType('error');
        }
    }, []);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType('error');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            setMessageType('error');
            setLoading(false);
            return;
        }

        try {
            // Update the user's password
            const { error } = await supabase.auth.updateUser({ password: password });

            if (error) {
                throw error;
            }

            setMessage("Your password has been successfully updated!");
            setMessageType('success');

        } catch (error) {
            setMessage(`Error updating password: ${error.message}`);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Reset Your Password</h2>
                <p className="text-sm text-gray-600 text-center mb-6">Enter your new password below.</p>

                {message && (
                    <div className={`p-3 mb-4 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetPage;
