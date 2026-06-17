import React, { useEffect } from 'react';
import { setupSplitText } from './split-text.js'; 

export default function Animation() {
  
  useEffect(() => {
    setupSplitText();
  }, []); // The empty array ensures this runs exactly once when the page loads

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', background: '#111' }}>
      <p className="animated-text" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', letterSpacing: '2px' }}>
        ANIMATION
      </p>
    </div>
  );
}