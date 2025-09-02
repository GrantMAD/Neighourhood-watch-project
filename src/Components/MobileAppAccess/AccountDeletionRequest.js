
import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AccountDeletionRequest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase
        .from('deletion_requests')
        .insert([{ name, email, reason }]);

      if (error) {
        throw error;
      }

      console.log('Deletion Request Submitted:', data);
      setIsSubmitted(true);
    } catch (error) {
      setError(error.message);
      console.error('Error submitting deletion request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="relative">
          <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </Link>
          <h2 className="text-2xl font-bold mb-6 text-center">Request Account Deletion</h2>
        </div>
        {isSubmitted ? (
          <div className="text-center text-green-600">
            <p>Your request has been submitted successfully. We will process it shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-1">Email Address</label>
              <h1 className="text-gray-600 mb-2">Please make sure you input your exact email address</h1>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="reason" className="block text-gray-700 font-bold mb-2">Reason for Deletion</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountDeletionRequest;

