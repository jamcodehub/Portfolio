import React, { useEffect } from 'react';

export default function Animation() {
  
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes jump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .fallback-letter {
        display: inline-block;
        animation: jump 0.65s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const text = "ANIMATION";

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', background: '#111' }}>
      <h1 style={{ color: '#8b5cf6', fontSize: '5rem', fontWeight: 'bold' }}>
        {text.split("").map((char, index) => (
          <span 
            key={index} 
            className="fallback-letter" 
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}