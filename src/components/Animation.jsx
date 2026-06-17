import React, { useEffect } from 'react';
import { runMyAnimation } from '../data/split-text.js'; 

export default function Animation() {
  
  useEffect(() => {

    runMyAnimation();
  }, []); 

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '400px', 
      background: '#111',
      overflow: 'hidden'
    }}>
      {/* */}
      <p className="animated-text" style={{ 
        fontSize: '5rem', 
        fontWeight: 'bold', 
        color: '#8b5cf6',
        letterSpacing: '4px'
      }}>
        ANIMATION
      </p>
    </div>
  );
}