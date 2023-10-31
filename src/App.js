import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Members from './Components/Members';
import MembersPanel from './Components/MembersPanel'
import ContactPage from './Components/ContactPage';
import Nav from './Components/Nav';
import AboutUs from './Components/AboutUs';
import GalleryPage from './Components/GalleryPage';
import Footer from './Components/Footer';
import ProfilePage from './Components/ProfilePage';
import SignUpPage from './Components/SignUpPage';
import SignInPage from './Components/SignInPage';
import { useState } from 'react';
import IncidentReportPage from './Components/IncidentReportPage';
import ArchivedReports from './Components/ArchivedReports'
import LandingPage from './Components/LandingPage';
import Profile from './Components/Profile';
import PasswordResetEmail from './Components/PasswordResetEmail';
import PasswordResetPage from './Components/PasswordResetPage';
import StoryPage from './Components/StoryPage';
import PublicProfile from './Components/PublicProfile';
import AddReport from './AddAndEdit/AddReport';
import AddStory from './AddAndEdit/AddStory';
import AddImage from './AddAndEdit/AddImage';
import AddEvent from './AddAndEdit/AddEvent'
import HomePage from './Components/HomePage';
import MainStoryPage from './Components/MainStoryPage';
import WelcomeStory from './Components/WelcomeStory';
import VerifiedAccount from './Components/VerifiedAccount';
import TermsAndConditions from './Components/TermsAndConditions';
import SectorContent from './Components/SectorContent';
import AddNeighbourhoodRequest from './AddAndEdit/AddNeighbourhoodRequest';
import Requests from './Components/Requests';
import SectorAddition from './Components/SectorAddition';
import UserMetrics from './Components/UserMetrics';
import Events from './Components/Events'
import EventPage from './Components/EventPage';

function App() {

  const [showNav, setShowNav] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
      { showNav &&
        <Nav />
      }
        <Routes>
        <Route path="/" element={ <LandingPage/>} />
        <Route path="/HomePage" element={ <HomePage funcNav={setShowNav}/>} />
        <Route path="/LandingPage" element={ <LandingPage/>} />
        <Route path="/StoryPage" element={ <StoryPage/>} />
        <Route path="/WelcomeStory" element={ <WelcomeStory/>} />
        <Route path="/MainStoryPage" element={ <MainStoryPage/>} />
        <Route path="/SignUpPage" element={ <SignUpPage funcNav={setShowNav}/>} />
        <Route path="/SignInPage" element={ <SignInPage funcNav={setShowNav}/>} />
        <Route path="/IncidentReportPage" element={ <IncidentReportPage funcNav={setShowNav}/>} />
        <Route path="/ArchivedReports" element={ <ArchivedReports funcNav={setShowNav}/>} />
        <Route path="/Members" element={ <Members/>} />
        <Route path="/MembersPanel" element={ <MembersPanel/>} />
        <Route path="/ContactPage" element={ <ContactPage/>} />
        <Route path="/AboutUs" element={ <AboutUs/>} />
        <Route path="/Events" element={ <Events/>} />
        <Route path="/GalleryPage" element={ <GalleryPage/>} />
        <Route path="/ProfilePage" element={ <ProfilePage/>} />
        <Route path="/Profile" element={ <Profile/>} />
        <Route path="/PublicProfile/:id" element={ <PublicProfile/>} />
        <Route path="/AddReport" element={ <AddReport/>} />
        <Route path="/AddStory" element={ <AddStory/>} />
        <Route path="/AddImage" element={ <AddImage/>} />
        <Route path="/AddEvent" element={ <AddEvent/>} />
        <Route path="/AddNeighbourhoodRequest" element={ <AddNeighbourhoodRequest/>} />
        <Route path="/Requests" element={ <Requests/>} />
        <Route path="/PasswordResetEmail" element={ <PasswordResetEmail funcNav={setShowNav}/>} />
        <Route path="/PasswordResetPage" element={ <PasswordResetPage funcNav={setShowNav}/>} />
        <Route path="/VerifiedAccount" element={ <VerifiedAccount funcNav={setShowNav}/>} />
        <Route path="/TermsAndConditions" element={ <TermsAndConditions funcNav={setShowNav}/>} />
        <Route path="/SectorContent" element={ <SectorContent />} />
        <Route path="/SectorAddition" element={ <SectorAddition />} />
        <Route path="/UserMetrics" element={ <UserMetrics />} />
        <Route path="/EventPage" element={ <EventPage />} />
        </Routes>
      { showNav &&
        <Footer/>
      }
      </BrowserRouter>
    </div>
  );
}

export default App;
