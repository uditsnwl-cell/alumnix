import React, { useState, useEffect } from 'react';
import { Users, Award, Calendar, ArrowLeft, Crown, Star, X, Mail, Briefcase, GraduationCap } from 'lucide-react';

export const societiesData = [
  {
    code: 'E-Cell',
    name: 'Entrepreneurship Development Cell',
    description: 'Fostering the spirit of entrepreneurship and innovation. We organize hackathons, startup pitches, and connect students with investors and industry leaders.',
    icon: '🚀',
    color: '#10b981',
    founded: '2010',
    members: 120,
    achievements: ['Organizing the Annual Hackathon', 'Incubated 5 student startups', 'Secured $50k in funding'],
    president: { name: 'Karan Singh', role: 'President', branch: 'MBA · Final Year', color: '#10b981', email: 'karan@ecell.edu', bio: 'Serial student entrepreneur. Leading the charge for campus innovation.' },
    vicePresident: { name: 'Aditi Rao', role: 'Vice President', branch: 'CSE · 3rd Year', color: '#34d399', email: 'aditi@ecell.edu', bio: 'Tech lead turned startup enthusiast. Managing the upcoming hackathon.' },
    membersList: [
      { name: 'Rahul Dev', role: 'Events Head', branch: 'BBA · 3rd Year', color: '#6ee7b7', email: 'rahul@ecell.edu', bio: 'Master organizer.' },
      { name: 'Sneha Jain', role: 'Member', branch: 'IT · 2nd Year', color: '#059669', email: 'sneha@ecell.edu', bio: 'Marketing wizard.' },
    ],
  },
  {
    code: 'UCS',
    name: 'University Cultural Society',
    description: 'Celebrating diversity and talent through dance, music, and art. We bring the campus to life with vibrant cultural fests and performances.',
    icon: '🎭',
    color: '#f5a623',
    founded: '2012',
    members: 87,
    achievements: ['Best Cultural Fest 2023', 'National Dance Competition Winners', '100+ Campus Performances'],
    president: { name: 'Aarav Singh', role: 'President', branch: 'CSE · Final Year', color: '#f5a623', email: 'aarav.singh@university.edu', bio: 'Passionate dancer and choreographer.' },
    vicePresident: { name: 'Meera Kapoor', role: 'Vice President', branch: 'CSE · 3rd Year', color: '#ffc55a', email: 'meera.k@university.edu', bio: 'Lead vocalist of the university band.' },
    membersList: [
      { name: 'Ishita Roy', role: 'Events Lead', branch: 'IT · 3rd Year', color: '#22d45e', email: 'ishita@university.edu', bio: 'Organized 12+ cultural events with 500+ attendees.' },
    ],
  },
  {
    code: 'UDT',
    name: 'University Dramatic Team',
    description: 'Bringing stories to life on stage. From street plays to grand theatrical productions, we explore the depth of human emotion.',
    icon: '🎬',
    color: '#4da6ff',
    founded: '2015',
    members: 54,
    achievements: ['Best Play at National Fest 2024', 'Performed at Prithvi Theatre', '50+ Nukkad Nataks'],
    president: { name: 'Tara Iyer', role: 'President', branch: 'Arts · Final Year', color: '#4da6ff', email: 'tara.iyer@university.edu', bio: 'Award-winning stage actor and director.' },
    vicePresident: { name: 'Aryan Verma', role: 'Vice President', branch: 'CSE · 3rd Year', color: '#60a5fa', email: 'aryan.v@university.edu', bio: 'Scriptwriter and lighting expert.' },
    membersList: [
      { name: 'Diya Shah', role: 'Lead Actor', branch: 'Design · 3rd Year', color: '#f5a623', email: 'diya@university.edu', bio: 'Known for powerful emotional performances.' },
    ],
  },
  {
    code: 'ULC',
    name: 'University Literary Committee',
    description: 'Wordsmiths, poets, and storytellers. We host debates, poetry slams, book clubs, and creative writing workshops to celebrate the power of language.',
    icon: '📚',
    color: '#a78bfa',
    founded: '1998',
    members: 62,
    achievements: ['National Debate Champions 2024', 'Published 5 student anthologies', '20+ literary fest wins'],
    president: { name: 'Anaya Sharma', role: 'President', branch: 'English Lit · Final Year', color: '#a78bfa', email: 'anaya@university.edu', bio: 'Award-winning poet and debater. Published in 3 national magazines.' },
    vicePresident: { name: 'Devansh Rao', role: 'Vice President', branch: 'Journalism · 3rd Year', color: '#c084fc', email: 'devansh@university.edu', bio: 'Journalist covering politics and arts. Editor of the campus newspaper.' },
    membersList: [
      { name: 'Riya Menon', role: 'Debate Captain', branch: 'Law · 3rd Year', color: '#f5a623', email: 'riya@university.edu', bio: 'Won 8 national-level debates. Future advocate.' },
    ],
  },
];

function MemberModal({ member, onClose, society }) {
  if (!member) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(7,9,26,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20,
      animation: 'fadeIn 0.3s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 480,
        background: 'var(--navy-card)', borderRadius: 24,
        border: `1px solid ${member.color}44`,
        padding: 40, position: 'relative',
        boxShadow: `0 30px 80px ${member.color}33`,
        animation: 'fadeUp 0.4s ease',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20, width: 32, height: 32, borderRadius: 8,
          border: 'none', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><X size={18} /></button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%',
            background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, color: '#07091a',
            boxShadow: `0 10px 30px ${member.color}55`,
          }}>{member.name[0]}</div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{member.name}</h2>
            <div style={{ fontSize: 14, color: member.color, fontWeight: 600 }}>{member.role}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{member.branch}</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Bio</div>
          <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7 }}>{member.bio}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
            <Mail size={15} color={member.color} />
            <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{member.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
            <Award size={15} color={member.color} />
            <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{society.code} · {society.name}</span>
          </div>
        </div>

        <button style={{
          width: '100%', marginTop: 24, padding: '14px', borderRadius: 12, border: 'none',
          background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)`,
          color: '#07091a', fontWeight: 700, fontSize: 15,
        }}>Send Connection Request</button>
      </div>
    </div>
  );
}

function SocietyDetail({ society, onBack }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ padding: 40, maxWidth: 1100, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 14,
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6,
      }}><ArrowLeft size={16} /> Back to Societies</button>

      {/* Banner */}
      <div style={{
        position: 'relative', borderRadius: 24, overflow: 'hidden', marginBottom: 32,
        background: `linear-gradient(135deg, ${society.color}33, ${society.color}08)`,
        border: `1px solid ${society.color}55`,
        padding: 40, minHeight: 200,
      }}>
        <div style={{
          position: 'absolute', top: -50, right: -50, width: 250, height: 250,
          background: `radial-gradient(circle, ${society.color}44, transparent 70%)`,
          borderRadius: '50%', filter: 'blur(20px)',
        }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{
            width: 100, height: 100, borderRadius: 24, fontSize: 56,
            background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${society.color}55`,
          }}>{society.icon}</div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 800, color: society.color, lineHeight: 1, marginBottom: 6 }}>{society.code}</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{society.name}</h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}><Calendar size={14} /> Founded {society.founded}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}><Users size={14} /> {society.members} members</div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 28, marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>About</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{society.description}</p>
      </div>

      {/* Achievements */}
      <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 28, marginBottom: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>🏆 Achievements</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {society.achievements.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <Star size={14} color={society.color} fill={society.color} />
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>👑 Leadership</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
        {[society.president, society.vicePresident].map((p, i) => (
          <div key={i} onClick={() => setSelectedMember(p)} style={{
            background: `linear-gradient(135deg, ${p.color}22, transparent)`,
            border: `1px solid ${p.color}44`, borderRadius: 20, padding: 24,
            display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 15px 40px ${p.color}33`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#07091a',
              }}>{p.name[0]}</div>
              <div style={{
                position: 'absolute', bottom: -4, right: -4, width: 26, height: 26, borderRadius: '50%',
                background: 'var(--navy)', border: `2px solid ${p.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Crown size={12} color={p.color} fill={p.color} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: p.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{p.role}</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.branch}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Members */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>👥 Members</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {society.membersList.map((m, i) => (
          <div key={i} onClick={() => setSelectedMember(m)} style={{
            background: 'var(--navy-card)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: 20, cursor: 'pointer', transition: 'all 0.3s',
            textAlign: 'center',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + '55'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', margin: '0 auto 12px',
              background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#07091a',
            }}>{m.name[0]}</div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, marginBottom: 4 }}>{m.name}</div>
            <div style={{ fontSize: 12, color: m.color, fontWeight: 600, marginBottom: 4 }}>{m.role}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.branch}</div>
          </div>
        ))}
      </div>

      <MemberModal member={selectedMember} society={society} onClose={() => setSelectedMember(null)} />
    </div>
  );
}

export default function Societies() {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  if (selected) return <SocietyDetail society={selected} onBack={() => setSelected(null)} />;

  return (
    <div style={{ padding: 40, maxWidth: 1100, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Award size={20} color="var(--gold)" />
          <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>University Societies</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Explore Societies</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>Discover communities, meet members, and find mentors who shared your passion.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {societiesData.map((s, i) => (
          <div key={i} onClick={() => setSelected(s)} className="tilt-card" style={{
            background: `linear-gradient(135deg, ${s.color}15, transparent)`,
            border: `1px solid ${s.color}44`, borderRadius: 24,
            padding: 32, cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 50px ${s.color}33`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 180, height: 180,
              background: `radial-gradient(circle, ${s.color}33, transparent 70%)`,
              borderRadius: '50%',
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: s.color, marginBottom: 6, letterSpacing: -1 }}>{s.code}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{s.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{s.description.slice(0, 100)}...</p>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {s.members} members</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> Since {s.founded}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}