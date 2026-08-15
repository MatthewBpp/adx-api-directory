import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditApi() {

  // -------------------------------------------------------------
  // Extract API ID from the URL (e.g., /api/3/edit → id = 3)
  // -------------------------------------------------------------
  const { id } = useParams();

  // -------------------------------------------------------------
  // Navigation hook: used to redirect after saving
  // -------------------------------------------------------------
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // State: stores the editable API fields
  // -------------------------------------------------------------
  const [api, setApi] = useState(null);

  // -------------------------------------------------------------
  // Fetch the API details when the page loads
  // Pre-fills the form with existing values
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
    return <p>Loading API...</p>;
  }

  // -------------------------------------------------------------
  // Handle form submission: send updated API to backend
  // -------------------------------------------------------------
  const handleSave = (e) => {
    e.preventDefault();

    fetch(`/apis/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(api)
    })
      .then(res => res.json())
      .then(() => {
        // Redirect back to the API Details page
        navigate(`/api/${id}`);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit API: {api.name}</h1>

      {/* ---------------------------------------------------------
          EDIT FORM
          Each field is bound to the API state object.
          Updating inputs updates the API object in real time.
         --------------------------------------------------------- */}
      <form onSubmit={handleSave}>

        <label>
          Name:
          <input
            type="text"
            value={api.name}
            onChange={(e) => setApi({ ...api, name: e.target.value })}
          />
        </label>

        <br /><br />

        <label>
          Domain:
          <select
            value={api.domain}
            onChange={(e) => setApi({ ...api, domain: e.target.value })}
          >
            <option>Payments</option>
            <option>Customer</option>
            <option>Accounts</option>
            <option>Cards</option>
          </select>
        </label>

        <br /><br />

        <label>
          Method:
          <select
            value={api.method}
            onChange={(e) => setApi({ ...api, method: e.target.value })}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </label>

        <br /><br />

        <label>
          Status:
          <select
            value={api.status}
            onChange={(e) => setApi({ ...api, status: e.target.value })}
          >
            <option>Up-to-date</option>
            <option>Needs Review</option>
          </select>
        </label>

        <br /><br />

        <label>
          Owner:
          <input
            type="text"
            value={api.owner}
            onChange={(e) => setApi({ ...api, owner: e.target.value })}
          />
        </label>

        <br /><br />

        <label>
          Description:
          <textarea
            value={api.description || ""}
            onChange={(e) => setApi({ ...api, description: e.target.value })}
          />
        </label>

        <br /><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditApi;
