import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ApiDetails() {

  // -------------------------------------------------------------
  // Extract the API ID from the URL (e.g., /api/3 → id = 3)
  // -------------------------------------------------------------
  const { id } = useParams();

  // -------------------------------------------------------------
  // State: holds the API object returned from the backend
  // -------------------------------------------------------------
  const [api, setApi] = useState(null);

  // -------------------------------------------------------------
  // Fetch the API details when the component loads
  // -------------------------------------------------------------
  useEffect(() => {
    fetch(`/apis/${id}`)
      .then(res => res.json())
      .then(data => setApi(data));
  }, [id]);

  // -------------------------------------------------------------
  // If API hasn't loaded yet, show a loading message
  // -------------------------------------------------------------
  if (!api) {
    return <p>Loading API details...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{api.name}</h1>

      {/* ---------------------------------------------------------
          HIGH‑LEVEL API INFORMATION
          Mirrors your wireframe: name, domain, method, status, owner
         --------------------------------------------------------- */}
      <p><strong>Domain:</strong> {api.domain}</p>
      <p><strong>Method:</strong> {api.method}</p>
      <p><strong>Status:</strong> {api.status}</p>
      <p><strong>Owner:</strong> {api.owner}</p>
      <p><strong>Last Updated:</strong> {api.lastUpdated}</p>

      {/* ---------------------------------------------------------
          DESCRIPTION SECTION
          Optional field in your JSON, but included for completeness
         --------------------------------------------------------- */}
      {api.description && (
        <div style={{ marginTop: '20px' }}>
          <h3>Description</h3>
          <p>{api.description}</p>
        </div>
      )}

      {/* ---------------------------------------------------------
          SCHEMA SECTION
          If your JSON includes a schema object, display it nicely
         --------------------------------------------------------- */}
      {api.schema && (
        <div style={{ marginTop: '20px' }}>
          <h3>Schema</h3>
          <pre>{JSON.stringify(api.schema, null, 2)}</pre>
        </div>
      )}

      {/* ---------------------------------------------------------
          EXAMPLE SECTION
          If your JSON includes example requests/responses
         --------------------------------------------------------- */}
      {api.example && (
        <div style={{ marginTop: '20px' }}>
          <h3>Example</h3>
          <pre>{JSON.stringify(api.example, null, 2)}</pre>
        </div>
      )}

      {/* ---------------------------------------------------------
          EDIT API LINK
          Allows users to navigate to the Edit API page.
          This connects the Details screen to the Edit screen.
         --------------------------------------------------------- */}
      <div style={{ marginTop: '30px' }}>
        <a href={`/api/${api.id}/edit`} style={{ fontWeight: 'bold' }}>
          Edit API
        </a>
      </div>
    </div>
  );
}

export default ApiDetails;
