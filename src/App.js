import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import DashBoard from './DashBoard';
import Members from './Members';
import ContactPage from './ContactPage';
import Nav from './Nav';
import AboutUs from './AboutUs';
import GalleryPage from './GalleryPage';
import Footer from './Footer';
import ProfilePage from './ProfilePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import { useState } from 'react';
import IncidentReportPage from './IncidentReportPage';
import { app } from './firebase';


function App() {

  const [showNav, setShowNav] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
      { showNav &&
        <Nav/>
      }
        <Routes>
        <Route path="/" element={ <AboutUs/>} />
        <Route path="/SignUpPage" element={ <SignUpPage funcNav={setShowNav}/>} />
        <Route path="/SignInPage" element={ <SignInPage funcNav={setShowNav}/>} />
        <Route path="/IncidentReportPage" element={ <IncidentReportPage/>} />
        <Route path="/Members" element={ <Members/>} />
        <Route path="/ContactPage" element={ <ContactPage/>} />
        <Route path="/AboutUs" element={ <AboutUs/>} />
        <Route path="/GalleryPage" element={ <GalleryPage/>} />
        <Route path="/ProfilePage" element={ <ProfilePage/>} />
        <Route path="/DashBoard" element={ <DashBoard/>} />
        </Routes>
      { showNav &&
        <Footer/>
      }
      </BrowserRouter>
    </div>
  );
}

export default App;
