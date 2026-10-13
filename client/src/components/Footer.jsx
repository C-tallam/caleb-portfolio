import { Github, Linkedin, Mail } from 'lucide-react';
import { profile, navLinks, footer } from '../data/portfolioData.js';

export default function Footer() {
  const socials = [
    { label: 'GitHub', Icon: Github, href: profile.github },
    { label: 'LinkedIn', Icon: Linkedin, href: profile.linkedin },
    { label: 'Email', Icon: Mail, href: profile.email && `mailto:${profile.email}` },
  ].filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="f-name">{profile.name}</p>
          <p className="muted">{footer.tagline}</p>
          {socials.length > 0 && (
            <ul className="socials">
              {socials.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a href={href} aria-label={label} {...(label !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Footer">
          <ul className="f-links">
            {navLinks.map((l) => <li key={l.id}><a href={`#${l.id}`}>{l.label}</a></li>)}
          </ul>
        </nav>
      </div>
      <p className="container copy">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  );
}
