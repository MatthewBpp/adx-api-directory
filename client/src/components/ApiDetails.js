import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ApiDetails() {

  const { id } = useParams();
  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch(`/apis/${id}`)
      .then(res => res.json())
      .then(data => setApi(data));
  }, [id]);

  if (!api) {
    return <p style={{ color: '#1A1F2B' }}>Loading API details...</p>;
  }

  return (
    <div style={{ padding: '20px', color: '#1A1F2B' }}>
      <h1 style={{ color: '#1A1F2B' }}>{api.name}</h1>

      {/* High-level API information */}
      <p><strong>Domain:</strong> {api.domain}</p>
      <p><strong>Method:</strong> {api.method}</p>

      <p>
        <strong>Status:</strong>
        <span style={{
          marginLeft: '6px',
          color: api.status === "Up-to-date" ? "#22C55E" : "#F59E0B"
        }}>
          {api.status}
        </span>
      </p>

      <p><strong>Owner:</strong> {api.owner}</p>
      <p><strong>Last Updated:</strong> {api.lastUpdated}</p>

      {/* Description */}
      {api.description && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#2E3445' }}>Description</h3>
          <p>{api.description}</p>
        </div>
      )}

      {/* Schema */}
      {api.schema && (
        <div style={{
          marginTop: '20px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #CBD5E1',
          padding: '12px',
          borderRadius: '4px'
        }}>
          <h3 style={{ color: '#2E3445' }}>Schema</h3>
          <pre>{JSON.stringify(api.schema, null, 2)}</pre>
        </div>
      )}

      {/* Example */}
      {api.example && (
        <div style={{
          marginTop: '20px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #CBD5E1',
          padding: '12px',
          borderRadius: '4px'
        }}>
          <h3 style={{ color: '#2E3445' }}>Example</h3>
          <pre>{JSON.stringify(api.example, null, 2)}</pre>
        </div>
      )}

      {/* Edit API link */}
      <div style={{ marginTop: '30px' }}>
        <a 
          href={`/api/${api.id}/edit`} 
          style={{ 
            fontWeight: 'bold',
            color: '#2563EB'
          }}
        >
          Edit API
        </a>
      </div>
    </div>
  );
}

export default ApiDetails;
