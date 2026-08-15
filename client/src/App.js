import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ApiDetails from './components/ApiDetails';
import EditApi from './components/EditApi';
import AddApi from './components/AddApi';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      {/* Navigation bar appears on every page */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/:id" element={<ApiDetails />} />
        <Route path="/api/:id/edit" element={<EditApi />} />
        <Route path="/add" element={<AddApi />} />
      </Routes>
    </Router>
  );
}

export default App;
