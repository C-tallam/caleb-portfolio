import { Mail, Phone, Github, Linkedin, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import ContactForm from './ContactForm.jsx';
import { profile } from '../data/portfolioData.js';

const channels = [
  { key: 'email', label: 'Email', Icon: Mail, href: (v) => `mailto:${v}` },
  { key: 'phone', label: 'Phone', Icon: Phone, href: (v) => `tel:${v.replace(/\s+/g, '')}` },
  { key: 'github', label: 'GitHub', Icon: Github, href: (v) => v, external: true },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin, href: (v) => v, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="glass contact-wrap reveal">
          <SectionHeading id="contact-title" eyebrow="Contact" title="Let's connect" subtitle="Open to internships, opportunities and conversations about technology. I'd love to hear from you." />
          <ul className="contact-grid">
            {channels.map(({ key, label, Icon, href, external }) => {
              const value = profile[key];
              const inner = (
                <>
                  <span className="icon-box"><Icon size={20} aria-hidden="true" /></span>
                  <span className="c-text">
                    <small>{label}</small>
                    <strong>{value ? value.replace(/^https?:\/\/(www\.)?/, '') : 'Not added yet'}</strong>
                  </span>
                </>
              );
              return (
                <li key={key}>
                  {value ? (
                    <a className="contact-item" href={href(value)} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={`${label}: ${value}`}>{inner}</a>
                  ) : (
                    <div className="contact-item off">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <h3 className="form-title">Send me a message</h3>
          <ContactForm />
          {profile.email && (
            <a className="btn primary center-btn" href={`mailto:${profile.email}`}>Send me an email <ArrowRight size={18} aria-hidden="true" /></a>
          )}
        </div>
      </div>
    </section>
  );
}
