import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Star, TrendingUp, Plus, CheckCircle } from 'lucide-react';

const requests = [
  { name: 'Rahul Kumar', branch: 'CSE · 3rd Year', interest: 'Product Management', match: 91, color: '#f5a623' },
  { name: 'Divya Nair', branch: 'ECE · Final Year', interest: 'Data Science', match: 87, color: '#4da6ff' },
  { name: 'Amit Sinha', branch: 'CSE · 2nd Year', interest: 'Software Engineering', match: 82, color: '#22d45e' },
];

const postedJobs = [
  { title: 'Product Intern', company: 'Google', applicants: 14, status: 'Active', color: '#f5a623' },
  { title: 'Data Analyst', company: 'Google', applicants: 7, status: 'Active', color: '#4da6ff' },
];

export default function AlumniDashboard({ setPage, user }) {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState({});
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const firstName = user?.name?.split(' ')[0] || 'Alumni';
  const lastName = user?.name?.split(' ').slice(1).join(' ') || '';

  return (
    <div style={{ padding: 40, maxWidth: 1100, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 4 }}>Welcome back, Alumni 🎓</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--text-primary)' }}>
            {firstName} <span style={{ color: 'var(--gold)' }}>{lastName}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
            {user?.role_title || 'Professional'} · {user?.company || 'Company'} · {user?.year || 'Batch 2020'}
          </p>
        </div>
        <button onClick={() => setPage('opportunities')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--gold), #e8880a)', color: '#07091a', fontWeight: 700, fontSize: 14, boxShadow: '0 4px 20px rgba(245,166,35,0.3)' }}>
          <Plus size={16} /> Post Opportunity
        </button>
      </div>

      <div style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.12), rgba(168,139,250,0.08))', border: '1px solid var(--gold-border)', borderRadius: 16, padding: '20px 28px', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, color: 'var(--gold)', lineHeight: 1 }}>92</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Mentor Score</div>
          </div>
          <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.1)' }} />
          <div>
            <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>🏆 Top 5% Alumni Mentor</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 400 }}>Your Mentor Score is visible to recruiters. Higher scores attract better collaboration and referral opportunities.</p>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, background: 'var(--gold-dim)', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--gold-border)' }}>
          +3 this month ↑
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
        {[
          { icon: Users, label: 'Students Mentored', value: '34', sub: '+5 this month', color: '#f5a623' },
          { icon: Briefcase, label: 'Jobs Posted', value: '6', sub: '2 active now', color: '#4da6ff' },
          { icon: Star, label: 'Referrals Made', value: '12', sub: '3 got hired!', color: '#22d45e' },
          { icon: TrendingUp, label: 'Profile Views', value: '156', sub: '+28 this week', color: '#a78bfa' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} style={{ background: 'var(--navy-card)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: 24, transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon size={20} color={color} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 11, color: '#22d45e', fontWeight: 600 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
              📬 Connection Requests <span style={{ marginLeft: 8, background: 'var(--gold)', color: '#07091a', borderRadius: 20, padding: '2px 10px', fontSize: 13, fontWeight: 800 }}>{requests.length}</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {requests.map((r, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, transition: 'all 0.3s' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#07091a', flexShrink: 0 }}>
                  {r.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{r.branch}</div>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: r.color + '22', color: r.color, fontWeight: 600 }}>Interested in: {r.interest}</span>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: r.color, marginBottom: 4 }}>{r.match}%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>Compatibility</div>
                  {accepted[i] ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontSize: 13, fontWeight: 600 }}>
                      <CheckCircle size={14} /> Accepted
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setAccepted(a => ({ ...a, [i]: true }))} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'var(--success)', color: '#fff', fontSize: 12, fontWeight: 600 }}>Accept</button>
                      <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,92,122,0.4)', background: 'transparent', color: 'var(--danger)', fontSize: 12, fontWeight: 600 }}>Pass</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>📋 Your Posted Jobs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {postedJobs.map((j, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{j.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{j.company}</div>
                  </div>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(34,212,94,0.15)', color: 'var(--success)', fontWeight: 600, height: 'fit-content' }}>{j.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <Users size={13} /> {j.applicants} applicants
                </div>
              </div>
            ))}
            <button onClick={() => setPage('opportunities')} style={{ padding: '14px', borderRadius: 14, border: '2px dashed rgba(245,166,35,0.3)', background: 'transparent', color: 'var(--gold)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-dim)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Plus size={16} /> Post New Opportunity
            </button>
          </div>

          <div style={{ marginTop: 20, background: 'linear-gradient(135deg, rgba(34,212,94,0.1), rgba(34,212,94,0.03))', border: '1px solid rgba(34,212,94,0.2)', borderRadius: 16, padding: 20 }}>
            <p style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700, marginBottom: 8 }}>🌟 YOUR IMPACT</p>
            <p style={{ fontSize: 22, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>3 Students Hired</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Through your referrals this year. You're making a real difference!</p>
          </div>
        </div>
      </div>
    </div>
  );
}