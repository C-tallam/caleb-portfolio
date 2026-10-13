import { Building2, Calendar, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Experience() {
  const { experience } = usePortfolio();
  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="container">
        <SectionHeading id="exp-title" eyebrow="Experience" title="Where I've worked" subtitle="Practical experience gained through industrial attachments in ICT." />
        <ol className="timeline">
          {experience.map((e, i) => (
            <li key={e.id} className="tl-item reveal" style={{ '--d': `${i * 100}ms` }}>
              <span className="tl-dot" aria-hidden="true" />
              <article className="glass exp-card">
                {e.type && <p className="mini-title">{e.type}</p>}
                <h3>{e.organization}</h3>
                <ul className="meta">
                  {e.department && <li><Building2 size={16} aria-hidden="true" /> {e.department} Department</li>}
                  {e.location && <li><MapPin size={16} aria-hidden="true" /> {e.location}</li>}
                  <li><Calendar size={16} aria-hidden="true" /> {e.start} – {e.end || 'Present'}</li>
                </ul>
                {e.description && <p>{e.description}</p>}
                {e.focusAreas?.length > 0 && (
                  <>
                    <p className="mini-title">Areas involved</p>
                    <ul className="chips">{e.focusAreas.map((f) => <li key={f}>{f}</li>)}</ul>
                  </>
                )}
                {e.responsibilities?.length > 0 && (
                  <ul className="bullets">{e.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                )}
                {e.technologies?.length > 0 && (
                  <ul className="chips tech">{e.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
