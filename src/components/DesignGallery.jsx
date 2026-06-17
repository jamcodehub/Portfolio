import { useRef, useEffect, useState } from 'react';

const ITEMS = ['Logo Design', 'Website Mockup', 'Brand Identity', 'Digital Illustration', 'Social Media Graphics', 'Presentation Design'];

export default function DesignGallery() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const total = ITEMS.length;

  function getOffset(i) {
    const isMobile = window.innerWidth <= 640;
    return -(i * (isMobile ? 310 : 430));
  }

  function goTo(i, instant = false) {
    const track = trackRef.current;
    if (!track) return;
    if (instant) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${getOffset(i)}px)`;
      track.offsetHeight; // reflow
      track.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
    } else {
      track.style.transform = `translateX(${getOffset(i)}px)`;
    }
    setIdx(i);
  }

  function startAuto() {
    stopAuto();
    timerRef.current = setInterval(() => {
      setIdx(prev => {
        const next = prev + 1;
        const track = trackRef.current;
        if (!track) return prev;
        track.style.transform = `translateX(${getOffset(next)}px)`;
        if (next >= total) {
          setTimeout(() => goTo(0, true), 600);
        }
        return next;
      });
    }, 3000);
  }

  function stopAuto() { clearInterval(timerRef.current); }

  useEffect(() => {
    goTo(0, true);
    startAuto();
    return stopAuto;
  }, []);

  function navigate(dir) {
    stopAuto();
    const next = idx + dir;
    goTo(next);
    if (next >= total) setTimeout(() => goTo(0, true), 600);
    else if (next < 0) setTimeout(() => goTo(total - 1, true), 600);
    setTimeout(startAuto, 3000);
  }

  return (
    <div className="design-gallery-container">
      <button className="gallery-nav gallery-nav-left" onClick={() => navigate(-1)}>←</button>
      <button className="gallery-nav gallery-nav-right" onClick={() => navigate(1)}>→</button>
      <div className="gallery-track-wrapper">
        <div className="gallery-track" ref={trackRef}>
          {[...ITEMS, ...ITEMS].map((label, i) => (
            <div className="gallery-item" key={i}>
              <div className="gallery-placeholder"><span>{label}</span></div>
            </div>
          ))}
        </div>
      </div>
      <p className="demo-label">Auto-panning gallery • Use arrows to navigate</p>
    </div>
  );
}
