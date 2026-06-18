import { animate, createScope, stagger, scrambleText } from 'animejs';
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

      animate('.anim-scramble', {
        innerHTML: scrambleText('In a world of technology anything is possible'),
        loop: true,
        loopDelay: 1000,
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <div ref={root} style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      minHeight: '400px', background: '#111', borderRadius: '24px', overflow: 'hidden',
      gap: '40px', padding: '60px 40px',
    }}>
      <div style={{ display: 'flex' }}>
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
      <p className="anim-scramble" style={{
        fontSize: '1.2rem', color: '#aaa', letterSpacing: '2px',
        fontFamily: 'Space Mono, monospace', textAlign: 'center', minHeight: '2rem',
      }}>
        In a world of technology and AI anything is possible, you just have to imagine it.
        <br /> But without the right tools and creativity, it can be hard to bring those ideas to life.
        <br /> There is a mountain of knowledge to climb, but the view from the top is worth it.
      </p>
    </div>
  );
}
