import { Github, ExternalLink, Calendar } from 'lucide-react';

export default function ProjectCard({ project, index = 0 }) {
  const { name, description, technologies = [], github, demo, image, imageAlt, date, category } = project;
  return (
    <article className="glass project-card reveal" style={{ '--d': `${index * 80}ms` }}>
      {image && <img src={image} alt={imageAlt || `${name} screenshot`} loading="lazy" className="project-img" />}
      <div className="project-body">
        <div className="project-top">
          {category && <span className="tag">{category}</span>}
          {date && <span className="date"><Calendar size={14} aria-hidden="true" /> {date}</span>}
        </div>
        <h3>{name}</h3>
        <p>{description}</p>
        {technologies.length > 0 && (
          <ul className="chips tech">{technologies.map((t) => <li key={t}>{t}</li>)}</ul>
        )}
        <div className="project-links">
          {github && <a href={github} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> Code<span className="sr">: {name} on GitHub</span></a>}
          {demo && <a href={demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden="true" /> Live demo<span className="sr">: {name}</span></a>}
        </div>
      </div>
    </article>
  );
}
