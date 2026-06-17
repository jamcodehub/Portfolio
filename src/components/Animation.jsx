import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';

// 1. Tell React where your newly fixed Animation file is
import Animation from './Animation'; 

export default function ProjectDetail() {
  const { category, id } = useParams();
  const project = projects[category]?.[id];

  if (!project) return <div>Project not found!</div>;

  return (
    <div className="project-detail-view">
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <div className="project-demo-area">
        {/* 2. When the user is on the animation project, render it! */}
        {project.hasDemo === 'animation' && <Animation />}
      </div>
    </div>
  );
}