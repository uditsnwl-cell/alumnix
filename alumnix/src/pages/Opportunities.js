import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp, Plus, CheckCircle, ExternalLink } from 'lucide-react';

const jobs = [
  { title: 'Product Management Intern', company: 'Google', postedBy: 'Priya Sharma', location: 'Bangalore', type: 'Internship', duration: '6 months', stipend: '₹50,000/mo', domain: 'Product', relevance: 96, color: '#f5a623', deadline: '15 May 2025' },
  { title: 'Software Development Engineer', company: 'Microsoft', postedBy: 'Arjun Mehta', location: 'Hyderabad', type: 'Full-time', duration: 'Permanent', stipend: '₹18 LPA', domain: 'Engineering', relevance: 91, color: '#4da6ff', deadline: '20 May 2025' },
  { title: 'Data Science Intern', company: 'Zomato', postedBy: 'Sneha Rao', location: 'Gurgaon', type: 'Internship', duration: '3 months', stipend: '₹30,000/mo', domain: 'Data Science', relevance: 88, color: '#22d45e', deadline: '18 May 2025' },
  { title: 'Business Analyst', company: 'Deloitte', postedBy: 'Karan Patel', location: 'Mumbai', type: 'Full-time', duration: 'Permanent', stipend: '₹12 LPA', domain: 'Consulting', relevance: 80, color: '#a78bfa', deadline: '25 May 2025' },
  { title: 'Frontend Developer Intern', company: 'Razorpay', postedBy: 'Vikram Das', location: 'Remote', type: 'Internship', duration: '4 months', stipend: '₹25,000/mo', domain: 'Engineering', relevance: 77, color: '#38bdf8', deadline: '12 May 2025' },
  { title: 'ML Research Intern', company: 'Flipkart', postedBy: 'Rohit Gupta', location: 'Bangalore', type: 'Internship', duration: '6 months', stipend: '₹40,000/mo', domain: 'AI/ML', relevance: 74, color: '#fb923c', deadline: '30 May 2025' },
];

const filters = ['All', 'Internship', 'Full-time'];
const domains = ['All', 'Product', 'Engineering', 'Data Science', 'Consulting', 'AI/ML'];

export default function Opportunities({ role }) {
  const [filter, setFilter] = useState('All');
  const [domain, setDomain] = useState('All');
  const [applied, setApplied] = useState({});
  const [visible, setVisible] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [form, setForm] = useState({ title: '', company: '', location: '', stipend: '', type: 'Internship', deadline: '' });
  const [posted, setPosted] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const filtered = jobs.filter(j =>
    (filter === 'All' || j.type === filter) &&
    (domain === 'All' || j.domain === domain)
  );

  if (showPost) {
    return (
      <div style={{ padding: 40, maxWidth: 700 }}>
        <button onClick={() => setShowPost(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>← Back</button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--white)', marginBottom: 8 }}>Post an Opportunity</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Help students from your university get their big break.</p>
        {posted ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <CheckCircle size={60} color="var(--success)" style={{ marginBottom: 20 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--white)', marginBottom: 12 }}>Opportunity Posted!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Students are already seeing your posting.</p>
            <button onClick={() => { setPosted(false); setShowPost(false); }} style={{ marginTop: 24, padding: '12px 28px', borderRadius: 12, border: 'none', background: 'var(--gold)', color: '#07091a', fontWeight: 700 }}>View All Opportunities</button>
          </div>
        ) : (
          <div style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[['Job Title', 'title', 'e.g. Product Management Intern'], ['Company', 'company', 'e.g. Google'], ['Location', 'location', 'e.g. Bangalore or Remote'], ['Stipend/Salary', 'stipend', 'e.g. ₹50,000/mo or ₹18 LPA'], ['Application Deadline', 'deadline', 'e.g. 30 May 2025']].map(([label, key, ph]) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy-2)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Type</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Internship', 'Full-time'].map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} style={{ padding: '10px 20px', borderRadius: 10, border: `1px solid ${form.type === t ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: form.type === t ? 'var(--gold-dim)' : 'transparent', color: form.type === t ? 'var(--gold)' : 'var(--text-secondary)', fontWeight: 600 }}>{t}</button>
                ))}
              </div>
            </div>
            <button onClick={() => setPosted(true)} style={{ padding: '14px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--gold), #e8880a)', color: '#07091a', fontWeight: 700, fontSize: 16 }}>
              Post Opportunity 🚀
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 1100, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--white)', marginBottom: 8 }}>
            {role === 'alumni' ? 'Posted Opportunities' : 'Opportunities For You'}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {role === 'alumni' ? 'Help students by sharing openings at your company.' : 'AI-ranked opportunities based on your profile match score.'}
          </p>
        </div>
        {role === 'alumni' && (
          <button onClick={() => setShowPost(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--gold), #e8880a)', color: '#07091a', fontWeight: 700, fontSize: 14 }}>
            <Plus size={16} /> Post Opportunity
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 18px', borderRadius: 10, border: `1px solid ${filter === f ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: filter === f ? 'var(--gold-dim)' : 'var(--navy-card)', color: filter === f ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 13, fontWeight: filter === f ? 700 : 400, transition: 'all 0.2s' }}>{f}</button>
        ))}
        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        {domains.map(d => (
          <button key={d} onClick={() => setDomain(d)} style={{ padding: '8px 18px', borderRadius: 10, border: `1px solid ${domain === d ? 'var(--info)' : 'rgba(255,255,255,0.1)'}`, background: domain === d ? 'rgba(77,166,255,0.1)' : 'var(--navy-card)', color: domain === d ? 'var(--info)' : 'var(--text-secondary)', fontSize: 13, fontWeight: domain === d ? 700 : 400, transition: 'all 0.2s' }}>{d}</button>
        ))}
      </div>

      {/* Job Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {filtered.map((j, i) => (
          <div key={i} style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 24, transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = j.color + '44'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
            {/* Top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: j.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                <Briefcase size={22} color={j.color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245,166,35,0.1)', borderRadius: 8, padding: '4px 10px' }}>
                <TrendingUp size={12} color="var(--gold)" />
                <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>{j.relevance}% Relevant</span>
              </div>
            </div>

            <h3 style={{ fontWeight: 700, fontSize: 17, color: 'var(--white)', marginBottom: 4 }}>{j.title}</h3>
            <p style={{ fontSize: 14, color: j.color, fontWeight: 600, marginBottom: 12 }}>{j.company}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <MapPin size={13} /> {j.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <Clock size={13} /> {j.duration}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>{j.stipend}</div>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: j.color + '22', color: j.color, fontWeight: 600 }}>{j.type}</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>{j.domain}</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>Posted by {j.postedBy.split(' ')[0]}</span>
            </div>

            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>⏰ Deadline: {j.deadline}</div>

            <button onClick={() => setApplied(a => ({ ...a, [i]: true }))} style={{ marginTop: 'auto', padding: '12px', borderRadius: 12, border: 'none', background: applied[i] ? 'rgba(34,212,94,0.15)' : `linear-gradient(135deg, ${j.color}, ${j.color}cc)`, color: applied[i] ? 'var(--success)' : '#07091a', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
              {applied[i] ? <><CheckCircle size={16} /> Applied!</> : <><ExternalLink size={14} /> Apply Now</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
