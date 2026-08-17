import React, { useState, useEffect } from 'react';

function Home({ adminMode }) {

  const [apis, setApis] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    fetch(`/apis?${params.toString()}`)
      .then(res => res.json())
      .then(data => setApis(data));
  }, [search]);

  // Featured APIs = first 3
  const featured = apis.slice(0, 3);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>

      {/* SIDEBAR */}
      <aside style={{
        width: '220px',
        backgroundColor: '#1A1F2B',
        color: 'white',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '30px' }}>ADX</h2>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <a href="/apis" style={{ color: 'white', textDecoration: 'none' }}>APIs</a>
          <a href="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
          <a href="/help" style={{ color: 'white', textDecoration: 'none' }}>Help</a>
          <a href="/logout" style={{ color: 'white', textDecoration: 'none' }}>Sign Out</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '30px', color: '#1A1F2B' }}>

        {/* HEADER */}
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

        {/* SEARCH BAR */}
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

        {/* FEATURED APIs */}
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
                style={{ color: '#2563EB', fontWeight: 'bold', textDecoration: 'none' }}
              >
                Details
              </a>
            </div>
          ))}
        </div>

        {/* ALL APIs TABLE */}
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
            {apis.map(api => (
              <tr key={api.id} style={{ borderBottom: '1px solid #CBD5E1' }}>
                <td style={{ padding: '12px' }}>{api.name}</td>
                <td style={{ padding: '12px' }}>{api.description || "No description"}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    color: api.status === "Up-to-date" ? "#22C55E" : "#F59E0B",
                    fontWeight: 'bold'
                  }}>
                    {api.status}
                  </span>
                </td>

                {/* UPDATED ACTIONS COLUMN */}
                <td style={{ padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <a 
                    href={`/api/${api.id}`}
                    style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    Details
                  </a>

                  {adminMode && (
                    <>
                      <a 
                        href={`/api/${api.id}/edit`}
                        style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        Edit
                      </a>

                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this API?")) {
                            fetch(`/apis/${api.id}`, { method: "DELETE" })
                              .then(() => {
                                // Remove deleted API from list
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

      </main>
    </div>
  );
}

export default Home;
