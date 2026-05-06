import React, { useState, useEffect } from 'react';
import { Edit3, CheckCircle, Zap, User, BookOpen, Code, Target, Award, Camera, Activity, Eye, Network, MapPin, Briefcase, Calendar, Link as LinkIcon, Github, Linkedin, GitCommit } from 'lucide-react';

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
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 0 80px', opacity: visible ? 1 : 0, transition: 'all 0.5s ease' }}>
      
      {/* === COVER PHOTO (LINKEDIN STYLE) === */}
      <div style={{ height: 220, background: 'linear-gradient(135deg, #1e293b, #0f172a, #020617)', borderBottom: '1px solid rgba(0,0,0,0.1)', position: 'relative', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)' }} />
        {editing && (
          <button style={{ position: 'absolute', top: 24, right: 24, padding: '8px 16px', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Camera size={16} /> Edit Background
          </button>
        )}
      </div>

      {/* === PROFILE INTRO SECTION === */}
      <div style={{ padding: '0 40px', position: 'relative', marginBottom: 32 }}>
        
        {/* Avatar */}
        <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'var(--navy-card)', border: '6px solid var(--navy)', position: 'absolute', top: -80, left: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--gold), #7c75f0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, fontWeight: 800, color: '#ffffff', position: 'relative' }}>
            {name[0]?.toUpperCase()}
            {editing && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Camera size={24} color="#fff" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons (Right aligned) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 24, gap: 16, height: 60 }}>
          {saved && (
            <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600 }}>
              <CheckCircle size={16} /> Saved Successfully
            </span>
          )}
          <button onClick={() => editing ? handleSave() : setEditing(true)} style={{ padding: '8px 20px', borderRadius: 20, border: editing ? 'none' : '1px solid var(--gold-border)', background: editing ? 'var(--gold)' : 'var(--gold-dim)', color: editing ? '#fff' : 'var(--gold)', fontWeight: 600, fontSize: 15, display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: editing ? '0 4px 12px rgba(79,70,229,0.3)' : 'none' }}>
            {editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        {/* Details text under Avatar */}
        <div style={{ marginTop: 20, maxWidth: 600 }}>
          {editing ? (
            <input value={name} onChange={e => setName(e.target.value)} style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', background: 'var(--navy-card)', border: '1px solid var(--gold-border)', borderRadius: 8, padding: '4px 12px', marginBottom: 8, width: '100%', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }} />
          ) : (
            <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>{name}</h1>
          )}

          {editing ? (
            <input value={branch} onChange={e => setBranch(e.target.value)} style={{ fontSize: 16, color: 'var(--text-secondary)', background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, padding: '6px 12px', width: '100%', marginBottom: 16, outline: 'none' }} />
          ) : (
            <div style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 500 }}>{branch}</div>
          )}

          <div style={{ display: 'flex', gap: 20, color: 'var(--text-muted)', fontSize: 14, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} /> India</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={16} /> {role === 'alumni' ? 'Alumni' : 'Student'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={16} /> {year}</div>
          </div>

          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--info)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Network size={16} /> 142 Connections <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· 4 Mentor Matches</span>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.06)', margin: '0 40px 32px' }} />

      {/* === 2-COLUMN PROFESSIONAL LAYOUT === */}
      <div style={{ display: 'flex', gap: 32, padding: '0 40px', alignItems: 'flex-start' }}>
        
        {/* LEFT SIDEBAR (30%) */}
        <div style={{ width: '32%', display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>
          
          {/* About / Bio */}
          <div style={{ background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>About</h2>
              {editing && <button onClick={handleGenBio} style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', color: 'var(--gold)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><Zap size={14} /> {generating ? 'Writing...' : 'AI Rewrite'}</button>}
            </div>
            {editing ? (
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={7} style={{ width: '100%', background: 'var(--navy-3)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 12, color: 'var(--text-primary)', fontSize: 14, resize: 'vertical', outline: 'none', lineHeight: 1.6 }} />
            ) : generating ? (
              <div>
                <div style={{ height: 12, background: 'linear-gradient(90deg, var(--navy-3), #e2e8f0, var(--navy-3))', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 4, marginBottom: 8 }} />
                <div style={{ height: 12, background: 'linear-gradient(90deg, var(--navy-3), #e2e8f0, var(--navy-3))', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite 0.2s', borderRadius: 4, width: '90%', marginBottom: 8 }} />
                <div style={{ height: 12, background: 'linear-gradient(90deg, var(--navy-3), #e2e8f0, var(--navy-3))', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite 0.4s', borderRadius: 4, width: '60%' }} />
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{bio}</p>
            )}
          </div>

          {/* Affiliation */}
          <div style={{ background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>Affiliation</h2>
            {editing ? (
              <select value={society} onChange={e => setSociety(e.target.value)} style={{ width: '100%', background: 'var(--navy-3)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: '10px 12px', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}>
                {societyOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.04)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={24} color="var(--text-secondary)" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{society !== 'None' ? society : 'Independent User'}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>AlumniX Community</div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT MAIN CONTENT (68%) */}
        <div style={{ width: '68%', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* GitHub Style Contribution Graph (Mock) */}
          <div style={{ background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <GitCommit size={18} color="var(--text-muted)"/> Platform Activity
            </h2>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
              {Array.from({ length: 285 }).map((_, i) => {
                const intensity = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
                const colors = ['rgba(0,0,0,0.04)', '#bbf7d0', '#4ade80', '#22c55e', '#16a34a'];
                return <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: colors[intensity] }} title={`${intensity} contributions`} />;
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
              <span>241 interactions in the last year</span>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                Less 
                <div style={{ width: 12, height: 12, borderRadius: 2, background: 'rgba(0,0,0,0.04)' }} />
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#bbf7d0' }} />
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#4ade80' }} />
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#22c55e' }} />
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#16a34a' }} />
                More
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div style={{ background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>Top Skills</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {skillOptions.map(s => {
                const active = skills.includes(s);
                if (!editing && !active) return null;
                return (
                  <button key={s} onClick={() => editing && toggleSkill(s)} style={{ padding: '8px 16px', background: active ? 'var(--gold-dim)' : 'transparent', border: active ? '1px solid var(--gold-border)' : '1px dashed rgba(0,0,0,0.15)', borderRadius: 20, color: active ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: editing ? 'pointer' : 'default', transition: 'all 0.2s' }}>
                    {s} {editing && (active ? ' ×' : ' +')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Career Interests Section */}
          <div style={{ background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>Career Interests</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {interestOptions.map(i => {
                const active = interests.includes(i);
                if (!editing && !active) return null;
                return (
                  <button key={i} onClick={() => editing && toggleInterest(i)} style={{ padding: '8px 16px', background: active ? 'var(--gold-dim)' : 'transparent', border: active ? '1px solid var(--gold-border)' : '1px dashed rgba(0,0,0,0.15)', borderRadius: 20, color: active ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: editing ? 'pointer' : 'default', transition: 'all 0.2s' }}>
                    {i} {editing && (active ? ' ×' : ' +')}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}