import { useEffect, useState } from 'react';

function App() {

  // -------------------------------------------------------------
  // State: holds the list of APIs returned from the Express server
  // -------------------------------------------------------------
  const [apis, setApis] = useState([]);

  // -------------------------------------------------------------
  // useEffect: runs once when the component first loads
  // -------------------------------------------------------------
  useEffect(() => {
    fetch('http://localhost:3001/apis')
      .then(response => response.json())
      .then(data => setApis(data))
      .catch(err => console.error('Error fetching APIs:', err));
  }, []);

  // -------------------------------------------------------------
  // Rendering: displays the API directory on the page
  // -------------------------------------------------------------
  return (
    <div style={{ padding: '20px' }}>
      <h1>API Directory</h1>

      {apis.length === 0 && <p>Loading APIs...</p>}

      {apis.map(api => (
        <div key={api.id} style={{ marginBottom: '15px' }}>
          <h3>{api.name}</h3>
          <p><strong>Domain:</strong> {api.domain}</p>
          <p><strong>Method:</strong> {api.method}</p>
          <p><strong>Status:</strong> {api.status}</p>
          <p><strong>Owner:</strong> {api.owner}</p>
          <p><strong>Last Updated:</strong> {api.lastUpdated}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
