import { animate, createScope, stagger } from 'animejs';
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import DesignGallery from './DesignGallery';
import LumenElixirDemo from './LumenElixirDemo';
import Animation from './Animation';

export default function ProjectDetail() {
  const { cat, idx } = useParams();
  const navigate = useNavigate();
  const root = useRef(null);
  const scope = useRef(null);
  const project = projects[cat]?.[parseInt(idx)];

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animate('.project-detail-header, .project-content, .demo-section', {
        translateY: [16, 0], opacity: [0, 1],
        delay: stagger(80), duration: 500, ease: 'outQuad',
      });
    });
    window.scrollTo(0, 0);
    return () => scope.current.revert();
  }, [cat, idx]);

  if (!project) return (
    <div className="project-detail" ref={root}>
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Portfolio</button>
        <h1>Project not found</h1>
      </div>
    </div>
  );

  // Animation page — just the demo, no content
  if (project.hasDemo === 'animation') return (
    <div ref={root} style={{ position: 'relative' }}>
      <button className="back-button" onClick={() => navigate('/')} style={{
        position: 'fixed', top: 20, left: 20, zIndex: 100,
      }}>← Back</button>
      <Animation />
    </div>
  );

  return (
    <div className="project-detail" ref={root}>
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Portfolio</button>
        <div className="project-detail-header">
          <h1>{project.name}</h1>
          <span className="category-tag">{project.category}</span>
        </div>

        {project.hasDemo === 'stepquest' && (
          <div className="demo-section">
            <iframe src="/stepquest-demo.html" style={{ width: '100%', height: 900, border: 'none' }} title="StepQuest Demo" />
            <p className="demo-label">Swipe or drag to navigate between screens</p>
          </div>
        )}
        {project.hasDemo === 'mindmotion' && (
          <div className="demo-section">
            <iframe src="/mindmotion-demo.html" style={{ width: '100%', height: 900, border: 'none' }} title="MindMotion Demo" />
            <p className="demo-label">Swipe through educational content • Navigate between tabs</p>
          </div>
        )}
        {project.hasDemo === 'gallery' && (
          <div className="demo-section"><DesignGallery /></div>
        )}
        {project.hasDemo === 'lumen' && (
          <div className="demo-section"><LumenElixirDemo /></div>
        )}

        {project.isConfidential && (
          <div className="project-logo-section">
            <div style={{ fontSize: 80, textAlign: 'center', margin: '30px auto', background: '#8B5CF6', borderRadius: 12, padding: 30, display: 'inline-block', lineHeight: 1 }}>🔒</div>
          </div>
        )}

        <div className="project-content">
          <h2>Overview</h2>
          <p>{project.description}</p>

          <h2>{project.isConfidential ? 'Technologies & Skills Used' : project.skills ? 'Programs Used' : 'Key Features'}</h2>
          <ul>{project.features.map(f => <li key={f}>{f}</li>)}</ul>

          {project.skills && (
            <>
              <h2>Design Skills</h2>
              <ul>{project.skills.map(s => <li key={s}>{s}</li>)}</ul>
            </>
          )}

          {project.promptingTechniques && !project.isConfidential && (
            <>
              <h2>Prompting Techniques Used</h2>
              <p style={{ marginBottom: '1rem', color: 'var(--gray)' }}>
                This project required 200+ prompt messages to reach a stable state. Here are the key techniques that made it successful:
              </p>
              <ul>{project.promptingTechniques.map(t => <li key={t}>{t}</li>)}</ul>
            </>
          )}

          {project.isConfidential && project.promptingTechniques && (
            <>
              <h2>Prompt Engineering Approach</h2>
              <ul>{project.promptingTechniques.map(t => <li key={t}>{t}</li>)}</ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
