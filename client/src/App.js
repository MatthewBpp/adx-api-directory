import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import ApiDetails from './components/ApiDetails';
import EditApi from './components/EditApi';
import AddApi from './components/AddApi';
import NavBar from './components/NavBar';
import Services from './components/Services';

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
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;


//import Services from './Services';

//<Route path="/services" element={<Services />} />
