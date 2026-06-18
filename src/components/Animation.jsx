import { animate, createScope, stagger, scrambleText, onScroll, splitText } from 'animejs';
import { useEffect, useRef } from 'react';

export default function Animation() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {

      // ── Bouncing letters ──
      animate('.anim-letter', {
        translateY: [
          { to: -30, ease: 'inOut(3)', duration: 300 },
          { to: 0, ease: 'spring({ bounce: 0.7 })' },
        ],
        delay: stagger(60),
        loop: true,
        loopDelay: 1000,
      });

      // ── Scramble text — plays once and stays ──
      animate('.anim-scramble', {
        innerHTML: scrambleText(
          'In a world of technology and AI anything is possible, you just have to imagine it. But without the right tools and creativity, it can be hard to bring those ideas to life. There is a mountain of knowledge to climb, but the view from the top is worth it.'
        ),
      });

      // ── Scroll: circle expands to fill screen ──
      animate('.scroll-circle', {
        scale: [0, 60],
        ease: 'inOut(3)',
        autoplay: onScroll({
          target: '.scroll-trigger',
          sync: 0.5,
        }),
      });

      // ── Reveal text opacity tied to scroll progress ──
      animate('.scroll-reveal-text', {
        opacity: [0, 1],
        ease: 'inOut(3)',
        autoplay: onScroll({
          target: '.scroll-trigger',
          sync: 0.5,
          enter: '50% bottom',
          leave: '100% bottom',
        }),
      });

      // ── splitText reveal animation ──
      const split = splitText('.scroll-reveal-text', {
        words: { wrap: 'clip' },
      });
      split.addEffect((self) => animate(self.words, {
        y: ['100%', '0%'],
        duration: 1250,
        ease: 'out(3)',
        delay: stagger(100),
      }));

    });

    return () => scope.current.revert();
  }, []);

  return (
    <div ref={root} style={{ width: '100%' }}>

      {/* ── Hero ── */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh', background: '#111',
        gap: '40px', padding: '80px 40px',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {'ANIMATION'.split('').map((char, i) => (
            <span key={i} className="anim-letter" style={{
              display: 'inline-block',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 'bold',
              color: '#8b5cf6',
              letterSpacing: '4px',
              margin: '0 2px',
            }}>
              {char}
            </span>
          ))}
        </div>

        <p className="anim-scramble" style={{
          fontSize: '1rem',
          color: '#aaa',
          letterSpacing: '1px',
          fontFamily: 'Space Mono, monospace',
          textAlign: 'center',
          maxWidth: '700px',
          lineHeight: '1.8',
          minHeight: '5rem',
        }}>
          In a world of technology and AI anything is possible, you just have to imagine it. But without the right tools and creativity, it can be hard to bring those ideas to life. There is a mountain of knowledge to climb, but the view from the top is worth it.
        </p>

        <div style={{
          color: '#555', fontSize: '0.85rem', letterSpacing: '3px',
          marginTop: '40px', animation: 'pulse 2s ease-in-out infinite',
        }}>
          ↓ scroll
        </div>
      </div>

      {/* ── Scroll Section ── */}
      <div className="scroll-trigger" style={{
        height: '300vh',
        background: '#111',
        position: 'relative',
      }}>
        <div style={{
          position: 'sticky', top: 0,
          height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Expanding circle */}
          <div className="scroll-circle" style={{
            width: '80px', height: '80px',
            borderRadius: '50%',
            background: '#2e2a36',
            position: 'absolute',
            top: '50%', left: '50%',
            translateX: '-50%',
            translateY: '-50%',
            transformOrigin: 'center center',
            zIndex: 1,
          }} />

          {/* Reveal text */}
          <p className="scroll-reveal-text" style={{
            position: 'relative', zIndex: 2,
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 'bold',
            color: '#ffffff',
            letterSpacing: '4px',
            fontFamily: 'Space Mono, monospace',
            textAlign: 'center',
            opacity: 0,
          }}>
            now for the fun part
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
