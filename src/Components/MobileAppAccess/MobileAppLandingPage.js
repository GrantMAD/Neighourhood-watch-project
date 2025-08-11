import React from 'react';
import { Link } from 'react-router-dom';

const MobileAppLandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-800">
      <img src="/nwLogo.png" alt="Neighbourhood Watch Logo" className="w-64 mb-5" />
      <h1 className="text-4xl text-white mb-6">Our New Mobile App is Coming Soon!</h1>
      <p className="text-lg text-white max-w-2xl mx-5 mb-8">
        Get ready to experience the best of our community features on the go. This website will soon become the official access point to our new and improved mobile application.
      </p>
      <p className="mt-4 text-white">
        Thank you for being a part of our community.
      </p>
      <div className="absolute top-5 right-5">
        <Link to="/login" className="text-white no-underline">Admin Login</Link>
      </div>
    </div>
  );
};

export default MobileAppLandingPage;
