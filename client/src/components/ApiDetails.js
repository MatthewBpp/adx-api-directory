import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ApiDetails({ adminMode }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch(`/apis/${id}`)
      .then(res => res.json())
      .then(data => {

        // Safe JSON parsing for all fields
        const safeParse = (value, fallback) => {
          try {
            return typeof value === "object" ? value : JSON.parse(value);
          } catch {
            return fallback;
          }
        };

        const safeRequestParams = safeParse(data.requestParams, []);
        const safeResponseSchema = safeParse(data.responseSchema, {});
        const safeExamplePayload = safeParse(data.examplePayload, {});

        setApi({
          ...data,
          requestParams: safeRequestParams,
          responseSchema: safeResponseSchema,
          examplePayload: safeExamplePayload,
          authentication: data.authentication || ""
        });
      });
  }, [id]);

  if (!api) {
    return <p style={{ color: '#1A1F2B' }}>Loading API details...</p>;
  }

  return (
    <div style={{ padding: '30px', color: '#1A1F2B', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>ADX — API Details</h1>

      {/* OVERVIEW */}
      <section style={{
        backgroundColor: '#F8FAFC',
        border: '1px solid #CBD5E1',
        padding: '20px',
        borderRadius: '6px'
      }}>
        <h2 style={{ marginBottom: '10px' }}>{api.name}</h2>

        <p><strong>Domain:</strong> {api.domain}</p>
        <p><strong>Method:</strong> {api.method}</p>

        <p>
          <strong>Status:</strong>
          <span style={{
            marginLeft: '6px',
            padding: '4px 10px',
            backgroundColor: api.status === "Up-to-date" ? "#22C55E" : "#F59E0B",
            color: 'white',
            borderRadius: '4px'
          }}>
            {api.status}
          </span>
        </p>

        <p><strong>Owner:</strong> {api.owner}</p>
        <p><strong>Last Updated:</strong> {api.lastUpdated || "Unknown"}</p>

        {api.description && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#2E3445' }}>Overview</h3>
            <p>{api.description}</p>
          </div>
        )}
      </section>

      {/* REQUEST PARAMETERS */}
      <section style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#1A1F2B' }}>Request Parameters</h3>

        {api.requestParams.length === 0 ? (
          <p style={{ color: '#475569' }}>No request parameters provided.</p>
        ) : (
          <table style={{
            width: '100%',
            marginTop: '12px',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#E2E8F0' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Required</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {api.requestParams.map((param, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #CBD5E1' }}>
                  <td style={{ padding: '10px' }}>{param.name}</td>
                  <td style={{ padding: '10px' }}>{param.type}</td>
                  <td style={{ padding: '10px' }}>{param.required ? "Yes" : "No"}</td>
                  <td style={{ padding: '10px' }}>{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* RESPONSE SCHEMA */}
      <section style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#1A1F2B' }}>Response Schema</h3>
        <pre style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #CBD5E1',
          padding: '12px',
          borderRadius: '4px',
          marginTop: '10px',
          whiteSpace: 'pre-wrap'
        }}>
          {JSON.stringify(api.responseSchema, null, 2)}
        </pre>
      </section>

      {/* EXAMPLE PAYLOAD */}
      <section style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#1A1F2B' }}>Example Payload</h3>
        <pre style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #CBD5E1',
          padding: '12px',
          borderRadius: '4px',
          marginTop: '10px',
          whiteSpace: 'pre-wrap'
        }}>
          {JSON.stringify(api.examplePayload, null, 2)}
        </pre>
      </section>

      {/* AUTHENTICATION */}
      <section style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#1A1F2B' }}>Authentication</h3>
        <select
          value={api.authentication}
          disabled
          style={{
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            width: '250px'
          }}
        >
          <option value="">Select Authentication</option>
          <option>OAuth2</option>
          <option>API Key</option>
          <option>JWT</option>
        </select>
      </section>

      {/* ADMIN BUTTONS */}
      {adminMode && (
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button
            onClick={() => navigate(`/api/${api.id}/edit`)}
            style={{
              backgroundColor: '#2563EB',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Edit API
          </button>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this API?")) {
                fetch(`/apis/${api.id}`, { method: "DELETE" })
                  .then(() => navigate("/"));
              }
            }}
            style={{
              backgroundColor: '#EF4444',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Delete API
          </button>
        </div>
      )}

    </div>
  );
}

export default ApiDetails;
