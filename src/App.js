import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import DashBoard from './DashBoard';
import Members from './Members';
import ContactPage from './ContactPage';
import Nav from './Nav';
import AboutUs from './AboutUs';
import GalleryPage from './GalleryPage';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
        <Route path="/" element={ <DashBoard/>} />
        <Route path="/Members" element={ <Members/>} />
        <Route path="/ContactPage" element={ <ContactPage/>} />
        <Route path="/AboutUs" element={ <AboutUs/>} />
        <Route path="/GalleryPage" element={ <GalleryPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
