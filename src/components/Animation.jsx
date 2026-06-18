import { animate, createScope, stagger, scrambleText, onScroll, splitText, utils } from 'animejs';
import { useEffect, useRef } from 'react';

export default function Animation() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {

      // ── Hero: bouncing letters ──
      animate('.anim-letter', {
        translateY: [
          { to: -30, ease: 'inOut(3)', duration: 300 },
          { to: 0, ease: 'spring({ bounce: 0.7 })' },
        ],
        delay: stagger(60),
        loop: true,
        loopDelay: 1000,
      });

      // ── Scramble text ──
      animate('.anim-scramble', {
        innerHTML: scrambleText('In a world of technology anything is possible'),
      });

      // ── Scroll: circle expands to cover background ──
      animate('.scroll-circle', {
        scale: [0, 40],
        ease: 'inOut(3)',
        autoplay: onScroll({
          target: '.scroll-section',
          container: '.anim-scroll-container',
          enter: 'top top',
          leave: 'bottom bottom',
          sync: true,
        }),
        onComplete: () => {
          // reveal text when circle fully covers screen
          const reveal = document.querySelector('.scroll-reveal-text');
          if (reveal) reveal.style.opacity = '1';
        }
      });

      // ── Reveal text with splitText ──
      const textEl = document.querySelector('.scroll-reveal-text');
      if (textEl) {
        const split = splitText('.scroll-reveal-text', {
          words: { wrap: 'clip' },
        });
        split.addEffect((self) => animate(self.words, {
          y: ['100%', '0%'],
          duration: 1250,
          ease: 'out(3)',
          delay: stagger(100),
          loop: true,
          alternate: true,
        }));
      }

    });

    return () => scope.current.revert();
  }, []);

  return (
    <div ref={root}>

      {/* ── Hero Section ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        minHeight: '500px', background: '#b7b7b7', borderRadius: '24px 24px 0 0',
        gap: '40px', padding: '60px 40px',
      }}>
        <div style={{ display: 'flex' }}>
          {'ANIMATE'.split('').map((char, i) => (
            <span key={i} className="anim-letter" style={{
              display: 'inline-block',
              fontSize: '5rem', fontWeight: 'bold',
              color: '#8b5cf6', letterSpacing: '4px', margin: '0 2px',
            }}>
              {char}
            </span>
          ))}
        </div>
        <p className="anim-scramble" style={{
          fontSize: '1.2rem', color: '#aaa', letterSpacing: '2px',
          fontFamily: 'Space Mono, monospace', textAlign: 'center', minHeight: '2rem',
        }}>
          In a world of technology anything is possible
        </p>
        <div style={{ color: '#555', fontSize: '0.9rem', letterSpacing: '2px', marginTop: '20px', animation: 'pulse 2s ease-in-out infinite' }}>
          ↓ scroll
        </div>
      </div>

      {/* ── Scroll Section ── */}
      <div className="anim-scroll-container" style={{
        height: '300vh',
        background: '#111',
        borderRadius: '0 0 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Sticky frame that holds the circle + text */}
        <div className="scroll-section" style={{
          position: 'sticky', top: 0,
          height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Expanding circle */}
          <div className="scroll-circle" style={{
            width: '60px', height: '60px',
            borderRadius: '50%',
            background: '#2e2a36',
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            transformOrigin: 'center center',
            zIndex: 1,
          }} />

          {/* Reveal text — hidden until circle covers screen */}
          <p className="scroll-reveal-text" style={{
            position: 'relative', zIndex: 2,
            fontSize: '3rem', fontWeight: 'bold',
            color: '#ffffff', letterSpacing: '4px',
            fontFamily: 'Space Mono, monospace',
            textAlign: 'center',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }}>
            now for the fun part
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}
