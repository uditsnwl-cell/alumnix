import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Briefcase, Star, ArrowRight, Bell, ChevronRight } from 'lucide-react';

const mentors = [
  { name: 'Priya Sharma', role: 'Product Manager', company: 'Google', match: 94, domain: 'Product', batch: '2019', color: '#f5a623' },
  { name: 'Arjun Mehta', role: 'SDE-2', company: 'Microsoft', match: 89, domain: 'Engineering', batch: '2020', color: '#4da6ff' },
  { name: 'Sneha Rao', role: 'Data Scientist', company: 'Zomato', match: 85, domain: 'Data Science', batch: '2018', color: '#22d45e' },
];

const activities = [
  { text: 'Priya Sharma accepted your connection request', time: '2 hours ago', dot: '#22d45e' },
  { text: 'New internship posted: Product Intern at Razorpay', time: '5 hours ago', dot: '#f5a623' },
  { text: 'Your profile match score improved to 87%', time: '1 day ago', dot: '#4da6ff' },
  { text: 'Karan Patel viewed your profile', time: '2 days ago', dot: '#a78bfa' },
];

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div style={{ background: 'var(--navy-card)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.07)', padding: 24, transition: 'all 0.3s', cursor: 'default' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color={color} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600, background: 'rgba(34,212,94,0.1)', padding: '3px 8px', borderRadius: 6 }}>{sub}</span>
    </div>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</div>
  </div>
);

export default function StudentDashboard({ setPage, user }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const firstName = user?.name?.split(' ')[0] || 'Student';
  const lastName = user?.name?.split(' ').slice(1).join(' ') || '';

  return (
    <div style={{ padding: 40, maxWidth: 1100, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 4 }}>Welcome back 👋</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--text-primary)' }}>
            {firstName} <span style={{ color: 'var(--gold)' }}>{lastName}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
            {user?.branch || 'B.Tech CSE'} · {user?.year || '3rd Year'} · IET Bareilly
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Bell size={20} color="var(--text-secondary)" />
            <span style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #e8880a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#07091a' }}>
            {firstName[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.15), rgba(245,166,35,0.05))', border: '1px solid var(--gold-border)', borderRadius: 16, padding: '20px 28px', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>🚀 Complete your profile to get better matches</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, width: 200 }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, var(--gold), #ffc55a)', borderRadius: 3 }} />
            </div>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 14 }}>68% Complete</span>
          </div>
        </div>
        <button onClick={() => setPage('profile')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: 'var(--gold)', color: '#07091a', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          Complete Now <ArrowRight size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
        <StatCard icon={Users} label="Alumni Connected" value="12" sub="+3 this week" color="#f5a623" />
        <StatCard icon={Briefcase} label="Applications Sent" value="4" sub="+1 today" color="#4da6ff" />
        <StatCard icon={Star} label="Profile Match Score" value="87%" sub="↑ 5% this week" color="#22d45e" />
        <StatCard icon={TrendingUp} label="Profile Views" value="38" sub="+12 this week" color="#a78bfa" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>🎯 AI Recommended Mentors</h2>
            <button onClick={() => setPage('mentors')} style={{ fontSize: 13, color: 'var(--gold)', background: 'none', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mentors.map((m, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + '44'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#07091a', flexShrink: 0, boxShadow: `0 4px 15px ${m.color}44` }}>
                  {m.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.role} · <span style={{ color: m.color }}>{m.company}</span></div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: m.color + '22', color: m.color, fontWeight: 600 }}>{m.domain}</span>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>Batch '{m.batch}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: m.color }}>{m.match}%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Match</div>
                  <button style={{ marginTop: 8, padding: '6px 16px', borderRadius: 8, border: `1px solid ${m.color}`, background: m.color + '22', color: m.color, fontSize: 12, fontWeight: 600, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = m.color; e.currentTarget.style.color = '#07091a'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = m.color + '22'; e.currentTarget.style.color = m.color; }}>
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>⚡ Recent Activity</h2>
          <div style={{ background: 'var(--navy-card)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: 24 }}>
            {activities.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < activities.length - 1 ? 20 : 0, marginBottom: i < activities.length - 1 ? 20 : 0, borderBottom: i < activities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.dot, marginTop: 6, flexShrink: 0, boxShadow: `0 0 8px ${a.dot}` }} />
                <div>
                  <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 4 }}>{a.text}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: 'linear-gradient(135deg, rgba(77,166,255,0.15), rgba(77,166,255,0.05))', border: '1px solid rgba(77,166,255,0.3)', borderRadius: 16, padding: 20 }}>
            <p style={{ fontSize: 12, color: '#4da6ff', fontWeight: 700, marginBottom: 8 }}>🤖 AI TIP OF THE DAY</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Alumni from your branch in FinTech are 3x more likely to refer you. Add "Financial Technology" to your interests to unlock 8 new matches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}