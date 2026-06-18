import { animate, createScope, stagger, scrambleText, onScroll, splitText } from 'animejs';
import { useEffect, useRef } from 'react';

export default function Animation() {
  const root        = useRef(null);
  const scope       = useRef(null);
  const circleRef   = useRef(null);
  const stackScene  = useRef(null);
  const revealText  = useRef(null);
  const scrollTrig  = useRef(null);
  const leftBall    = useRef(null);
  const rightBall   = useRef(null);
  const btnLeft     = useRef(null);
  const btnRight    = useRef(null);
  const btnReset    = useRef(null);

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
        frameRate: 100,
      });

      // ── Scramble text ──
      animate('.anim-scramble', {
        innerHTML: scrambleText({
          chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          speed: 0.5,
          text: 'In a world of technology and AI anything is possible, you just have to imagine it. But without the right tools and creativity, it can be hard to bring those ideas to life. There is a mountain of knowledge to climb, but the view from the top is worth it.',
        }),
        duration: 6000,
        ease: 'linear',
        frameRate: 100,
      });

      // ── Circle expands on scroll ──
      animate(circleRef.current, {
        scale: [0, 60],
        ease: 'inOut(3)',
        frameRate: 100,
        autoplay: onScroll({
          target: scrollTrig.current,
          sync: 0.5,
        }),
      });

      // ── Balls fade in between 40–60% scroll progress ──
      animate(stackScene.current, {
        opacity: [0, 1],
        duration: 1,
        ease: 'linear',
        frameRate: 100,
        autoplay: onScroll({
          target: scrollTrig.current,
          sync: { start: 0.4, end: 0.6 },
        }),
      });

      // ── Reveal text fades in between 65–90% ──
      animate(revealText.current, {
        opacity: [0, 1],
        duration: 1,
        ease: 'linear',
        frameRate: 100,
        autoplay: onScroll({
          target: scrollTrig.current,
          sync: { start: 0.65, end: 0.9 },
        }),
      });

      // ── splitText reveal ──
      const split = splitText(revealText.current, {
        words: { wrap: 'clip' },
      });
      split.addEffect((self) => animate(self.words, {
        y: ['100%', '0%'],
        duration: 1250,
        ease: 'out(3)',
        delay: stagger(100),
        frameRate: 100,
      }));

      // ── Button-controlled stacking ──
      const dur = 500;

      const leftAnim = animate(leftBall.current, {
        translateX: { to: 65, ease: 'outQuad' },
        translateY: [
          { to: -80, ease: 'outQuad', duration: dur * 0.5 },
          { to: -62, ease: 'inQuad', duration: dur * 0.5 },
        ],
        duration: dur,
        frameRate: 100,
        autoplay: false,
        onComplete: () => {
          btnLeft.current.style.opacity = '0';
          btnLeft.current.style.pointerEvents = 'none';
          btnRight.current.style.opacity = '1';
          btnRight.current.style.pointerEvents = 'auto';
        },
      });

      const rightAnim = animate(rightBall.current, {
        translateX: { to: -65, ease: 'outQuad' },
        translateY: [
          { to: -150, ease: 'outQuad', duration: dur * 0.5 },
          { to: -124, ease: 'inQuad', duration: dur * 0.5 },
        ],
        duration: dur,
        frameRate: 100,
        autoplay: false,
        onComplete: () => {
          btnRight.current.style.opacity = '0';
          btnRight.current.style.pointerEvents = 'none';
          btnReset.current.style.opacity = '1';
          btnReset.current.style.pointerEvents = 'auto';
        },
      });

      btnLeft.current.addEventListener('click',  () => leftAnim.restart());
      btnRight.current.addEventListener('click', () => rightAnim.restart());
      btnReset.current.addEventListener('click', () => {
        leftAnim.revert();
        rightAnim.revert();
        btnLeft.current.style.opacity  = '1'; btnLeft.current.style.pointerEvents  = 'auto';
        btnRight.current.style.opacity = '0'; btnRight.current.style.pointerEvents = 'none';
        btnReset.current.style.opacity = '0'; btnReset.current.style.pointerEvents = 'none';
      });

    });

    return () => scope.current.revert();
  }, []);

  const btnStyle = {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff', borderRadius: '20px',
    padding: '6px 18px', fontSize: '0.75rem',
    letterSpacing: '2px', cursor: 'pointer',
    transition: 'opacity 0.3s ease, background 0.2s ease',
    fontFamily: 'Space Mono, monospace',
  };

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
              fontWeight: 'bold', color: '#8b5cf6',
              letterSpacing: '4px', margin: '0 2px',
            }}>{char}</span>
          ))}
        </div>

        <p className="anim-scramble" style={{
          fontSize: '1rem', color: '#aaa', letterSpacing: '1px',
          fontFamily: 'Space Mono, monospace', textAlign: 'center',
          maxWidth: '700px', lineHeight: '1.8', minHeight: '5rem',
        }}>
          In a world of technology and AI anything is possible, you just have to imagine it. But without the right tools and creativity, it can be hard to bring those ideas to life. There is a mountain of knowledge to climb, but the view from the top is worth it.
        </p>

        <div style={{
          color: '#555', fontSize: '0.85rem', letterSpacing: '3px',
          marginTop: '20px', animation: 'pulse 2s ease-in-out infinite',
        }}>↓ scroll</div>
      </div>

      {/* ── Scroll Section ── */}
      <div ref={scrollTrig} style={{
        height: '300vh', background: '#111', position: 'relative',
      }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', gap: '60px',
        }}>

          {/* Expanding circle */}
          <div ref={circleRef} style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: '#2e2a36',
            position: 'absolute',
            top: '50%', left: '50%',
            marginLeft: '-40px', marginTop: '-40px',
            transformOrigin: 'center center',
            zIndex: 1,
          }} />

          {/* Balls + buttons */}
          <div ref={stackScene} style={{
            position: 'relative', zIndex: 2, opacity: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '20px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'center', height: '180px',
            }}>
              <div ref={leftBall} style={{
                width: '50px', height: '50px', borderRadius: '50%',
                background: '#ffffff', margin: '0 8px', flexShrink: 0,
              }} />
              <div style={{
                width: '50px', height: '50px', borderRadius: '50%',
                background: '#ffffff', margin: '0 8px', flexShrink: 0,
              }} />
              <div ref={rightBall} style={{
                width: '50px', height: '50px', borderRadius: '50%',
                background: '#ffffff', margin: '0 8px', flexShrink: 0,
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button ref={btnLeft}  style={{ ...btnStyle, opacity: 1 }}>→</button>
              <button ref={btnReset} style={{ ...btnStyle, opacity: 0, pointerEvents: 'none' }}>↺</button>
              <button ref={btnRight} style={{ ...btnStyle, opacity: 0, pointerEvents: 'none' }}>←</button>
            </div>
          </div>

          {/* Reveal text */}
          <p ref={revealText} style={{
            position: 'relative', zIndex: 2,
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 'bold',
            color: '#ffffff', letterSpacing: '4px',
            fontFamily: 'Space Mono, monospace', textAlign: 'center', opacity: 0,
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
        button:hover { background: rgba(255,255,255,0.25) !important; }
      `}</style>
    </div>
  );
}
