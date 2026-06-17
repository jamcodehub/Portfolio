import { animate, stagger } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, projects } from '../data/projects';
import ContactModal from './ContactModal';

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();
  const h1Ref = useRef(null);
  const pRef = useRef(null);

  useEffect(() => {
    animate({
      targets: '.header-content',
      translateY: [-10, 0],
      duration: 600, easing: 'easeOutQuad',
    });
    animate({
      targets: '.category-card',
      translateY: [20, 0],
      delay: stagger(80),
      duration: 500, easing: 'easeOutQuad',
    });
  }, []);

  function handleMouseMove(e, ref) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const l = Math.max(0, pct - 15);
    const r = Math.min(100, pct + 15);
    ref.current.style.setProperty('--underline-gradient',
      `linear-gradient(90deg,transparent 0%,transparent ${l}%,rgba(139,92,246,.6) ${pct}%,transparent ${r}%,transparent 100%)`);
  }

  return (
    <>
      <div className="home-view">
        <div className="container">
          <header className="header">
            <div className="header-content">
              <div className="profile-circle">
                <img src="/assets/imgs/james.png" alt="Profile" className="profile-image" />
              </div>
              <div className="header-text">
                <h1 ref={h1Ref} onMouseMove={e => handleMouseMove(e, h1Ref)}>James</h1>
                <p ref={pRef} onMouseMove={e => handleMouseMove(e, pRef)}>
                  Digital Creator &amp; Tech Enthusiast
                </p>
              </div>
            </div>
          </header>

          <section className="categories">
            <div className="category-grid">
              {categories.map(cat => (
                <div className="category-card" key={cat.key}>
                  <h2>{cat.label}</h2>
                  <ul className="project-list">
                    {projects[cat.key].map((proj, i) => (
                      <li key={proj.name}>
                        <button onClick={() => navigate(`/project/${cat.key}/${i}`)}>
                          {proj.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <footer className="footer">
            <div className="footer-content">
              <div className="social-links">
                <a href="https://www.linkedin.com/in/james-boardman-30b10016a/" target="_blank" rel="noopener noreferrer" className="social-icon">in</a>
                <a href="https://github.com/jamcodehub" target="_blank" rel="noopener noreferrer" className="social-icon">gh</a>
              </div>
              <button className="contact-button" onClick={() => setShowContact(true)}>Contact Me</button>
            </div>
          </footer>
        </div>
      </div>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
}
