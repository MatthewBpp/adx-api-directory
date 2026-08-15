import React, { useState, useEffect } from 'react';

function Home() {

  // -------------------------------------------------------------
  // State: stores the API list and all filter/search inputs
  // -------------------------------------------------------------
  const [apis, setApis] = useState([]);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");

  // -------------------------------------------------------------
  // useEffect:
  // Runs whenever search or any filter changes.
  // Builds a query string and requests filtered results from backend.
  // This keeps the UI in sync with the server-side filtering logic.
  // -------------------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (domain !== "All") params.append("domain", domain);
    if (status !== "All") params.append("status", status);
    if (method !== "All") params.append("method", method);

    fetch(`/apis?${params.toString()}`)
      .then(res => res.json())
      .then(data => setApis(data));
  }, [search, domain, status, method]);

  return (
    <div>
      <h1>ADX — API Directory</h1>

      {/* ---------------------------------------------------------
          ADD API LINK
          Allows users to navigate to the Add API page.
          This completes the CRUD workflow (Create → Read → Update).
         --------------------------------------------------------- */}
      <div style={{ marginBottom: '20px' }}>
        <a href="/add" style={{ fontWeight: 'bold' }}>
          Add New API
        </a>
      </div>

      {/* ---------------------------------------------------------
          SEARCH BAR
          Allows users to search APIs by name, domain, owner, status.
         --------------------------------------------------------- */}
      <input
        type="text"
        placeholder="Search APIs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ---------------------------------------------------------
          FILTER DROPDOWNS
          Multi-criteria filtering: domain, status, method.
         --------------------------------------------------------- */}
      <div style={{ marginTop: '10px', marginBottom: '20px' }}>
        <label>
          Domain:
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option>All</option>
            <option>Payments</option>
            <option>Customer</option>
            <option>Accounts</option>
            <option>Cards</option>
          </select>
        </label>

        <label style={{ marginLeft: '20px' }}>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Up-to-date</option>
            <option>Needs Review</option>
          </select>
        </label>

        <label style={{ marginLeft: '20px' }}>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>All</option>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </label>
      </div>

      {/* ---------------------------------------------------------
          API LIST
          Displays filtered results.
          Each API is clickable → navigates to API Details page.
         --------------------------------------------------------- */}
      <ul>
        {apis.map(api => (
          <li key={api.id} style={{ marginBottom: '10px' }}>
            <a href={`/api/${api.id}`} style={{ textDecoration: 'none' }}>
              <strong>{api.name}</strong>
            </a>

            <div>
              <span><strong>Domain:</strong> {api.domain}</span> &nbsp;|&nbsp;
              <span><strong>Method:</strong> {api.method}</span> &nbsp;|&nbsp;
              <span><strong>Status:</strong> {api.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
