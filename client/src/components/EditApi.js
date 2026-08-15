import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditApi() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch(`/apis/${id}`)
      .then(res => res.json())
      .then(data => setApi(data));
  }, [id]);

  if (!api) {
    return <p style={{ color: '#1A1F2B' }}>Loading API...</p>;
  }

  const handleSave = (e) => {
    e.preventDefault();

    fetch(`/apis/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(api)
    })
      .then(res => res.json())
      .then(() => navigate(`/api/${id}`));
  };

  return (
    <div style={{ padding: '20px', color: '#1A1F2B' }}>
      <h1 style={{ color: '#1A1F2B' }}>Edit API: {api.name}</h1>

      <form onSubmit={handleSave}>

        {/* NAME */}
        <label style={{ color: '#2E3445' }}>
          Name:
          <input
            type="text"
            value={api.name}
            onChange={(e) => setApi({ ...api, name: e.target.value })}
            style={{
              padding: '8px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              marginLeft: '10px'
            }}
          />
        </label>

        <br /><br />

        {/* DOMAIN */}
        <label style={{ color: '#2E3445' }}>
          Domain:
          <select
            value={api.domain}
            onChange={(e) => setApi({ ...api, domain: e.target.value })}
            style={{
              marginLeft: '10px',
              padding: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          >
            <option>Payments</option>
            <option>Customer</option>
            <option>Accounts</option>
            <option>Cards</option>
          </select>
        </label>

        <br /><br />

        {/* METHOD */}
        <label style={{ color: '#2E3445' }}>
          Method:
          <select
            value={api.method}
            onChange={(e) => setApi({ ...api, method: e.target.value })}
            style={{
              marginLeft: '10px',
              padding: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </label>

        <br /><br />

        {/* STATUS */}
        <label style={{ color: '#2E3445' }}>
          Status:
          <select
            value={api.status}
            onChange={(e) => setApi({ ...api, status: e.target.value })}
            style={{
              marginLeft: '10px',
              padding: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          >
            <option>Up-to-date</option>
            <option>Needs Review</option>
          </select>
        </label>

        <br /><br />

        {/* OWNER */}
        <label style={{ color: '#2E3445' }}>
          Owner:
          <input
            type="text"
            value={api.owner}
            onChange={(e) => setApi({ ...api, owner: e.target.value })}
            style={{
              padding: '8px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              marginLeft: '10px'
            }}
          />
        </label>

        <br /><br />

        {/* DESCRIPTION */}
        <label style={{ color: '#2E3445' }}>
          Description:
          <textarea
            value={api.description || ""}
            onChange={(e) => setApi({ ...api, description: e.target.value })}
            style={{
              padding: '8px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              marginLeft: '10px',
              width: '300px',
              height: '120px'
            }}
          />
        </label>

        <br /><br />

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={{
            backgroundColor: '#2563EB',
            color: 'white',
            padding: '10px 18px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}

export default EditApi;
