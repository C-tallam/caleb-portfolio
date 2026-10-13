import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';
import { learning } from '../data/portfolioData.js';

export default function Learning() {
  return (
    <section id="learning" className="section band" aria-labelledby="learn-title">
      <div className="container">
        <SectionHeading id="learn-title" eyebrow="Growth" title="Currently learning & exploring" subtitle="Areas I'm actively developing right now." />
        <ul className="learn-grid">
          {learning.map((l, i) => (
            <li key={l.label} className="learn-tile reveal" style={{ '--d': `${i * 60}ms` }}>
              <Icon name={l.icon} size={24} />
              <span>{l.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
