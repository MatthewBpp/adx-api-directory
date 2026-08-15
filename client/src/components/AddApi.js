import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddApi() {

  // -------------------------------------------------------------
  // Navigation hook: used to redirect after saving
  // -------------------------------------------------------------
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // State: stores the new API fields before submission
  // -------------------------------------------------------------
  const [api, setApi] = useState({
    name: "",
    domain: "Payments",
    method: "GET",
    status: "Up-to-date",
    owner: "",
    description: ""
  });

  // -------------------------------------------------------------
  // Handle form submission: send new API to backend
  // -------------------------------------------------------------
  const handleSave = (e) => {
    e.preventDefault();

    fetch(`/apis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(api)
    })
      .then(res => res.json())
      .then(() => {
        // Redirect back to the Home screen
        navigate("/");
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New API</h1>

      {/* ---------------------------------------------------------
          ADD API FORM
          Each field updates the API object stored in state.
         --------------------------------------------------------- */}
      <form onSubmit={handleSave}>

        <label>
          Name:
          <input
            type="text"
            value={api.name}
            onChange={(e) => setApi({ ...api, name: e.target.value })}
            required
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
            required
          />
        </label>

        <br /><br />

        <label>
          Description:
          <textarea
            value={api.description}
            onChange={(e) => setApi({ ...api, description: e.target.value })}
          />
        </label>

        <br /><br />

        <button type="submit">Add API</button>
      </form>
    </div>
  );
}

export default AddApi;
