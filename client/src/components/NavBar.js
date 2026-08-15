import React from 'react';

function NavBar({ adminMode, setAdminMode }) {
  return (
    <nav style={{
      padding: '12px',
      backgroundColor: '#F8FAFC',
      borderBottom: '1px solid #CBD5E1',
      marginBottom: '20px'
    }}>
      {/* Navigation links */}
      <a 
        href="/" 
        style={{ 
          marginRight: '20px', 
          fontWeight: 'bold',
          color: '#2563EB'
        }}
      >
        Home
      </a>

      <a 
        href="/add" 
        style={{ 
          marginRight: '20px', 
          fontWeight: 'bold',
          color: '#2563EB'
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
          fontWeight: 'bold'
        }}
      >
        {adminMode ? "Admin Mode: ON" : "Admin Mode: OFF"}
      </button>
    </nav>
  );
}

export default NavBar;
