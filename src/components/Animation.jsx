import { useEffect } from 'react';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', background: '#111', borderRadius: '24px', overflow: 'hidden' }}>
      <h1 style={{ color: '#8b5cf6', fontSize: '5rem', fontWeight: 'bold', letterSpacing: '4px' }}>
        {text.split("").map((char, i) => (
          <span key={i} className="fallback-letter" style={{ animationDelay: `${i * 50}ms` }}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
