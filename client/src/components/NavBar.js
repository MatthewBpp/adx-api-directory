import React from 'react';

function NavBar() {
  return (
    <nav style={{
      padding: '12px',
      backgroundColor: '#F8FAFC',        // Slate 50 (light neutral)
      borderBottom: '1px solid #CBD5E1', // Slate 300 (accessible border)
      marginBottom: '20px'
    }}>
      {/* ---------------------------------------------------------
          NAVIGATION LINKS
          WCAG-compliant colours + clear affordance.
          Provides consistent navigation across all ADX screens.
         --------------------------------------------------------- */}
      <a 
        href="/" 
        style={{ 
          marginRight: '20px', 
          fontWeight: 'bold',
          color: '#2563EB'               // Primary Blue (trust + clarity)
        }}
      >
        Home
      </a>

      <a 
        href="/add" 
        style={{ 
          marginRight: '20px', 
          fontWeight: 'bold',
          color: '#2563EB'               // Primary Blue (consistent)
        }}
      >
        Add API
      </a>
    </nav>
  );
}

export default NavBar;
