import React, { useState, useEffect } from 'react';
import { Search, Filter, Zap, CheckCircle } from 'lucide-react';

const allMentors = [
  { name: 'Priya Sharma', role: 'Product Manager', company: 'Google', match: 94, domain: 'Product', batch: '2019', color: '#f5a623', skills: ['Product Strategy', 'User Research', 'Roadmapping'], reason: 'Both interested in Product Management and have similar academic backgrounds in CSE.', bio: 'Ex-startup founder turned PM at Google. Passionate about building 0-to-1 products and mentoring students.', experience: ['Product Manager @ Google (2022-Present)', 'APM @ Razorpay (2020-2022)', 'Founder @ CampusApp (2018-2020)'] },
  { name: 'Arjun Mehta', role: 'SDE-2', company: 'Microsoft', match: 89, domain: 'Engineering', batch: '2020', color: '#4da6ff', skills: ['React', 'Node.js', 'System Design'], reason: 'Shares your interest in full-stack development and has mentored 8 students from your branch.', bio: 'Full-stack engineer at Microsoft working on Azure. I love discussing system design and scalable architectures.', experience: ['SDE-2 @ Microsoft (2022-Present)', 'SDE-1 @ Microsoft (2020-2022)'] },
  { name: 'Sneha Rao', role: 'Data Scientist', company: 'Zomato', match: 85, domain: 'Data Science', batch: '2018', color: '#22d45e', skills: ['Python', 'ML', 'SQL'], reason: 'Your Python skills and ML interest align strongly with her expertise.', bio: 'Data Scientist at Zomato optimizing food delivery routes using ML. Always happy to review resumes for DS roles.', experience: ['Data Scientist @ Zomato (2021-Present)', 'Data Analyst @ Swiggy (2018-2021)'] },
  { name: 'Karan Patel', role: 'Senior Consultant', company: 'Deloitte', match: 81, domain: 'Consulting', batch: '2021', color: '#a78bfa', skills: ['Strategy', 'Finance', 'Excel'], reason: 'Strong match on analytical skills and interest in business consulting.', bio: 'Consulting professional helping Fortune 500s with digital transformation. Can help you crack case interviews.', experience: ['Senior Consultant @ Deloitte (2023-Present)', 'Consultant @ Deloitte (2021-2023)'] },
  { name: 'Ananya Singh', role: 'FinTech Lead', company: 'HDFC Bank', match: 78, domain: 'FinTech', batch: '2017', color: '#f472b6', skills: ['Banking Tech', 'APIs', 'Java'], reason: 'Your interest in finance and tech makes this a strong domain match.', bio: 'Leading the digital banking infrastructure team. Transitioned from pure tech to FinTech domain.', experience: ['Engineering Lead @ HDFC (2021-Present)', 'Senior Engineer @ Paytm (2017-2021)'] },
  { name: 'Rohit Gupta', role: 'ML Engineer', company: 'Flipkart', match: 76, domain: 'AI/ML', batch: '2020', color: '#38bdf8', skills: ['TensorFlow', 'PyTorch', 'MLOps'], reason: 'Your coursework in AI aligns with his hands-on ML engineering experience.', bio: 'Working on recommendation systems. I enjoy teaching neural networks and helping students publish papers.', experience: ['ML Engineer @ Flipkart (2022-Present)', 'Data Engineer @ TCS (2020-2022)'] },
  { name: 'Neha Joshi', role: 'UX Designer', company: 'Swiggy', match: 72, domain: 'Design', batch: '2019', color: '#fb923c', skills: ['Figma', 'User Testing', 'Prototyping'], reason: 'You both have a creative and user-first approach based on your portfolio.', bio: 'Product designer focusing on user experience. Happy to do portfolio reviews and mock design interviews.', experience: ['UX Designer @ Swiggy (2021-Present)', 'UI/UX Designer @ Startup (2019-2021)'] },
  { name: 'Vikram Das', role: 'DevOps Engineer', company: 'Razorpay', match: 69, domain: 'DevOps', batch: '2018', color: '#34d399', skills: ['Docker', 'AWS', 'CI/CD'], reason: 'Your cloud computing elective aligns well with his expertise.', bio: 'Cloud and infrastructure specialist. Can guide you on AWS certifications and DevOps roadmaps.', experience: ['DevOps Engineer @ Razorpay (2020-Present)', 'Systems Engineer @ Infosys (2018-2020)'] },
];

const domains = ['All', 'Product', 'Engineering', 'Data Science', 'Consulting', 'FinTech', 'AI/ML', 'Design', 'DevOps'];

export default function MentorMatching() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [connected, setConnected] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const filtered = allMentors.filter(m =>
    (domain === 'All' || m.domain === domain) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: 40, maxWidth: 1100, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Zap size={20} color="var(--gold)" />
          <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>AI-Powered Matching</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--white)', marginBottom: 8 }}>Find Your Mentor</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>Our AI analyzes your profile, interests, and goals to find your perfect mentor match.</p>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or company..." style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy-card)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {domains.map(d => (
            <button key={d} onClick={() => setDomain(d)} style={{ padding: '10px 16px', borderRadius: 10, border: `1px solid ${domain === d ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: domain === d ? 'var(--gold-dim)' : 'var(--navy-card)', color: domain === d ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 13, fontWeight: domain === d ? 700 : 400, transition: 'all 0.2s' }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filtered.map((m, i) => (
          <div key={i} onClick={() => setSelectedProfile(m)} style={{ background: 'var(--navy-card)', borderRadius: 20, border: `1px solid ${expanded === i ? m.color + '55' : 'rgba(255,255,255,0.07)'}`, padding: 24, transition: 'all 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => { if (expanded !== i) e.currentTarget.style.borderColor = m.color + '44'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { if (expanded !== i) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#07091a', boxShadow: `0 4px 20px ${m.color}44` }}>
                  {m.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--white)', marginBottom: 2 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.role}</div>
                  <div style={{ fontSize: 13, color: m.color, fontWeight: 600 }}>{m.company}</div>
                </div>
              </div>
              {/* Match Score */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', border: `3px solid ${m.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: m.color, lineHeight: 1 }}>{m.match}%</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Match</div>
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: m.color + '22', color: m.color, fontWeight: 600 }}>{m.domain}</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>Batch '{m.batch}</span>
              {m.skills.map(s => (
                <span key={s} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>{s}</span>
              ))}
            </div>

            {/* Why this match */}
            {expanded === i && (
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px', marginBottom: 16, borderLeft: `3px solid ${m.color}` }}>
                <p style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, marginBottom: 4 }}>🤖 Why this match?</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.reason}</p>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              {connected[i] ? (
                <div onClick={(e) => e.stopPropagation()} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', borderRadius: 10, background: 'rgba(34,212,94,0.1)', color: 'var(--success)', fontSize: 13, fontWeight: 700 }}>
                  <CheckCircle size={14} /> Request Sent!
                </div>
              ) : (
                <button onClick={(e) => { e.stopPropagation(); setConnected(c => ({ ...c, [i]: true })); }} style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`, color: '#07091a', fontWeight: 700, fontSize: 14, transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  Connect
                </button>
              )}
              <button onClick={(e) => { e.stopPropagation(); setExpanded(expanded === i ? null : i); }} style={{ padding: '10px 14px', borderRadius: 10, border: `1px solid ${m.color}44`, background: 'transparent', color: m.color, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {expanded === i ? 'Less' : 'Why?'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Alumni Profile Modal ── */}
      {selectedProfile && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(10px)', padding: 20 }}>
          <div style={{ background: 'var(--navy)', borderRadius: 24, maxWidth: 500, width: '100%', boxShadow: `0 25px 60px ${selectedProfile.color}22`, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            
            {/* Header Banner */}
            <div style={{ height: 100, background: `linear-gradient(135deg, ${selectedProfile.color}88, ${selectedProfile.color}33)` }} />
            
            <button onClick={() => setSelectedProfile(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(0,0,0,0.3)', border: 'none', color: '#fff', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              &times;
            </button>

            <div style={{ padding: '0 32px 32px', position: 'relative', marginTop: -40 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: selectedProfile.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#000', border: '4px solid var(--navy)', marginBottom: 16 }}>
                {selectedProfile.name[0]}
              </div>
              
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 4px 0' }}>{selectedProfile.name}</h2>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 4 }}>
                {selectedProfile.role} <span style={{ color: selectedProfile.color, fontWeight: 600 }}>@ {selectedProfile.company}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
                Batch of {selectedProfile.batch} • {selectedProfile.domain}
              </div>

              {/* Bio */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>About</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {selectedProfile.bio}
                </p>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Experience</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedProfile.experience.map((exp, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedProfile.color, marginTop: 6 }} />
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{exp}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Top Skills</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selectedProfile.skills.map(s => (
                    <span key={s} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', color: '#fff' }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Connect Button */}
              <button 
                onClick={() => {
                  const idx = allMentors.findIndex(m => m.name === selectedProfile.name);
                  setConnected(c => ({ ...c, [idx]: true }));
                  setSelectedProfile(null);
                }} 
                style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${selectedProfile.color}, ${selectedProfile.color}cc)`, color: '#000', fontWeight: 800, fontSize: 15, cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                Request Mentorship
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
