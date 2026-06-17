import { animate, createScope, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

export default function Animation() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animate('.anim-letter', {
        translateY: [
          { to: -30, ease: 'inOut(3)', duration: 300 },
          { to: 0, ease: 'spring({ bounce: 0.7 })' }
        ],
        delay: stagger(60),
        loop: true,
        loopDelay: 1000,
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <div ref={root} style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '400px', background: '#111', borderRadius: '24px', overflow: 'hidden'
    }}>
      {'ANIMATE'.split('').map((char, i) => (
        <span key={i} className="anim-letter" style={{
          display: 'inline-block',
          fontSize: '5rem', fontWeight: 'bold',
          color: '#8b5cf6', letterSpacing: '4px',
          margin: '0 2px',
        }}>
          {char}
        </span>
      ))}
    </div>
  );
}
