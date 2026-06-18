import { animate, utils, onScroll, splitText, scrambleText, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

export default function Animation() {
  const root = useRef(null);

  useEffect(() => {

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

    // ── Scramble text (plays once, stays) ──
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
    const [ scrollTrigger ] = utils.$('.scroll-trigger');

    animate('.scroll-circle', {
      scale: [0, 60],
      ease: 'inOut(3)',
      frameRate: 100,
      autoplay: onScroll({ target: scrollTrigger, sync: 0.5 }),
    });

    // ── Balls fade in mid-scroll ──
    animate('.stack-scene', {
      opacity: [0, 1],
      duration: 1,
      frameRate: 100,
      autoplay: onScroll({ target: scrollTrigger, sync: { start: 0.4, end: 0.6 } }),
    });

    // ── Reveal text fades in late-scroll ──
    animate('.scroll-reveal-text', {
      opacity: [0, 1],
      duration: 1,
      frameRate: 100,
      autoplay: onScroll({ target: scrollTrigger, sync: { start: 0.65, end: 0.9 } }),
    });

    // ── splitText word reveal ──
    const split = splitText('.scroll-reveal-text', { words: { wrap: 'clip' } });
    split.addEffect(self => animate(self.words, {
      y: ['100%', '0%'],
      duration: 1250,
      ease: 'out(3)',
      delay: stagger(100),
      frameRate: 100,
    }));

    // ── Stacking balls (button controlled) ──
    const [ leftBall  ] = utils.$('.stack-left');
    const [ rightBall ] = utils.$('.stack-right');
    const [ btnLeft   ] = utils.$('.stack-btn-left');
    const [ btnRight  ] = utils.$('.stack-btn-right');
    const [ btnReset  ] = utils.$('.stack-btn-reset');

    const leftAnim = animate(leftBall, {
      translateX: { to: 65, ease: 'outQuad' },
      translateY: [
        { to: -80, ease: 'outQuad', duration: 250 },
        { to: -62, ease: 'inQuad', duration: 250 },
      ],
      duration: 500,
      frameRate: 100,
      autoplay: false,
      onComplete: () => {
        btnLeft.style.opacity = '0';   btnLeft.style.pointerEvents = 'none';
        btnRight.style.opacity = '1';  btnRight.style.pointerEvents = 'auto';
      },
    });

    const rightAnim = animate(rightBall, {
      translateX: { to: -65, ease: 'outQuad' },
      translateY: [
        { to: -150, ease: 'outQuad', duration: 250 },
        { to: -124, ease: 'inQuad', duration: 250 },
      ],
      duration: 500,
      frameRate: 100,
      autoplay: false,
      onComplete: () => {
        btnRight.style.opacity = '0';  btnRight.style.pointerEvents = 'none';
        btnReset.style.opacity = '1';  btnReset.style.pointerEvents = 'auto';
      },
    });

    btnLeft.addEventListener('click',  () => leftAnim.restart());
    btnRight.addEventListener('click', () => rightAnim.restart());
    btnReset.addEventListener('click', () => {
      leftAnim.revert();
      rightAnim.revert();
      btnLeft.style.opacity  = '1';  btnLeft.style.pointerEvents  = 'auto';
      btnRight.style.opacity = '0';  btnRight.style.pointerEvents = 'none';
      btnReset.style.opacity = '0';  btnReset.style.pointerEvents = 'none';
    });

  }, []);

  const btnStyle = {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff', borderRadius: '20px',
    padding: '6px 18px', fontSize: '0.75rem',
    letterSpacing: '2px', cursor: 'pointer',
    fontFamily: 'Space Mono, monospace',
  };

  return (
    <div ref={root} style={{ width: '100%' }}>

      {/* Hero */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh',
        background: '#111', gap: '40px', padding: '80px 40px',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {'ANIMATION'.split('').map((char, i) => (
            <span key={i} className="anim-letter" style={{
              display: 'inline-block', fontWeight: 'bold', color: '#8b5cf6',
              fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '4px', margin: '0 2px',
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

        <div style={{ color: '#555', fontSize: '0.85rem', letterSpacing: '3px', animation: 'pulse 2s ease-in-out infinite' }}>
          ↓ scroll
        </div>
      </div>

      {/* Scroll section */}
      <div className="scroll-trigger" style={{ height: '300vh', background: '#111', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '60px',
        }}>

          {/* Expanding circle */}
          <div className="scroll-circle" style={{
            width: '80px', height: '80px', borderRadius: '50%', background: '#2e2a36',
            position: 'absolute', top: '50%', left: '50%',
            marginLeft: '-40px', marginTop: '-40px',
            transformOrigin: 'center center', zIndex: 1,
          }} />

          {/* Balls + buttons */}
          <div className="stack-scene" style={{
            opacity: 0, zIndex: 2, position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '180px' }}>
              <div className="stack-left"  style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#fff', margin: '0 8px' }} />
              <div className="stack-mid"   style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#fff', margin: '0 8px' }} />
              <div className="stack-right" style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#fff', margin: '0 8px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="stack-btn-left"  style={{ ...btnStyle, opacity: 1 }}>→</button>
              <button className="stack-btn-reset" style={{ ...btnStyle, opacity: 0, pointerEvents: 'none' }}>↺</button>
              <button className="stack-btn-right" style={{ ...btnStyle, opacity: 0, pointerEvents: 'none' }}>←</button>
            </div>
          </div>

          {/* Reveal text */}
          <p className="scroll-reveal-text" style={{
            zIndex: 2, position: 'relative', opacity: 0, textAlign: 'center',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 'bold',
            color: '#fff', letterSpacing: '4px', fontFamily: 'Space Mono, monospace',
          }}>
            now for the fun part
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(8px); }
        }
        button:hover { background: rgba(255,255,255,0.25) !important; }
      `}</style>
    </div>
  );
}
