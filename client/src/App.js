import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import ApiDetails from './components/ApiDetails';
import EditApi from './components/EditApi';
import AddApi from './components/AddApi';
import NavBar from './components/NavBar';

function App() {
  const [adminMode, setAdminMode] = useState(true); // mock role

  return (
    <Router>
      <NavBar adminMode={adminMode} setAdminMode={setAdminMode} />

      <Routes>
        <Route path="/" element={<Home adminMode={adminMode} />} />
        <Route path="/api/:id" element={<ApiDetails adminMode={adminMode} />} />
        <Route path="/api/:id/edit" element={<EditApi adminMode={adminMode} />} />
        <Route path="/add" element={<AddApi adminMode={adminMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
