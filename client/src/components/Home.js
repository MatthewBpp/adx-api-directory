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
  // useEffect: fetch filtered API list whenever filters change
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
    <div style={{ padding: '20px', color: '#1A1F2B' }}>
      <h1 style={{ color: '#1A1F2B' }}>ADX — API Directory</h1>

      {/* ---------------------------------------------------------
          ADD API LINK (styled with WCAG-safe colours)
         --------------------------------------------------------- */}
      <div style={{ marginBottom: '20px' }}>
        <a 
          href="/add" 
          style={{ 
            fontWeight: 'bold',
            color: '#2563EB'   // Primary Blue
          }}
        >
          Add New API
        </a>
      </div>

      {/* ---------------------------------------------------------
          SEARCH BAR (WCAG-safe border + padding)
         --------------------------------------------------------- */}
      <input
        type="text"
        placeholder="Search APIs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          border: '1px solid #CBD5E1',   // Slate 300
          borderRadius: '4px',
          width: '250px',
          marginBottom: '10px'
        }}
      />

      {/* ---------------------------------------------------------
          FILTER DROPDOWNS (WCAG-safe borders + spacing)
         --------------------------------------------------------- */}
      <div style={{ marginTop: '10px', marginBottom: '20px' }}>
        <label style={{ color: '#2E3445' }}>
          Domain:
          <select 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          >
            <option>All</option>
            <option>Payments</option>
            <option>Customer</option>
            <option>Accounts</option>
            <option>Cards</option>
          </select>
        </label>

        <label style={{ marginLeft: '20px', color: '#2E3445' }}>
          Status:
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          >
            <option>All</option>
            <option>Up-to-date</option>
            <option>Needs Review</option>
          </select>
        </label>

        <label style={{ marginLeft: '20px', color: '#2E3445' }}>
          Method:
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px'
            }}
          >
            <option>All</option>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </label>
      </div>

      {/* ---------------------------------------------------------
          API LIST (WCAG-safe colours + semantic status colours)
         --------------------------------------------------------- */}
      <ul>
        {apis.map(api => (
          <li key={api.id} style={{ marginBottom: '12px' }}>
            
            {/* Link to API Details page */}
            <a 
              href={`/api/${api.id}`} 
              style={{ 
                textDecoration: 'none',
                color: '#2563EB',        // Primary Blue
                fontWeight: 'bold'
              }}
            >
              {api.name}
            </a>

            {/* High-level summary */}
            <div style={{ marginTop: '4px' }}>
              <span><strong>Domain:</strong> {api.domain}</span> &nbsp;|&nbsp;
              <span><strong>Method:</strong> {api.method}</span> &nbsp;|&nbsp;

              {/* Semantic colour for status */}
              <span style={{ 
                color: api.status === "Up-to-date" ? "#22C55E" : "#F59E0B"
              }}>
                <strong>Status:</strong> {api.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
