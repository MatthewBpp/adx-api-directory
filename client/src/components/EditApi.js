import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditApi({ adminMode }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch(`/apis/${id}`)
      .then(res => res.json())
      .then(data => setApi({
        ...data,
        requestParams: JSON.stringify(
          Array.isArray(data.requestParams) ? data.requestParams : [],
          null,
          2
        ),
        responseSchema: data.responseSchema || "{}",
        examplePayload: data.examplePayload || "{}",
        authentication: data.authentication || ""
      }));
  }, [id]);

  if (!api) {
    return <p style={{ color: '#1A1F2B' }}>Loading API...</p>;
  }

  const handleSave = (e) => {
    e.preventDefault();

    let parsedParams;

    try {
      parsedParams = JSON.parse(api.requestParams);
    } catch {
      alert("Request Parameters must be valid JSON.\nExample:\n[\n  { \"name\": \"id\", \"type\": \"string\" }\n]");
      return;
    }

    const payload = {
      ...api,
      requestParams: parsedParams
    };

    fetch(`/apis/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => navigate(`/api/${id}`));
  };

  return (
    <div style={{ padding: '30px', color: '#1A1F2B', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Edit API: {api.name}</h1>

      <form onSubmit={handleSave}>

        {/* NAME - FULL WIDTH */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#2E3445', fontWeight: 'bold' }}>Name</label>
          <input
            type="text"
            value={api.name}
            onChange={(e) => setApi({ ...api, name: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              marginTop: '6px'
            }}
          />
        </div>

        {/* DOMAIN - FULL WIDTH */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#2E3445', fontWeight: 'bold' }}>Domain</label>
          <select
            value={api.domain}
            onChange={(e) => setApi({ ...api, domain: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              marginTop: '6px'
            }}
          >
            <option>Payments</option>
            <option>Customer</option>
            <option>Accounts</option>
            <option>Cards</option>
          </select>
        </div>

        {/* GRID FOR METHOD / STATUS / OWNER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '20px',
          rowGap: '30px'
        }}>

          {/* METHOD */}
          <div>
            <label style={{ color: '#2E3445', fontWeight: 'bold' }}>Method</label>
            <select
              value={api.method}
              onChange={(e) => setApi({ ...api, method: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #CBD5E1',
                borderRadius: '4px',
                marginTop: '6px'
              }}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label style={{ color: '#2E3445', fontWeight: 'bold' }}>Status</label>
            <select
              value={api.status}
              onChange={(e) => setApi({ ...api, status: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #CBD5E1',
                borderRadius: '4px',
                marginTop: '6px'
              }}
            >
              <option>Up-to-date</option>
              <option>Needs Review</option>
            </select>
          </div>

          {/* OWNER */}
          <div>
            <label style={{ color: '#2E3445', fontWeight: 'bold' }}>Owner</label>
            <input
              type="text"
              value={api.owner}
              onChange={(e) => setApi({ ...api, owner: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #CBD5E1',
                borderRadius: '4px',
                marginTop: '6px'
              }}
            />
          </div>

        </div>

        {/* AUTHENTICATION - FULL WIDTH */}
        <div style={{ marginTop: '20px' }}>
          <label style={{ color: '#2E3445', fontWeight: 'bold' }}>Authentication</label>
          <select
            value={api.authentication}
            onChange={(e) => setApi({ ...api, authentication: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              marginTop: '6px'
            }}
          >
            <option value="">Select Authentication</option>
            <option>OAuth2</option>
            <option>API Key</option>
            <option>JWT</option>
          </select>
        </div>

        {/* LAST UPDATED */}
        <div style={{ marginTop: '30px' }}>
          <label style={{ fontWeight: 'bold', color: '#2E3445' }}>Last Updated</label>
          <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{api.lastUpdated || "Unknown"}</span>
            <span style={{
              padding: '6px 12px',
              backgroundColor: api.status === "Up-to-date" ? "#22C55E" : "#F59E0B",
              color: 'white',
              borderRadius: '4px'
            }}>
              {api.status}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div style={{ marginTop: '30px' }}>
          <label style={{ fontWeight: 'bold', color: '#2E3445' }}>Description</label>
          <textarea
            value={api.description || ""}
            onChange={(e) => setApi({ ...api, description: e.target.value })}
            style={{
              width: '100%',
              height: '100px',
              marginTop: '6px',
              padding: '10px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* JSON SECTIONS */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#1A1F2B' }}>Request Parameters</h3>
          <textarea
            value={api.requestParams}
            onChange={(e) => setApi({ ...api, requestParams: e.target.value })}
            style={{
              width: '100%',
              height: '120px',
              padding: '10px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          />

          <h3 style={{ marginTop: '20px', color: '#1A1F2B' }}>Response Schema</h3>
          <textarea
            value={api.responseSchema}
            onChange={(e) => setApi({ ...api, responseSchema: e.target.value })}
            style={{
              width: '100%',
              height: '120px',
              padding: '10px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          />

          <h3 style={{ marginTop: '20px', color: '#1A1F2B' }}>Example Payload</h3>
          <textarea
            value={api.examplePayload}
            onChange={(e) => setApi({ ...api, examplePayload: e.target.value })}
            style={{
              width: '100%',
              height: '120px',
              padding: '10px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* BUTTONS */}
        {adminMode && (
          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#FACC15',
                color: '#1A1F2B',
                padding: '12px 20px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate(`/api/${id}`)}
              style={{
                backgroundColor: '#CBD5E1',
                color: '#1A1F2B',
                padding: '12px 20px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </button>
          </div>
        )}

      </form>
    </div>
  );
}

export default EditApi;
