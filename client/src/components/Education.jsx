import { ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Education() {
  const { education, certifications } = usePortfolio();
  return (
    <section id="education" className="section" aria-labelledby="edu-title">
      <div className="container">
        <SectionHeading id="edu-title" eyebrow="Education" title="Academic background" />
        <div className="edu-list">
          {education.map((e, i) => (
            <article key={e.id} className="glass edu-card reveal" style={{ '--d': `${i * 80}ms` }}>
              <span className="icon-box lg"><Icon name="graduation" size={28} /></span>
              <div>
                <h3>{e.qualification}</h3>
                <p className="edu-inst">{e.institution}{e.location ? `, ${e.location}` : ''}</p>
                {e.period && <p className="muted">{e.period}</p>}
                {e.details && <p>{e.details}</p>}
              </div>
            </article>
          ))}
        </div>
        {certifications.length > 0 && (
          <>
            <h3 className="sub-h reveal">Certifications</h3>
            <div className="skills-grid">
              {certifications.map((c) => (
                <article key={c.id} className="glass skill-card reveal">
                  <span className="icon-box"><Icon name="award" /></span>
                  <h3>{c.name}</h3>
                  <p className="muted">{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                  {c.url && <a className="link" href={c.url} target="_blank" rel="noopener noreferrer">View credential <ExternalLink size={14} aria-hidden="true" /></a>}
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
