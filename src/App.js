import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import MobileAppLandingPage from './Components/MobileAppAccess/MobileAppLandingPage';
import Footer from './Components/Footer';
import SignInPageSupabase from './Components/MobileAppAccess/SignInPageSupabase';
import DashboardPage from './Components/MobileAppAccess/DashboardPage';
import PasswordResetPage from './Components/MobileAppAccess/PasswordResetPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname !== '/dashboard';

  return (
    <>
      <Routes>
        <Route path="/" element={<MobileAppLandingPage />} />
        <Route path="/login" element={<SignInPageSupabase />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
