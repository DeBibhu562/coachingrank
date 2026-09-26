'use client';

import { useState } from 'react';

const TOPICS = [
  'General Inquiry',
  'Suggest Institute Update',
  'Report Correction',
  'Partnership & Data',
] as const;

export default function ContactForm() {
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institute, setInstitute] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, topic, institute, message }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while sending your message.';
      setErrorMessage(msg);
      setStatus('error');
    }
  }

  function handleReset() {
    setName('');
    setEmail('');
    setInstitute('');
    setMessage('');
    setStatus('idle');
    setErrorMessage('');
  }

  return (
    <div className="contact-card">
      <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Send an Inquiry to Editorial Desk</h3>
      <p style={{ color: 'var(--ink-muted)', fontSize: '0.94rem', marginBottom: '24px' }}>
        Fill out the form below and our research desk will review your submission within 24–48 hours.
      </p>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: '#f0fdf4',
              border: '2px solid #86efac',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 16px',
              color: '#16a34a',
              fontSize: '1.5rem',
            }}
          >
            ✓
          </div>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--ink-primary)' }}>
            Inquiry Successfully Received
          </h4>
          <p style={{ color: 'var(--ink-secondary)', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            Thank you for reaching out. A confirmation has been logged with our verification and editorial team.
          </p>
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Topic Selector Pills */}
          <div className="form-group">
            <label className="form-label">Select Purpose of Contact</label>
            <div className="filter-pills-row" style={{ justifyContent: 'flex-start' }}>
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`filter-pill ${topic === t ? 'active' : ''}`}
                  onClick={() => setTopic(t)}
                  style={{ fontSize: '0.82rem' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Your Full Name <span style={{ color: 'var(--brand-primary)' }}>*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                className="form-input"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Your Email Address <span style={{ color: 'var(--brand-primary)' }}>*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-inst" className="form-label">
              Institute or Exam Mentioned (Optional)
            </label>
            <input
              id="contact-inst"
              type="text"
              className="form-input"
              placeholder="e.g. Knowledge Nation Law Centre, CLAT 2026, Delhi"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">
              Your Message or Correction Details <span style={{ color: 'var(--brand-primary)' }}>*</span>
            </label>
            <textarea
              id="contact-message"
              required
              className="form-textarea"
              placeholder="Please provide details, classroom addresses, verified roll numbers, or any questions for our team..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {status === 'error' && (
            <div
              style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 'var(--radius-sm)',
                color: '#b91c1c',
                fontSize: '0.9rem',
                marginBottom: '16px',
              }}
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending Message...' : 'Submit Inquiry to Editorial Desk →'}
          </button>
        </form>
      )}
    </div>
  );
}
