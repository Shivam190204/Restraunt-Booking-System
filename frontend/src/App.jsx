
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Success from './pages/Success';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Success" element={<Success/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>

  );
}

export default App
 