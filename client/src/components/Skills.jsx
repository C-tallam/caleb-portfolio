import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Skills() {
  const { skills } = usePortfolio();
  return (
    <section id="skills" className="section band" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" eyebrow="Skills" title="What I work with" subtitle="Skills and tools I currently use, grouped by area." />
        <div className="skills-grid">
          {skills.map((s, i) => (
            <article key={s.title} className="glass skill-card reveal" style={{ '--d': `${i * 70}ms` }}>
              <span className="icon-box"><Icon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <ul className="chips">
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
