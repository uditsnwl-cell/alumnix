import React, { useState, useEffect } from 'react';
import { Edit3, CheckCircle, Zap, User, BookOpen, Code, Target, Award } from 'lucide-react';

const skillOptions = ['React', 'Python', 'Java', 'Machine Learning', 'SQL', 'Node.js', 'Data Analysis', 'Product Management', 'UI/UX Design', 'System Design', 'AWS', 'Docker'];
const interestOptions = ['FinTech', 'Product Management', 'Data Science', 'Software Engineering', 'AI/ML', 'Consulting', 'Design', 'DevOps', 'Research', 'Entrepreneurship'];
const societyOptions = ['None', 'UCS - University Coding Society', 'UDT - University Design Team', 'ULC - University Literary Club'];

const generateBio = async (name, branch, year, skills, interests) => {
  await new Promise(r => setTimeout(r, 1800));
  return `I'm ${name}, a ${year} ${branch.includes('Batch') ? 'graduate' : 'student'} with a strong foundation in ${skills.slice(0, 2).join(' and ')}. I'm passionate about building innovative solutions at the intersection of technology and ${interests[0] || 'business'}. Exploring opportunities in ${interests.slice(0, 2).join(' and ')}, I thrive in collaborative environments where I can apply my analytical thinking to real-world problems.`;
};

export default function Profile({ role, user, setUser }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || (role === 'alumni' ? 'Alumni User' : 'Student User'));
  const [branch, setBranch] = useState(user?.branch || 'B.Tech Computer Science Engineering');
  const [year, setYear] = useState(user?.year || (role === 'alumni' ? 'Batch 2020' : '3rd Year'));
  const [bio, setBio] = useState(user?.bio || (role === 'alumni'
    ? `${user?.role_title || 'Professional'} at ${user?.company || 'Company'}. Passionate about mentoring students from my alma mater.`
    : 'Add your bio or generate one using AI below.'));
  const [skills, setSkills] = useState(user?.skills || ['React', 'Python', 'SQL']);
  const [interests, setInterests] = useState(user?.interests || ['Product Management', 'FinTech']);
  const [society, setSociety] = useState(user?.society || 'None');
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleGenBio = async () => {
    setGenerating(true);
    setBio(await generateBio(name, branch, year, skills, interests));
    setGenerating(false);
  };

  const handleSave = () => {
    setEditing(false); setSaved(true);
    if (setUser) setUser(prev => ({ ...prev, name, branch, year, bio, skills, interests, society }));
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleSkill = s => setSkills(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleInterest = i => setInterests(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const completion = Math.min(100, [name, branch, year, bio.length > 50, skills.length > 0, interests.length > 0, society !== 'None'].filter(Boolean).length * 14);

  return (
    <div style={{ padding: 40, maxWidth: 900, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--white)', marginBottom: 8 }}>My Profile</h1>
          <p style={{ color: 'var(--text-secondary)' }}>A complete profile gets 5x more mentor matches.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: 'rgba(34,212,94,0.1)', color: 'var(--success)', fontSize: 14, fontWeight: 600 }}>
              <CheckCircle size={16} /> Saved!
            </div>
          )}
          <button onClick={() => editing ? handleSave() : setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: editing ? 'linear-gradient(135deg, var(--gold), #e8880a)' : 'var(--navy-card)', color: editing ? '#07091a' : 'var(--text-primary)', fontWeight: 700, fontSize: 14, border: editing ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
            {editing ? <><CheckCircle size={16} /> Save Profile</> : <><Edit3 size={16} /> Edit Profile</>}
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--navy-card)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontWeight: 600, color: 'var(--white)', fontSize: 14 }}>Profile Completion</span>
          <span style={{ fontWeight: 800, color: 'var(--gold)', fontSize: 16 }}>{completion}%</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
          <div style={{ width: `${completion}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold), #ffc55a)', borderRadius: 4, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 32, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #e8880a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, color: '#07091a', flexShrink: 0, boxShadow: '0 8px 30px rgba(245,166,35,0.4)' }}>
            {name[0]?.toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <User size={15} color="var(--gold)" />
              <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Full Name</span>
            </div>
            {editing ? (
              <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--gold-border)', background: 'var(--navy-2)', color: 'var(--white)', fontSize: 20, fontWeight: 700, outline: 'none', marginBottom: 12, fontFamily: 'var(--font-display)' }} />
            ) : (
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--white)', marginBottom: 12 }}>{name}</h2>
            )}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Branch / Program</div>
                {editing ? <input value={branch} onChange={e => setBranch(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy-2)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
                  : <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{branch}</div>}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{role === 'alumni' ? 'Graduation Batch' : 'Current Year'}</div>
                {editing ? <input value={year} onChange={e => setYear(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy-2)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
                  : <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{year}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Society */}
      <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Award size={16} color="var(--gold)" />
          <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: 16 }}>University Society</span>
        </div>
        {editing ? (
          <select value={society} onChange={e => setSociety(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy-2)', color: 'var(--text-primary)', fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            {societyOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : (
          <div style={{ padding: '12px 16px', background: society !== 'None' ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)', border: `1px solid ${society !== 'None' ? 'var(--gold-border)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 10, color: society !== 'None' ? 'var(--gold)' : 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}>
            {society === 'None' ? 'Not part of any society yet' : `🏆 ${society}`}
          </div>
        )}
      </div>

      <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={16} color="var(--gold)" />
            <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: 16 }}>Professional Bio</span>
          </div>
          <button onClick={handleGenBio} disabled={generating} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, border: '1px solid var(--gold-border)', background: 'var(--gold-dim)', color: 'var(--gold)', fontSize: 13, fontWeight: 700, opacity: generating ? 0.7 : 1 }}>
            <Zap size={14} />
            {generating ? 'AI Writing...' : 'Generate with AI ✨'}
          </button>
        </div>
        {generating ? (
          <div style={{ padding: '20px', background: 'var(--navy-2)', borderRadius: 10, border: '1px solid var(--gold-border)' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {[1, 2, 3].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', animation: `pulse-gold ${0.5 + i * 0.2}s infinite` }} />)}
              <span style={{ fontSize: 13, color: 'var(--gold)' }}>AI is crafting your bio...</span>
            </div>
            <div style={{ height: 12, background: 'linear-gradient(90deg, var(--navy-3), var(--gold-dim), var(--navy-3))', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 6, marginBottom: 8 }} />
            <div style={{ height: 12, background: 'linear-gradient(90deg, var(--navy-3), var(--gold-dim), var(--navy-3))', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite 0.2s', borderRadius: 6, width: '80%' }} />
          </div>
        ) : editing ? (
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={5} style={{ width: '100%', padding: '14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy-2)', color: 'var(--text-primary)', fontSize: 14, outline: 'none', lineHeight: 1.7, resize: 'vertical' }} />
        ) : (
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{bio}</p>
        )}
      </div>

      <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Code size={16} color="var(--gold)" />
          <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: 16 }}>Skills</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {skillOptions.map(s => {
            const active = skills.includes(s);
            return (
              <button key={s} onClick={() => editing && toggleSkill(s)} style={{ padding: '8px 16px', borderRadius: 20, border: `1px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: active ? 'var(--gold-dim)' : 'transparent', color: active ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 13, fontWeight: active ? 700 : 400, cursor: editing ? 'pointer' : 'default' }}>
                {active && '✓ '}{s}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Target size={16} color="var(--gold)" />
          <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: 16 }}>Career Interests</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {interestOptions.map(i => {
            const active = interests.includes(i);
            return (
              <button key={i} onClick={() => editing && toggleInterest(i)} style={{ padding: '8px 16px', borderRadius: 20, border: `1px solid ${active ? '#4da6ff' : 'rgba(255,255,255,0.1)'}`, background: active ? 'rgba(77,166,255,0.1)' : 'transparent', color: active ? 'var(--info)' : 'var(--text-secondary)', fontSize: 13, fontWeight: active ? 700 : 400, cursor: editing ? 'pointer' : 'default' }}>
                {active && '✓ '}{i}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}