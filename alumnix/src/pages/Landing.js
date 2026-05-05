import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, TrendingUp, Users, Award, Star } from 'lucide-react';

const stats = [
  { value: '2,400+', label: 'Alumni Network', icon: Users },
  { value: '847', label: 'Placements Made', icon: TrendingUp },
  { value: '120+', label: 'Companies', icon: Award },
  { value: '94%', label: 'Match Accuracy', icon: Star },
];

const marqueeAlumni = [
  { name: 'Priya Sharma', role: 'Product Manager', company: 'Google', batch: "'19" },
  { name: 'Arjun Mehta', role: 'SDE-2', company: 'Microsoft', batch: "'20" },
  { name: 'Sneha Rao', role: 'Data Scientist', company: 'Zomato', batch: "'18" },
  { name: 'Karan Patel', role: 'Consultant', company: 'Deloitte', batch: "'21" },
  { name: 'Ananya Singh', role: 'FinTech Lead', company: 'HDFC Bank', batch: "'17" },
  { name: 'Rohit Gupta', role: 'ML Engineer', company: 'Flipkart', batch: "'20" },
];

const avatarColors = ['#f5a623','#4da6ff','#22d45e','#ff5c7a','#a78bfa','#f472b6'];

export default function Landing({ onEnter }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', overflow: 'hidden', position: 'relative' }}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', top: '-200px', right: '-200px', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-200px', left: '-100px', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(77,166,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 64px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--gold), #e8880a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(245,166,35,0.4)' }}>
            <Zap size={18} color="#07091a" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--white)' }}>
            Alumni<span style={{ color: 'var(--gold)' }}>X</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => onEnter('student')} style={{ padding: '10px 22px', borderRadius: 10, border: '1px solid var(--gold-border)', background: 'transparent', color: 'var(--gold)', fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-dim)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            Student Login
          </button>
          <button onClick={() => onEnter('alumni')} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, var(--gold), #e8880a)', color: '#07091a', fontSize: 14, fontWeight: 700, boxShadow: '0 4px 15px rgba(245,166,35,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            Alumni Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '100px 32px 60px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, border: '1px solid var(--gold-border)', background: 'var(--gold-dim)', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'pulse-gold 2s infinite' }} />
          <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>AI-Powered Alumni Network — Live</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 24, color: 'var(--white)' }}>
          Bridge the Gap Between<br />
          <span style={{ background: 'linear-gradient(135deg, var(--gold), #ffc55a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Students & Their Future
          </span>
        </h1>

        <p style={{ fontSize: 20, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.7 }}>
          73% of successful placements happen through connections, not applications.
          AlumniX connects you to the right alumni — intelligently.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onEnter('student')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, var(--gold), #e8880a)', color: '#07091a', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 30px rgba(245,166,35,0.35)', transition: 'all 0.3s', animation: 'float 3s ease-in-out infinite' }}>
            I'm a Student <ArrowRight size={18} />
          </button>
          <button onClick={() => onEnter('alumni')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'var(--white)', fontSize: 16, fontWeight: 600, transition: 'all 0.3s', backdropFilter: 'blur(10px)' }}>
            I'm an Alumni <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto 80px', padding: '0 32px', opacity: visible ? 1 : 0, transition: 'all 1s ease 0.3s' }}>
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} style={{ background: 'var(--navy-card)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: '24px', textAlign: 'center', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.border = '1px solid var(--gold-border)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
            <Icon size={22} color="var(--gold)" style={{ marginBottom: 12 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--white)', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Alumni marquee */}
      <div style={{ overflow: 'hidden', paddingBottom: 80, opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>Our Alumni Work At</p>
        <div style={{ display: 'flex', gap: 16, animation: 'none', overflowX: 'auto', padding: '0 64px', scrollbarWidth: 'none' }}>
          {[...marqueeAlumni, ...marqueeAlumni].map((a, i) => (
            <div key={i} style={{ flexShrink: 0, background: 'var(--navy-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, minWidth: 220 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: avatarColors[i % avatarColors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#07091a', flexShrink: 0 }}>
                {a.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{a.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{a.batch}</span></div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.role} · <span style={{ color: 'var(--gold)' }}>{a.company}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
