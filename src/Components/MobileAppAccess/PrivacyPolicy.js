
import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Effective Date: 2 September 2025
      </p>
      <p className="mb-4">
        At the Neighbourhood Watch we operate the Neighbourhood Watch mobile application. This Privacy Policy explains how we collect, use, and protect your information when you use the App.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">1. Information We Collect</h2>
      <p>When you use the App, we may collect:</p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li><span className="font-bold">Personal Information:</span> Name, email, and profile details you provide when signing up.</li>
        <li><span className="font-bold">Location Data:</span> If you allow it, we may collect your location to help report incidents and display nearby events.</li>
        <li><span className="font-bold">Device Information:</span> Such as device type, operating system, and app usage statistics.</li>
        <li><span className="font-bold">Content You Share:</span> Reports, images, and other content you upload.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Provide core app features (news, events, incident reporting, member management).</li>
        <li>Improve security and communication within your community.</li>
        <li>Maintain and improve our services.</li>
        <li>Send you important notifications related to group activity.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">3. Data Sharing and Disclosure</h2>
      <p>We do not sell or rent your personal information. We may share data only in these cases:</p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li><span className="font-bold">Service Providers:</span> With trusted providers like Supabase (for data storage) and Google services (for authentication, notifications, and maps).</li>
        <li><span className="font-bold">Legal Compliance:</span> If required by law or to protect community safety.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">4. Data Security</h2>
      <p>We take reasonable measures to protect your data against unauthorized access, alteration, or disclosure. However, no method of electronic storage is 100% secure.</p>

      <h2 className="text-2xl font-bold mt-6 mb-2">5. Your Rights</h2>
      <p>You may:</p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Access or update your personal information via the App.</li>
        <li>Request deletion of your account and data by contacting us.</li>
        <li>Manage permissions (e.g. location, camera) via your device settings.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">6. Children’s Privacy</h2>
      <p>The App is not intended for children under 13. We do not knowingly collect personal information from children.</p>

      <h2 className="text-2xl font-bold mt-6 mb-2">7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted in the App or on our website with the updated 2 September 2025.</p>

      <h2 className="text-2xl font-bold mt-6 mb-2">8. Contact Us</h2>
      <p>If you have questions or requests regarding this Privacy Policy, please contact us:</p>
      <p>📧 neighbourhoodwatchappmobile@gmail.com</p>
      <Link to="/">
        <button className="bg-[#1f2937] hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded mb-4">
          Go Back
        </button>
      </Link>
    </div>
  );
}

export default PrivacyPolicy;
