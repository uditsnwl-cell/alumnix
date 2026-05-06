import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchCommunities, joinCommunityWithForm, followCommunity, unfollowCommunity,
  removeMember, createCommunity, getCurrentUser, fetchCommunityMessages, sendCommunityMessage,
  approveMember, rejectMember
} from '../data/db';
import { Users, Plus, Search, Shield, TrendingUp, UserMinus, X, Check, Bell, BellOff, Globe, Sparkles, ChevronRight, MessageCircle, Send, ArrowLeft, Clock, UserCheck, UserX, Target, Award } from 'lucide-react';

const categoryColors = {
  tech:     { bg: '#ede9fe', text: '#6d28d9', bar: 'linear-gradient(90deg,#6d28d9,#4f46e5)' },
  startups: { bg: '#fce7f3', text: '#be185d', bar: 'linear-gradient(90deg,#be185d,#ec4899)' },
  career:   { bg: '#d1fae5', text: '#065f46', bar: 'linear-gradient(90deg,#059669,#10b981)' },
  sports:   { bg: '#fee2e2', text: '#991b1b', bar: 'linear-gradient(90deg,#dc2626,#ef4444)' },
  local:    { bg: '#fef3c7', text: '#92400e', bar: 'linear-gradient(90deg,#d97706,#f59e0b)' },
  arts:     { bg: '#fce7f3', text: '#9d174d', bar: 'linear-gradient(90deg,#db2777,#f472b6)' },
  study:    { bg: '#e0f2fe', text: '#0c4a6e', bar: 'linear-gradient(90deg,#0891b2,#38bdf8)' },
};

const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb',
  borderRadius: 10, fontSize: 14, outline: 'none', background: '#f9fafb',
  transition: 'border 0.2s', boxSizing: 'border-box', color: '#111827',
};

export default function CommunityHub() {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [joinTarget, setJoinTarget] = useState(null); // community to join
  const [selectedProfile, setSelectedProfile] = useState(null); // community profile view
  const [joinForm, setJoinForm] = useState({ name: '', idNo: '', college: '' });
  const [joinLoading, setJoinLoading] = useState(false);
  const [newComm, setNewComm] = useState({ name: '', description: '', category: 'tech' });
  const [user] = useState(getCurrentUser());
  const [toast, setToast] = useState(null);
  
  // Chat States
  const [activeChat, setActiveChat] = useState(null);
  const [inductionChatUser, setInductionChatUser] = useState(null); // The applicant user object if this is an induction chat
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');
  const messagesEndRef = useRef(null);

  const categories = ['all', 'tech', 'startups', 'career', 'sports', 'local', 'arts', 'study'];

  const load = useCallback(async () => {
    const data = await fetchCommunities();
    setCommunities(data);
    if (activeChat) {
      const msgs = await fetchCommunityMessages(activeChat.id, inductionChatUser?.id || null);
      setMessages(msgs);
    }
  }, [activeChat, inductionChatUser]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const h = () => load();
    window.addEventListener('alumnix_db_change', h);
    return () => window.removeEventListener('alumnix_db_change', h);
  }, [load]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeChat) scrollToBottom();
  }, [messages, activeChat]);

  const getRole = (c, uid) => c.members?.find(m => m.user_id === uid)?.role;
  const isMember   = (c) => { const r = getRole(c, user.id); return r && r !== 'pending'; };
  const isPending  = (c) => getRole(c, user.id) === 'pending';
  const isFollower = (c) => c.followers?.includes(user.id);
  const isLeader   = (c) => getRole(c, user.id) === 'leader';

  const openJoinForm = (e, comm) => {
    e.stopPropagation();
    if (selectedProfile) setSelectedProfile(null);
    setJoinTarget(comm);
    setJoinForm({ name: user.username || '', idNo: '', college: '' });
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (!joinForm.name.trim() || !joinForm.idNo.trim() || !joinForm.college.trim()) return;
    setJoinLoading(true);
    await joinCommunityWithForm(joinTarget.id, user.id, user.username, joinForm.name, joinForm.idNo, joinForm.college);
    setJoinLoading(false);
    const joinedComm = joinTarget;
    setJoinTarget(null);
    load();
    showToast(`Joined "${joinedComm.name}" successfully! 🎉`);
    
    // Automatically open induction chat upon successful application
    openChat(null, joinedComm, user);
  };

  const openChat = async (e, comm, applicantUser = null) => {
    if (e) e.stopPropagation();
    if (selectedProfile) setSelectedProfile(null);
    setActiveChat(comm);
    setInductionChatUser(applicantUser);
    const msgs = await fetchCommunityMessages(comm.id, applicantUser?.id || null);
    setMessages(msgs);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!msgInput.trim() || !activeChat) return;
    await sendCommunityMessage(activeChat.id, user.id, user.username || 'User', msgInput, inductionChatUser?.id || null);
    setMsgInput('');
    const msgs = await fetchCommunityMessages(activeChat.id, inductionChatUser?.id || null);
    setMessages(msgs);
  };

  const handleFollow = async (e, comm) => {
    e.stopPropagation();
    if (isFollower(comm)) {
      await unfollowCommunity(comm.id, user.id);
      showToast(`Unfollowed "${comm.name}"`, 'info');
    } else {
      await followCommunity(comm.id, user.id);
      showToast(`Following "${comm.name}" 🔔`);
    }
    load();
    if (selectedProfile && selectedProfile.id === comm.id) {
      // Reload profile data if it is currently open
      const updated = await fetchCommunities();
      setSelectedProfile(updated.find(c => c.id === comm.id));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newComm.name.trim()) return;
    await createCommunity(newComm.name, newComm.description, newComm.category, user.id, user.username);
    setNewComm({ name: '', description: '', category: 'tech' });
    setShowCreate(false);
    load();
    showToast('Community created! You are the leader 🏆');
  };

  const handleApprove = async (commId, applicantId) => {
    await approveMember(commId, applicantId);
    showToast('Applicant approved!');
    setActiveChat(null);
    setInductionChatUser(null);
    load();
  };

  const handleReject = async (commId, applicantId) => {
    if (window.confirm('Reject this application?')) {
      await rejectMember(commId, applicantId);
      showToast('Applicant rejected', 'info');
      setActiveChat(null);
      setInductionChatUser(null);
      load();
    }
  };

  const handleRemoveMember = async (e, commId, userId) => {
    e.stopPropagation();
    if (window.confirm('Remove this member?')) {
      await removeMember(commId, userId);
      load();
    }
  };

  const filtered = communities.filter(c =>
    (category === 'all' || c.category === category) &&
    (search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '28px 20px', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 9999,
          background: toast.type === 'success' ? '#111827' : '#1e40af',
          color: '#fff', padding: '12px 20px', borderRadius: 12,
          fontSize: 14, fontWeight: 500, boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          animation: 'slideIn 0.3s ease',
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} color="#fff" strokeWidth={2.2} />
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: 0 }}>Communities</h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>Discover groups, follow topics, and connect with peers</p>
        </div>
        <button onClick={() => setShowCreate(true)} style={{
          background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none',
          padding: '10px 22px', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
          transition: 'transform 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Plus size={18} /> Create Community
        </button>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search size={17} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities…"
            style={{ ...inputStyle, paddingLeft: 42, background: '#fff', border: '1.5px solid #e5e7eb' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.18s',
              background: category === c ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : '#f3f4f6',
              color: category === c ? '#fff' : '#4b5563',
              boxShadow: category === c ? '0 2px 8px rgba(79,70,229,0.3)' : 'none',
            }}>{c === 'all' ? '🌐 All' : c.charAt(0).toUpperCase() + c.slice(1)}</button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Communities', value: communities.length, icon: '🏘️' },
          { label: 'You\'ve Joined', value: communities.filter(isMember).length, icon: '✅' },
          { label: 'Following', value: communities.filter(isFollower).length, icon: '🔔' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, minWidth: 140, background: '#fff', border: '1px solid #f3f4f6', borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 18 }}>
        {filtered.map(comm => {
          const member   = isMember(comm);
          const pending  = isPending(comm);
          const leader   = isLeader(comm);
          const follower = isFollower(comm);
          const col      = categoryColors[comm.category] || categoryColors.study;
          const role     = getRole(comm, user.id);
          const applicants = comm.members?.filter(m => m.role === 'pending') || [];

          return (
            <div key={comm.id} onClick={() => setSelectedProfile(comm)} style={{
              background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              border: '1px solid #f0f0f5', overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s',
              display: 'flex', flexDirection: 'column', cursor: 'pointer'
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,70,229,0.13)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Gradient bar */}
              <div style={{ height: 5, background: col.bar }} />

              <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Title row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#111827' }}>{comm.name}</h3>
                      {leader && (
                        <span style={{ fontSize: 10, fontWeight: 700, background: '#fef3c7', color: '#92400e', padding: '2px 7px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Shield size={9} /> Leader
                        </span>
                      )}
                      {role === 'moderator' && (
                        <span style={{ fontSize: 10, fontWeight: 700, background: '#dbeafe', color: '#1e40af', padding: '2px 7px', borderRadius: 20 }}>Mod</span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, background: col.bg, color: col.text, padding: '2px 9px', borderRadius: 20 }}>
                      {comm.category?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.55, marginBottom: 12, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {comm.description}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 14, marginBottom: 14, fontSize: 12, color: '#9ca3af' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {comm.member_count} members</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={12} /> {comm.posts_count} posts</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Bell size={12} /> {comm.followers?.length || 0} following</span>
                </div>

                {/* Member avatars */}
                {comm.members?.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
                    {comm.members.slice(0, 5).map((m, i) => (
                      <div key={i} title={m.username} style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: m.role === 'leader' ? 'linear-gradient(135deg,#f59e0b,#d97706)' : m.role === 'moderator' ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 10, fontWeight: 700,
                        border: '2px solid #fff', marginLeft: i > 0 ? -8 : 0,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                      }}>{(m.username || '?')[0].toUpperCase()}</div>
                    ))}
                    {comm.members.length > 5 && (
                      <span style={{ marginLeft: 6, fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>+{comm.members.length - 5} more</span>
                    )}
                  </div>
                )}

                {/* Leader Applicants View */}
                {leader && applicants.length > 0 && (
                  <div style={{ marginBottom: 14, padding: '10px 12px', background: '#fef3c7', borderRadius: 10, border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={14} /> {applicants.length} Pending Applications
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {applicants.map(app => (
                        <div key={app.user_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                          <span style={{ fontWeight: 600, color: '#b45309' }}>{app.name}</span>
                          <button onClick={(e) => openChat(e, comm, { id: app.user_id, username: app.name })} style={{
                            background: '#d97706', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 6,
                            fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
                          }}>
                            Interview
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 'auto' }}>
                  {member ? (
                    <button onClick={(e) => openChat(e, comm)} style={{
                      flex: 1, background: '#10b981', color: '#fff', border: 'none',
                      padding: '8px 0', borderRadius: 9, cursor: 'pointer',
                      fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      boxShadow: '0 3px 10px rgba(16,185,129,0.25)', transition: 'opacity 0.2s',
                    }}>
                      <MessageCircle size={15} /> Open Chat
                    </button>
                  ) : pending ? (
                    <button onClick={(e) => openChat(e, comm, user)} style={{
                      flex: 1, background: '#f59e0b', color: '#fff', border: 'none',
                      padding: '8px 0', borderRadius: 9, cursor: 'pointer',
                      fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      boxShadow: '0 3px 10px rgba(245,158,11,0.25)'
                    }}>
                      <Clock size={15} /> In Induction
                    </button>
                  ) : (
                    <button onClick={(e) => openJoinForm(e, comm)} style={{
                      flex: 1, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff',
                      border: 'none', padding: '8px 0', borderRadius: 9, cursor: 'pointer',
                      fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      boxShadow: '0 3px 10px rgba(79,70,229,0.3)', transition: 'opacity 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <ChevronRight size={15} /> Apply to Join
                    </button>
                  )}

                  <button onClick={(e) => handleFollow(e, comm)} title={follower ? 'Unfollow' : 'Follow'} style={{
                    padding: '7px 12px', borderRadius: 9, border: '1.5px solid',
                    borderColor: follower ? '#6d28d9' : '#d1d5db',
                    background: follower ? '#ede9fe' : '#f9fafb',
                    color: follower ? '#6d28d9' : '#9ca3af',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 12, fontWeight: 600, transition: 'all 0.18s',
                  }}>
                    {follower ? <Bell size={14} /> : <BellOff size={14} />}
                    {follower ? 'Following' : 'Follow'}
                  </button>

                  {leader && comm.members?.filter(m => m.user_id !== user.id).length > 0 && (
                    <button onClick={(e) => {
                      const other = comm.members.find(m => m.user_id !== user.id);
                      if (other) handleRemoveMember(e, comm.id, other.user_id);
                    }} style={{
                      padding: '7px 10px', borderRadius: 9, border: '1.5px solid #fca5a5',
                      background: '#fff', color: '#dc2626', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 4, fontSize: 12,
                    }} title="Remove member">
                      <UserMinus size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '70px 0', color: '#9ca3af' }}>
          <Globe size={52} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No communities found</p>
          <p style={{ fontSize: 13 }}>Try a different search or create a new one</p>
        </div>
      )}

      {/* ── AlumniX-Themed Chat Interface ── */}
      {activeChat && (
        <div style={{ position: 'fixed', inset: 0, background: '#f9fafb', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, color: '#fff', boxShadow: '0 4px 20px rgba(79,70,229,0.2)', zIndex: 10 }}>
            <button onClick={() => { setActiveChat(null); setInductionChatUser(null); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '50%', transition: 'background 0.2s' }}>
              <ArrowLeft size={20} />
            </button>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontWeight: 800, fontSize: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              {activeChat.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 2px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                {activeChat.name}
                {inductionChatUser && <span style={{ fontSize: 10, background: '#f59e0b', color: '#fff', padding: '2px 8px', borderRadius: 12 }}>Induction Chat</span>}
              </h2>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                {inductionChatUser ? `Interviewing ${inductionChatUser.username}` : activeChat.members?.map(m => m.username).join(', ')}
              </div>
            </div>

            {/* Leader Approval Controls in Induction Chat */}
            {isLeader(activeChat) && inductionChatUser && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleApprove(activeChat.id, inductionChatUser.id)} style={{
                  background: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8,
                  fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 2px 8px rgba(16,185,129,0.3)'
                }}><UserCheck size={14} /> Approve</button>
                <button onClick={() => handleReject(activeChat.id, inductionChatUser.id)} style={{
                  background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8,
                  fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 2px 8px rgba(239,68,68,0.3)'
                }}><UserX size={14} /> Reject</button>
              </div>
            )}
          </div>

          {/* Chat Messages Area */}
          <div style={{ flex: 1, padding: '24px 5%', overflowY: 'auto', background: '#f5f7ff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 900, margin: '0 auto' }}>
              
              {/* Central Date Badge */}
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <span style={{ background: '#fff', color: '#6b7280', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  Today
                </span>
              </div>

              {messages.map((msg) => {
                const isMine = msg.user_id === user.id;
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      background: isMine ? 'linear-gradient(135deg, #4f46e5, #6d28d9)' : '#fff',
                      color: isMine ? '#fff' : '#111827',
                      padding: '12px 16px 16px', borderRadius: 16, 
                      borderBottomRightRadius: isMine ? 4 : 16, borderBottomLeftRadius: isMine ? 16 : 4,
                      maxWidth: '75%', minWidth: 140, position: 'relative', 
                      boxShadow: isMine ? '0 4px 15px rgba(79,70,229,0.2)' : '0 2px 10px rgba(0,0,0,0.04)',
                      border: isMine ? 'none' : '1px solid #e5e7eb'
                    }}>
                      {!isMine && (
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#4f46e5', marginBottom: 6 }}>
                          {msg.username}
                        </div>
                      )}
                      <div style={{ fontSize: 14, lineHeight: 1.5, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 10, color: isMine ? 'rgba(255,255,255,0.7)' : '#9ca3af', textAlign: 'right', marginTop: 6, position: 'absolute', bottom: 6, right: 10 }}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input Bar */}
          <div style={{ background: '#fff', padding: '16px 20px', borderTop: '1px solid #e5e7eb' }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', maxWidth: 900, margin: '0 auto', gap: 12 }}>
              <input 
                value={msgInput} 
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Type your message..." 
                style={{ flex: 1, padding: '14px 20px', borderRadius: 14, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', background: '#f9fafb', transition: 'border 0.2s' }}
                onFocus={e => e.target.style.border = '1.5px solid #6d28d9'}
                onBlur={e => e.target.style.border = '1.5px solid #e5e7eb'}
              />
              <button type="submit" disabled={!msgInput.trim()} style={{
                background: msgInput.trim() ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#e5e7eb', 
                color: msgInput.trim() ? '#fff' : '#9ca3af', border: 'none',
                width: 50, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: msgInput.trim() ? 'pointer' : 'default', transition: 'all 0.2s', 
                boxShadow: msgInput.trim() ? '0 4px 14px rgba(79,70,229,0.3)' : 'none'
              }}>
                <Send size={20} style={{ marginLeft: 2 }} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Community Profile Modal ── */}
      {selectedProfile && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, backdropFilter: 'blur(5px)', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: 24, maxWidth: 640, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            
            {/* Close Button */}
            <button onClick={() => setSelectedProfile(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', borderRadius: '50%', padding: 8, color: '#fff', zIndex: 10, backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>

            {/* Profile Header (Banner) */}
            {(() => {
              const col = categoryColors[selectedProfile.category] || categoryColors.study;
              return (
                <div style={{ background: col.bar, padding: '40px 30px 30px', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
                    <div style={{ width: 80, height: 80, borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: col.text, fontSize: 32, fontWeight: 800, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                      {selectedProfile.name.charAt(0)}
                    </div>
                    <div style={{ color: '#fff' }}>
                      <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'inline-block' }}>
                        {selectedProfile.category}
                      </span>
                      <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{selectedProfile.name}</h2>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Profile Content */}
            <div style={{ padding: '30px', flex: 1 }}>
              
              {/* Stats Row */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 30, paddingBottom: 24, borderBottom: '1px solid #f3f4f6' }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>{selectedProfile.member_count}</div>
                  <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Members</div>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>{selectedProfile.posts_count}</div>
                  <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Posts</div>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>{selectedProfile.followers?.length || 0}</div>
                  <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Followers</div>
                </div>
              </div>

              {/* Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                
                {/* About */}
                <section>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Globe size={18} color="#6d28d9" /> About this Community
                  </h3>
                  <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {selectedProfile.description}
                  </p>
                </section>

                {/* Mission */}
                {selectedProfile.mission && (
                  <section style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: 12, borderLeft: '4px solid #4f46e5' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Target size={18} color="#4f46e5" /> Why it was made
                    </h3>
                    <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                      "{selectedProfile.mission}"
                    </p>
                  </section>
                )}

                {/* Achievements */}
                {selectedProfile.achievements && selectedProfile.achievements.length > 0 && (
                  <section>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Award size={18} color="#f59e0b" /> Achievements & Milestones
                    </h3>
                    <ul style={{ paddingLeft: 20, margin: 0, color: '#4b5563', fontSize: 14, lineHeight: 1.7 }}>
                      {selectedProfile.achievements.map((ach, idx) => (
                        <li key={idx} style={{ marginBottom: 4 }}>{ach}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Leadership (Who made it) */}
                <section>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Shield size={18} color="#10b981" /> Community Leadership
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                    {selectedProfile.members?.filter(m => m.role === 'leader' || m.role === 'moderator').map(m => (
                      <div key={m.user_id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '1px solid #e5e7eb', padding: '10px 14px', borderRadius: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: m.role === 'leader' ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'linear-gradient(135deg,#3b82f6,#2563eb)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
                          {m.username.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{m.username}</div>
                          <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{m.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Fixed Bottom Action Bar */}
            <div style={{ padding: '20px 30px', background: '#fff', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 12, borderRadius: '0 0 24px 24px' }}>
              {(() => {
                const member = isMember(selectedProfile);
                const pending = isPending(selectedProfile);
                const follower = isFollower(selectedProfile);

                return (
                  <>
                    {member ? (
                      <button onClick={(e) => openChat(e, selectedProfile)} style={{ flex: 1, background: '#10b981', color: '#fff', border: 'none', padding: '12px 0', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
                        <MessageCircle size={18} /> Open Chat
                      </button>
                    ) : pending ? (
                      <button onClick={(e) => openChat(e, selectedProfile, user)} style={{ flex: 1, background: '#f59e0b', color: '#fff', border: 'none', padding: '12px 0', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(245,158,11,0.3)' }}>
                        <Clock size={18} /> In Induction
                      </button>
                    ) : (
                      <button onClick={(e) => openJoinForm(e, selectedProfile)} style={{ flex: 1, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none', padding: '12px 0', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(79,70,229,0.35)' }}>
                        <Sparkles size={18} /> Apply to Join
                      </button>
                    )}
                    <button onClick={(e) => handleFollow(e, selectedProfile)} style={{ padding: '0 24px', borderRadius: 12, border: '2px solid', borderColor: follower ? '#6d28d9' : '#e5e7eb', background: follower ? '#ede9fe' : '#fff', color: follower ? '#6d28d9' : '#6b7280', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
                      {follower ? <Bell size={18} /> : <BellOff size={18} />}
                      {follower ? 'Following' : 'Follow'}
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ── Join Form Modal ── */}
      {joinTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 32, maxWidth: 460, width: '92%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', position: 'relative' }}>
            {/* Top bar */}
            <div style={{ height: 5, background: (categoryColors[joinTarget.category] || categoryColors.study).bar, borderRadius: '14px 14px 0 0', position: 'absolute', top: 0, left: 0, right: 0 }} />

            <button onClick={() => setJoinTarget(null)} style={{ position: 'absolute', top: 18, right: 18, background: '#f3f4f6', border: 'none', cursor: 'pointer', borderRadius: 8, padding: '4px 8px', color: '#6b7280' }}><X size={18} /></button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Sparkles size={20} color="#6d28d9" />
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: 0 }}>Apply to Join</h2>
            </div>
            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>
              You are applying to join <strong style={{ color: '#4f46e5' }}>{joinTarget.name}</strong>.<br/>
              After submitting, you'll be placed in a private induction chat with the leaders for approval.
            </p>

            <form onSubmit={handleJoinSubmit}>
              {[
                { label: 'Full Name *', key: 'name', placeholder: 'e.g. Rahul Sharma', type: 'text' },
                { label: 'Student / Employee ID *', key: 'idNo', placeholder: 'e.g. 2100CS042', type: 'text' },
                { label: 'College / Institution *', key: 'college', placeholder: 'e.g. IET Bareilly', type: 'text' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={joinForm[f.key]}
                    onChange={e => setJoinForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.border = '1.5px solid #6d28d9'}
                    onBlur={e => e.target.style.border = '1.5px solid #e5e7eb'}
                  />
                </div>
              ))}

              <button type="submit" disabled={joinLoading} style={{
                width: '100%', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff',
                border: 'none', padding: '12px', borderRadius: 10, cursor: 'pointer',
                fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 14px rgba(79,70,229,0.35)', marginTop: 4, opacity: joinLoading ? 0.7 : 1,
              }}>
                <Check size={17} /> {joinLoading ? 'Joining…' : 'Confirm & Join'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Create Community Modal ── */}
      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 32, maxWidth: 500, width: '92%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', position: 'relative' }}>
            <div style={{ height: 5, background: 'linear-gradient(90deg,#4f46e5,#7c3aed)', borderRadius: '14px 14px 0 0', position: 'absolute', top: 0, left: 0, right: 0 }} />
            <button onClick={() => setShowCreate(false)} style={{ position: 'absolute', top: 18, right: 18, background: '#f3f4f6', border: 'none', cursor: 'pointer', borderRadius: 8, padding: '4px 8px', color: '#6b7280' }}><X size={18} /></button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Plus size={20} color="#6d28d9" />
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: 0 }}>Create Community</h2>
            </div>
            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 24 }}>You'll automatically become the leader of this community.</p>

            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Community Name *</label>
                <input value={newComm.name} onChange={e => setNewComm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. IET Photography Club" required style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6d28d9'}
                  onBlur={e => e.target.style.border = '1.5px solid #e5e7eb'} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Description *</label>
                <textarea value={newComm.description} onChange={e => setNewComm(p => ({ ...p, description: e.target.value }))} placeholder="What is this community about?" required
                  style={{ ...inputStyle, height: 86, resize: 'none' }}
                  onFocus={e => e.target.style.border = '1.5px solid #6d28d9'}
                  onBlur={e => e.target.style.border = '1.5px solid #e5e7eb'} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Category</label>
                <select value={newComm.category} onChange={e => setNewComm(p => ({ ...p, category: e.target.value }))}
                  style={{ ...inputStyle }}>
                  {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <button type="submit" style={{
                width: '100%', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff',
                border: 'none', padding: '12px', borderRadius: 10, cursor: 'pointer',
                fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
              }}>
                <Sparkles size={16} /> Create Community
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}