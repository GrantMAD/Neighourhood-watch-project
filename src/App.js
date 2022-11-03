import './App.css';
import Login from './Login';
import DashBoard from './DashBoard';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Login/>} />
          <Route exact path="/DashBoard" element={ <DashBoard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
