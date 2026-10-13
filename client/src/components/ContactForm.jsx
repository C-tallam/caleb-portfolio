import { useState } from 'react';
import { Send } from 'lucide-react';
import { api } from '../api/client.js';

const empty = { name: '', email: '', subject: '', message: '', website: '' };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ state: 'idle', text: '', details: [] });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', text: '', details: [] });
    try {
      await api.post('/api/contact', form);
      setForm(empty);
      setStatus({ state: 'success', text: "Thanks! Your message has been sent. I'll get back to you soon.", details: [] });
    } catch (err) {
      const text = err.status === 429
        ? err.message
        : err.status === 400
          ? 'Please check the highlighted details and try again.'
          : "Couldn't send your message right now. Please try again in a moment.";
      setStatus({ state: 'error', text, details: err.details || [] });
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false} aria-label="Contact form">
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" value={form.name} onChange={onChange} required minLength={2} maxLength={100} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" value={form.email} onChange={onChange} required maxLength={254} autoComplete="email" />
      </div>
      <div className="field full">
        <label htmlFor="cf-subject">Subject <span className="muted">(optional)</span></label>
        <input id="cf-subject" name="subject" value={form.subject} onChange={onChange} maxLength={150} />
      </div>
      <div className="field full">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={5} value={form.message} onChange={onChange} required minLength={10} maxLength={3000} />
      </div>
      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
      </div>
      <div className="full form-actions">
        <button className="btn primary" type="submit" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : <>Send message <Send size={18} aria-hidden="true" /></>}
        </button>
        <div role="status" aria-live="polite" className={`form-status ${status.state}`}>
          {status.text}
          {status.details.length > 0 && (
            <ul>{status.details.map((d, i) => <li key={i}>{d.field}: {d.message}</li>)}</ul>
          )}
        </div>
      </div>
    </form>
  );
}
