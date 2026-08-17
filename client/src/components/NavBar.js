import React from 'react';

function NavBar({ adminMode, setAdminMode }) {
  return (
    <nav style={{
      padding: '20px',
      backgroundColor: '#1A1F2B',
      color: 'white',
      borderBottom: '1px solid #CBD5E1',
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      
      {/* Navigation links */}
      <a 
        href="/" 
        style={{ 
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none'
        }}
      >
        Home
      </a>

      <a 
        href="/add" 
        style={{ 
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none'
        }}
      >
        Add API
      </a>

      {/* Admin toggle */}
      <button
        onClick={() => setAdminMode(!adminMode)}
        style={{
          backgroundColor: adminMode ? '#22C55E' : '#2563EB',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginLeft: 'auto'
        }}
      >
        {adminMode ? "Admin Mode: ON" : "Admin Mode: OFF"}
      </button>
    </nav>
  );
}

export default NavBar;
