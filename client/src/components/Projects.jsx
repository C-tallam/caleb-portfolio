import { Rocket } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import { about } from '../data/portfolioData.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';

function EmptyState() {
  return (
    <div className="glass empty reveal">
      <div className="orbit" aria-hidden="true">
        <span className="ring r1" /><span className="ring r2" />
        <span className="sat s1" /><span className="sat s2" />
        <span className="core-icon"><Rocket size={30} /></span>
      </div>
      <h3>Projects Coming Soon</h3>
      <p>I'm currently building practical projects to showcase here.</p>
      <ul className="chips center" aria-label="Areas I'm building in">
        {about.interests.slice(0, 4).map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}

export default function Projects() {
  const { projects } = usePortfolio();
  return (
    <section id="projects" className="section band" aria-labelledby="proj-title">
      <div className="container">
        <SectionHeading id="proj-title" eyebrow="Projects" title="Things I'm building" />
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="projects-grid">
            {projects.map((p, i) => <ProjectCard key={p.id || p.name} project={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}
