import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../config/apiConfig';

function Home({ adminMode }) {

  // Stores all APIs returned from the backend
  const [apis, setApis] = useState([]);

  // Stores the user's search input for filtering APIs
  const [search, setSearch] = useState("");

  // Tracks fetch lifecycle so loading and empty states are shown correctly
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  // Fetch APIs whenever the search term changes
  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    setLoading(true);
    setError(false);

    fetch(buildApiUrl(`/apis?${params.toString()}`))
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        setApis(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError(true);
        setApis([]);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search]);

  if (error) return <p>Failed to load APIs</p>;

  const filteredApis = apis.filter(api => {
    const apiName = (api.name || '').toLowerCase();
    const searchTerm = search.toLowerCase();
    return apiName.includes(searchTerm);
  });

  // Show only the first 3 matching APIs in the home directory
  const visibleApis = filteredApis.slice(0, 3);

  // Select the first 3 APIs to display as "featured"
  const featured = visibleApis.slice(0, 3);

  // Shared interactive styles (hover + focus) for WCAG compliance
  const interactiveStyles = {
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  const focusOutline = {
    outline: '2px solid #2563EB',
    outlineOffset: '2px'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>

      {/* SIDEBAR — persistent navigation area */}
      <aside style={{
        width: '220px',
        backgroundColor: '#1A1F2B',
        color: 'white',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '30px' }}>ADX</h2>

        {/* Main navigation links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <a href="/apis" style={{ color: 'white', textDecoration: 'none' }}>APIs</a>
          <a href="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
          <a href="/help" style={{ color: 'white', textDecoration: 'none' }}>Help</a>
          <a href="/logout" style={{ color: 'white', textDecoration: 'none' }}>Sign Out</a>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '30px', color: '#1A1F2B' }}>

        {/* HEADER — includes title + Add API button (admin only) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1A1F2B',
          color: 'white',
          padding: '20px',
          borderBottom: '1px solid #CBD5E1'
        }}>
          <h1 style={{ margin: 0 }}>ADX — API Directory</h1>

          {adminMode && (
            <a 
              href="/add"
              style={{
                backgroundColor: '#2563EB',
                color: 'white',
                padding: '10px 18px',
                borderRadius: '4px',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              + Add API
            </a>
          )}
        </div>

        {/* SEARCH BAR — filters APIs in real time */}
        <input
          type="text"
          placeholder="Search APIs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginTop: '20px',
            padding: '10px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #CBD5E1'
          }}
        />

        {loading ? (
          <p style={{ marginTop: '20px' }}>Loading APIs...</p>
        ) : filteredApis.length === 0 ? (
          <p style={{ marginTop: '20px' }}>No APIs found.</p>
        ) : (
          <>
            {/* FEATURED APIs — highlights first 3 APIs */}
            <h2 style={{ marginTop: '40px' }}>Featured APIs</h2>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px'
            }}>
              {featured.map(api => (
                <div key={api.id} style={{
                  backgroundColor: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '16px',
                  width: '250px'
                }}>
                  <h3 style={{ marginBottom: '8px' }}>{api.name}</h3>
                  <p style={{ color: '#475569' }}>{api.description || "No description provided."}</p>

                  <a 
                    href={`/api/${api.id}`}
                    style={{ ...interactiveStyles, color: '#2563EB' }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    onFocus={(e) => Object.assign(e.target.style, focusOutline)}
                    onBlur={(e) => e.target.style.outline = 'none'}
                  >
                    Details
                  </a>
                </div>
              ))}
            </div>

            {/* ALL APIs TABLE — main directory listing */}
            <h2 style={{ marginTop: '40px' }}>All APIs</h2>

            <table style={{
              width: '100%',
              marginTop: '20px',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#E2E8F0' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>API Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleApis.map(api => (
                  <tr key={api.id} style={{ borderBottom: '1px solid #CBD5E1' }}>
                    <td style={{ padding: '12px' }}>{api.name}</td>
                    <td style={{ padding: '12px' }}>{api.description || "No description"}</td>

                    {/* WCAG‑compliant status colours */}
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        color: api.status === "Up-to-date" ? "#15803D" : "#B45309",
                        fontWeight: 'bold'
                      }}>
                        {api.status}
                      </span>
                    </td>

                    {/* ACTIONS — Details, Edit, Delete (admin only) */}
                    <td style={{ padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>

                      {/* Details link */}
                      <a 
                        href={`/api/${api.id}`}
                        style={{ ...interactiveStyles, color: '#2563EB' }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        onFocus={(e) => Object.assign(e.target.style, focusOutline)}
                        onBlur={(e) => e.target.style.outline = 'none'}
                      >
                        Details
                      </a>

                      {adminMode && (
                        <>
                          {/* Edit link */}
                          <a 
                            href={`/api/${api.id}/edit`}
                            style={{ ...interactiveStyles, color: '#2563EB' }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                            onFocus={(e) => Object.assign(e.target.style, focusOutline)}
                            onBlur={(e) => e.target.style.outline = 'none'}
                          >
                            Edit
                          </a>

                          {/* Delete button — admin only */}
                          <button
                            aria-label="Delete API"
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this API?")) {
                                fetch(buildApiUrl(`/apis/${api.id}`), { method: "DELETE" })
                                  .then(() => {
                                    // Remove deleted API from list without reload
                                    setApis(prev => prev.filter(a => a.id !== api.id));
                                  });
                              }
                            }}
                            style={{
                              backgroundColor: '#EF4444',
                              color: 'white',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.85'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                            onFocus={(e) => Object.assign(e.target.style, focusOutline)}
                            onBlur={(e) => e.target.style.outline = 'none'}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </main>
    </div>
  );
}

export default Home;
