import { GraduationCap, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { about, profile } from '../data/portfolioData.js';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow="About" title="A bit about me" />
        <div className="about-grid">
          <div className="about-text reveal">
            {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <aside className="glass about-card reveal" style={{ '--d': '120ms' }} aria-label="At a glance">
            <p className="mini-title">At a glance</p>
            <ul className="facts">
              <li><GraduationCap size={18} aria-hidden="true" /><span>{profile.degree}<small>{profile.university}</small></span></li>
              <li><MapPin size={18} aria-hidden="true" /><span>{profile.location}</span></li>
            </ul>
            <p className="mini-title">Interests</p>
            <ul className="chips">
              {about.interests.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
