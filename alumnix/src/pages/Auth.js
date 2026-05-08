import React, { useState } from 'react';
import { Mail, Lock, User, Briefcase, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Auth({ role, onAuth, onBack }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    branch: role === 'alumni' ? '' : 'B.Tech Computer Science Engineering',
    year: role === 'alumni' ? 'Batch 2020' : '3rd Year',
    company: '',
    role_title: '',
  });
  const [error, setError] = useState('');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setError('');
    if (mode === 'login') {
      if (!form.email || !form.password) return setError('Please fill all fields');
      onAuth({
        name: form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: form.email,
        branch: role === 'alumni' ? 'B.Tech CSE' : 'B.Tech Computer Science Engineering',
        year: role === 'alumni' ? 'Batch 2020' : '3rd Year',
        company: role === 'alumni' ? 'Company Name' : '',
        role_title: role === 'alumni' ? 'Software Engineer' : '',
      });
    } else {
      if (!form.name || !form.email || !form.password) return setError('Please fill all required fields');
      if (role === 'alumni' && (!form.company || !form.role_title)) return setError('Please add your company and role');
      onAuth({
        name: form.name,
        email: form.email,
        branch: form.branch,
        year: form.year,
        company: form.company,
        role_title: form.role_title,
      });
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px 12px 44px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'var(--navy-2)',
    color: 'var(--text-primary)',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 480,
        background: 'var(--navy-card)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.07)',
        padding: 40,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: 'var(--text-secondary)',
          fontSize: 13, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}>
          <ArrowLeft size={14} /> Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, var(--gold), #e8880a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, boxShadow: '0 8px 30px rgba(245,166,35,0.4)',
          }}>
            {role === 'alumni' ? '🎓' : '📚'}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
            color: 'var(--text-primary)', marginBottom: 6,
          }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            {role === 'alumni' ? 'Alumni' : 'Student'} {mode === 'login' ? 'Login' : 'Sign Up'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'signup' && (
            <div style={{ position: 'relative' }}>
              <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full Name" style={inputStyle} />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="Email" style={inputStyle} />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Password" style={inputStyle} />
          </div>

          {mode === 'signup' && (
            <>
              <div style={{ position: 'relative' }}>
                <Briefcase size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input value={form.branch} onChange={e => update('branch', e.target.value)} placeholder="Branch / Program" style={inputStyle} />
              </div>

              <div style={{ position: 'relative' }}>
                <Calendar size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input value={form.year} onChange={e => update('year', e.target.value)} placeholder={role === 'alumni' ? 'Graduation Batch (e.g. Batch 2020)' : 'Year (e.g. 3rd Year)'} style={inputStyle} />
              </div>

              {role === 'alumni' && (
                <>
                  <div style={{ position: 'relative' }}>
                    <Briefcase size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                    <input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Current Company" style={inputStyle} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                    <input value={form.role_title} onChange={e => update('role_title', e.target.value)} placeholder="Job Title (e.g. Product Manager)" style={inputStyle} />
                  </div>
                </>
              )}
            </>
          )}

          {error && (
            <div style={{ fontSize: 13, color: 'var(--danger)', background: 'rgba(255,92,122,0.1)', padding: '10px 14px', borderRadius: 8 }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} style={{
            padding: '14px',
            borderRadius: 12,
            border: 'none',
            background: 'linear-gradient(135deg, var(--gold), #e8880a)',
            color: '#07091a',
            fontWeight: 700,
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 8,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(245,166,35,0.3)',
          }}>
            {mode === 'login' ? 'Login' : 'Create Account'} <ArrowRight size={16} />
          </button>

          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} style={{
              background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}>
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}