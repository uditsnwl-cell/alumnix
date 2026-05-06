import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp, Plus, CheckCircle, ExternalLink } from 'lucide-react';

const jobs = [
  { title: 'Product Management Intern', company: 'Google', postedBy: 'Priya Sharma', location: 'Bangalore', type: 'Internship', duration: '6 months', stipend: '₹50,000/mo', domain: 'Product', relevance: 96, color: '#f5a623', deadline: '15 May 2025', description: 'Join the Google Workspace team to help build the next generation of collaborative tools. You will work closely with engineering and design to define product requirements.', requirements: ['Strong analytical skills', 'Basic understanding of UI/UX', 'Prior startup or product experience is a plus'] },
  { title: 'Software Development Engineer', company: 'Microsoft', postedBy: 'Arjun Mehta', location: 'Hyderabad', type: 'Full-time', duration: 'Permanent', stipend: '₹18 LPA', domain: 'Engineering', relevance: 91, color: '#4da6ff', deadline: '20 May 2025', description: 'We are looking for SDEs for the Azure Cloud infrastructure team. You will be building highly scalable distributed systems.', requirements: ['Proficient in C++ or Java', 'Strong grasp of Data Structures and Algorithms', 'Experience with distributed systems'] },
  { title: 'Data Science Intern', company: 'Zomato', postedBy: 'Sneha Rao', location: 'Gurgaon', type: 'Internship', duration: '3 months', stipend: '₹30,000/mo', domain: 'Data Science', relevance: 88, color: '#22d45e', deadline: '18 May 2025', description: 'Help optimize delivery routes and estimate food preparation times using machine learning models.', requirements: ['Proficient in Python and SQL', 'Experience with scikit-learn and pandas', 'Strong statistical foundation'] },
  { title: 'Business Analyst', company: 'Deloitte', postedBy: 'Karan Patel', location: 'Mumbai', type: 'Full-time', duration: 'Permanent', stipend: '₹12 LPA', domain: 'Consulting', relevance: 80, color: '#a78bfa', deadline: '25 May 2025', description: 'Work with Fortune 500 clients to drive digital transformation initiatives and streamline business processes.', requirements: ['Excellent communication skills', 'Strong problem-solving ability', 'Proficiency in Excel and SQL'] },
  { title: 'Frontend Developer Intern', company: 'Razorpay', postedBy: 'Vikram Das', location: 'Remote', type: 'Internship', duration: '4 months', stipend: '₹25,000/mo', domain: 'Engineering', relevance: 77, color: '#38bdf8', deadline: '12 May 2025', description: 'Join our core checkout team. You will be building accessible, fast, and secure payment interfaces used by millions.', requirements: ['Strong React.js skills', 'Understanding of web performance', 'Familiarity with TypeScript'] },
  { title: 'ML Research Intern', company: 'Flipkart', postedBy: 'Rohit Gupta', location: 'Bangalore', type: 'Internship', duration: '6 months', stipend: '₹40,000/mo', domain: 'AI/ML', relevance: 74, color: '#fb923c', deadline: '30 May 2025', description: 'Conduct research in recommender systems and natural language processing to improve the product discovery experience.', requirements: ['Experience with PyTorch or TensorFlow', 'Published papers are a strong plus', 'Deep understanding of NLP'] },
  { title: 'Cloud Architect', company: 'Amazon', postedBy: 'Aditi Verma', location: 'Bangalore', type: 'Full-time', duration: 'Permanent', stipend: '₹24 LPA', domain: 'Engineering', relevance: 85, color: '#f59e0b', deadline: '10 Jun 2025', description: 'Design and deploy scalable, highly available, and fault-tolerant systems on AWS for enterprise customers.', requirements: ['AWS Solutions Architect Certification', '5+ years of software engineering', 'Expertise in microservices'] },
  { title: 'UI/UX Designer', company: 'Swiggy', postedBy: 'Neha Joshi', location: 'Bangalore', type: 'Full-time', duration: 'Permanent', stipend: '₹14 LPA', domain: 'Design', relevance: 82, color: '#ec4899', deadline: '05 Jun 2025', description: 'Create intuitive user experiences for our consumer app. Work with product managers to conduct user research and prototype features.', requirements: ['Strong portfolio showcasing mobile design', 'Proficiency in Figma', 'Understanding of design systems'] }
];

const filters = ['All', 'Internship', 'Full-time'];
const domains = ['All', 'Product', 'Engineering', 'Data Science', 'Consulting', 'AI/ML', 'Design'];

export default function Opportunities({ role }) {
  const [filter, setFilter] = useState('All');
  const [domain, setDomain] = useState('All');
  const [applied, setApplied] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyFormOpen, setApplyFormOpen] = useState(null);
  const [applicationData, setApplicationData] = useState({ resume: '', portfolio: '', coverLetter: '' });
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
          <div key={i} onClick={() => setSelectedJob({ ...j, index: i })} style={{ background: 'var(--navy-card)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', padding: 24, transition: 'all 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
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

            {applied[i] ? (
              <button onClick={(e) => e.stopPropagation()} style={{ marginTop: 'auto', padding: '12px', borderRadius: 12, border: 'none', background: 'rgba(34,212,94,0.15)', color: 'var(--success)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'default' }}>
                <CheckCircle size={16} /> Applied!
              </button>
            ) : (
              <button onClick={(e) => { e.stopPropagation(); setApplyFormOpen({ ...j, index: i }); }} style={{ marginTop: 'auto', padding: '12px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${j.color}, ${j.color}cc)`, color: '#07091a', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s', cursor: 'pointer' }}>
                <ExternalLink size={14} /> Apply Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ── Job Profile Modal ── */}
      {selectedJob && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(10px)', padding: 20 }}>
          <div style={{ background: 'var(--navy)', borderRadius: 24, maxWidth: 600, width: '100%', boxShadow: `0 25px 60px ${selectedJob.color}22`, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            
            <div style={{ padding: 32, borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: selectedJob.color }} />
              <button onClick={() => setSelectedJob(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                &times;
              </button>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: selectedJob.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: `1px solid ${selectedJob.color}44` }}>
                  <Briefcase size={32} color={selectedJob.color} />
                </div>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 4px 0' }}>{selectedJob.title}</h2>
                  <div style={{ fontSize: 16, color: selectedJob.color, fontWeight: 700 }}>{selectedJob.company}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}><MapPin size={16} /> {selectedJob.location}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}><Clock size={16} /> {selectedJob.duration}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--white)', fontWeight: 700 }}>💰 {selectedJob.stipend}</div>
              </div>
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: selectedJob.color + '22', color: selectedJob.color, fontWeight: 600 }}>{selectedJob.type}</span>
                <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>{selectedJob.domain}</span>
                <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>Deadline: {selectedJob.deadline}</span>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>About the Role</h3>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {selectedJob.description}
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Requirements</h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>{req}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'rgba(245,166,35,0.05)', borderRadius: 12, padding: 16, border: '1px solid rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#000' }}>
                  {selectedJob.postedBy[0]}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Posted via Referral by</div>
                  <div style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 700 }}>{selectedJob.postedBy}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
              {applied[selectedJob.index] ? (
                <button style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: 'rgba(34,212,94,0.15)', color: 'var(--success)', fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <CheckCircle size={18} /> Application Sent
                </button>
              ) : (
                <button 
                  onClick={() => setApplyFormOpen(selectedJob)} 
                  style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${selectedJob.color}, ${selectedJob.color}cc)`, color: '#000', fontWeight: 800, fontSize: 16, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <ExternalLink size={18} /> Apply via Referral
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Detailed Application Form Modal ── */}
      {applyFormOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(10px)', padding: 20 }}>
          <div style={{ background: 'var(--navy-card)', borderRadius: 24, maxWidth: 550, width: '100%', boxShadow: `0 30px 80px rgba(0,0,0,0.5)`, position: 'relative', overflow: 'hidden', border: `1px solid ${applyFormOpen.color}44` }}>
            
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
              <button onClick={() => setApplyFormOpen(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                &times; Close
              </button>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 4px 0' }}>Apply for {applyFormOpen.title}</h2>
              <div style={{ fontSize: 14, color: applyFormOpen.color, fontWeight: 600 }}>{applyFormOpen.company} · Referral by {applyFormOpen.postedBy}</div>
            </div>

            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Resume Link (Google Drive / Notion)</label>
                <input 
                  value={applicationData.resume} 
                  onChange={e => setApplicationData(prev => ({ ...prev, resume: e.target.value }))}
                  placeholder="https://..." 
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Portfolio / GitHub / LinkedIn URL</label>
                <input 
                  value={applicationData.portfolio} 
                  onChange={e => setApplicationData(prev => ({ ...prev, portfolio: e.target.value }))}
                  placeholder="https://..." 
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Why are you a good fit for this role? (Cover Letter)</label>
                <textarea 
                  value={applicationData.coverLetter} 
                  onChange={e => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  placeholder={`Write a short note to ${applyFormOpen.postedBy.split(' ')[0]} explaining why they should refer you...`} 
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'var(--navy)', color: 'var(--text-primary)', fontSize: 14, outline: 'none', minHeight: 120, resize: 'vertical' }} 
                />
              </div>

              <button 
                onClick={() => {
                  if (!applicationData.resume) return alert('Please provide your resume link.');
                  setApplied(a => ({ ...a, [applyFormOpen.index]: true }));
                  setApplyFormOpen(null);
                  setSelectedJob(null);
                  setApplicationData({ resume: '', portfolio: '', coverLetter: '' }); // Reset
                }} 
                style={{ width: '100%', marginTop: 8, padding: '16px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${applyFormOpen.color}, ${applyFormOpen.color}cc)`, color: '#000', fontWeight: 800, fontSize: 16, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
