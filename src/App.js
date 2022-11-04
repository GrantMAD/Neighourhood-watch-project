import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import DashBoard from './DashBoard';
import Members from './Members';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <DashBoard/>} />
        <Route path="/Members" element={ <Members/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
