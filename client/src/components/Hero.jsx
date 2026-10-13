import { ArrowRight, Mail, MapPin, GraduationCap } from 'lucide-react';
import { profile } from '../data/portfolioData.js';

const nodes = [[210,210,16],[90,110,8],[330,90,9],[360,250,8],[250,350,9],[80,300,8],[210,70,6],[150,200,5],[300,190,5]];
const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,6],[6,2],[2,3],[3,4],[4,5],[5,1],[0,7],[0,8]];

function NetworkArt() {
  return (
    <svg className="net" viewBox="0 0 420 420" role="img" aria-label="Abstract network of connected nodes">
      <defs>
        <linearGradient id="ln" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c8cff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#22d3ee" stopOpacity=".9" />
          <stop offset="1" stopColor="#6c8cff" stopOpacity=".15" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="210" r="150" fill="none" stroke="url(#ln)" strokeOpacity=".15" strokeDasharray="3 7" />
      <circle cx="210" cy="210" r="100" fill="none" stroke="url(#ln)" strokeOpacity=".2" />
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="url(#ln)" strokeOpacity=".45" />
      ))}
      <circle cx="210" cy="210" r="34" fill="url(#core)" className="core" />
      {nodes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} className="node" style={{ animationDelay: `${i * 0.4}s` }} fill={i === 0 ? '#0b1224' : '#101a33'} stroke="url(#ln)" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="badge reveal"><span className="dot" />{profile.studentStatus}</p>
          <h1 id="hero-title" className="reveal" style={{ '--d': '80ms' }}>{profile.name}</h1>
          <p className="headline reveal" style={{ '--d': '160ms' }}>{profile.headline}</p>
          <p className="tagline reveal" style={{ '--d': '220ms' }}>{profile.tagline}</p>
          <p className="intro reveal" style={{ '--d': '280ms' }}>{profile.intro}</p>
          <div className="cta reveal" style={{ '--d': '340ms' }}>
            <a href="#projects" className="btn primary">View Projects <ArrowRight size={18} aria-hidden="true" /></a>
            <a href="#contact" className="btn ghost"><Mail size={18} aria-hidden="true" /> Contact Me</a>
          </div>
          <ul className="hero-meta reveal" style={{ '--d': '400ms' }}>
            <li><GraduationCap size={16} aria-hidden="true" /> {profile.university}</li>
            <li><MapPin size={16} aria-hidden="true" /> {profile.location}</li>
          </ul>
        </div>
        <div className="hero-visual reveal" style={{ '--d': '200ms' }}><NetworkArt /></div>
      </div>
    </section>
  );
}
