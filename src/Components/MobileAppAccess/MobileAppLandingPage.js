import React from 'react';
import { Link } from 'react-router-dom';

function MobileAppLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a232f] to-[#1f2937] flex flex-col items-center py-12 px-4 relative overflow-x-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-1/4 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute top-0 right-0 w-36 h-36 sm:w-72 sm:h-72 bg-blue-700 rounded-lg opacity-5 blur-3xl transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-56 sm:h-56 bg-indigo-700 rounded-full opacity-5 blur-3xl"></div>
      <Link to="/login" className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer transition-colors duration-200 hover:text-gray-400 hover:scale-110 transform">
        &#8226;&#8226;&#8226;
      </Link>
      <img src="/images/nwLogo.png" alt="Neighbourhood Watch Logo" className="h-24 sm:h-32 object-contain mb-10 fade-in" />
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-8 leading-snug tracking-wide w-full text-center" style={{textShadow: '0 2px 4px rgba(0,0,0,0.7)'}}>Welcome to the<br/>Neighbourhood Watch Mobile App!</h1>
      <p className="text-lg sm:text-2xl text-gray-300 text-center max-w-4xl mb-16 font-light leading-relaxed" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
        The Neighbourhood Watch Mobile App is your dedicated platform for fostering safer, more connected communities. Designed specifically for neighbourhood watch initiatives and local groups, this
        intuitive application empowers residents to actively participate in community safety and streamline essential communications. It provides a centralized hub where members can effortlessly manage
        their profiles, securely sign in, and navigate a suite of tools crafted to enhance local vigilance and collaboration.
        <br/><br/>
        At its core, the app offers robust group management features, allowing users to easily create, join, and oversee community groups, complete with member administration and access controls. Stay
        engaged with dynamic event planning capabilities, enabling you to discover, add, and manage local happenings directly within the app. Crucially, it facilitates real-time information sharing
        through swift news updates and efficient incident reporting, ensuring your community remains informed and responsive. With personalized notification settings and powerful administrative tools,
        the Neighbourhood Watch Mobile App is the essential tool for building a more secure, informed, and cohesive neighbourhood.
      </p>

      <div className="w-full max-w-4xl">
        {/* Area for screen descriptions */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="screen-descriptions-area">
          <div className="bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-600 transition-all duration-300 hover:scale-105 hover:bg-gray-600">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Home Screen</h3>
            <p className="text-gray-300">
              The Home Screen gives members a warm welcome, showcases your group’s main image and introduction, and keeps everyone updated with upcoming events and the latest community news. Admins can quickly add new events or announcements, while members can tap to view details, stay informed, and easily contact the group.
            </p>
          </div>
          <div className="bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-600 transition-all duration-300 hover:scale-105 hover:bg-gray-600">
            <h3 className="text-3xl font-bold text-white mb-3">Members Screen</h3>
            <p className="text-gray-300">
              The Members Screen shows all group members organized by their neighborhood watch groups. Users can expand each group to see individual member cards with names and contact info. Tapping a member opens a detailed profile modal with more info like emergency contacts and vehicle details, making it easy to connect and stay informed about who’s in your community.
            </p>
          </div>
          <div className="bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-600 transition-all duration-300 hover:scale-105 hover:bg-gray-600">
            <h3 className="text-3xl font-bold text-white mb-3">Events Screen</h3>
            <p className="text-gray-300">
              The Events Screen makes it easy for members to see what’s happening in the community. Users can browse upcoming, ongoing, and past events, view detailed schedules with images, and stay organized with clear date-based navigation. Admins can quickly add new events to keep the calendar fresh and engaging.
            </p>
          </div>
          <div className="bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-600 transition-all duration-300 hover:scale-105 hover:bg-gray-600">
            <h3 className="text-3xl font-bold text-white mb-3">News Screen</h3>
            <p className="text-gray-300">
              The News Screen keeps members up to date with the latest community stories and announcements. Users can scroll through news posts, tap to read full articles with images, and stay connected to important updates. Admins can easily share new posts to keep everyone informed.
            </p>
          </div>
          <div className="bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-600 transition-all duration-300 hover:scale-105 hover:bg-gray-600">
            <h3 className="text-3xl font-bold text-white mb-3">Incidents Screen</h3>
            <p className="text-gray-300">
              The Incidents Screen keeps members informed about safety and security updates in the community. Users can view recent incident reports, read key details, and stay aware of important alerts. Admins can log and update incident information to ensure members always have the latest, most accurate reports.
            </p>
          </div>
          {/* Screen descriptions will be added here */}
        </div>
      </div>

      <div className="w-full max-w-4xl mt-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center">App Coming Soon!</h2>
        <p className="text-base sm:text-xl text-gray-300 text-center max-w-2xl mx-auto mb-8">
          We're working hard to bring you the Neighbourhood Watch Mobile App. Stay tuned for updates!
        </p>
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl border-2 border-dashed border-gray-600 flex justify-center items-center h-64">
          <p className="text-gray-400 text-lg sm:text-xl font-semibold">App Not Yet Available</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
          <button
            type="button"
            className="bg-gray-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center cursor-not-allowed pointer-events-none"
            disabled
            aria-disabled="true"
          >
            Download on Play Store
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center cursor-not-allowed pointer-events-none"
            disabled
            aria-disabled="true"
          >
            Download on App Store
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileAppLandingPage;
