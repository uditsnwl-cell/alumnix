import { useState, useEffect, useCallback } from 'react';
import { fetchCommunities, joinCommunity, removeMember, createCommunity, getCurrentUser } from '../data/db';
import { Users, Plus, Search, Shield, TrendingUp, UserMinus, X, Check } from 'lucide-react';

export default function CommunityHub() {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newComm, setNewComm] = useState({ name: '', description: '', category: 'tech' });
  const [user, setUser] = useState(getCurrentUser());

  const categories = ['all', 'tech', 'startups', 'career', 'sports', 'local', 'arts', 'study'];

  const load = useCallback(async () => {
    const data = await fetchCommunities();
    setCommunities(data);
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const h = () => load();
    window.addEventListener('alumnix_db_change', h);
    window.addEventListener('alumnix_user_switch', () => setUser(getCurrentUser()));
    return () => { window.removeEventListener('alumnix_db_change', h); window.removeEventListener('alumnix_user_switch', () => setUser(getCurrentUser())); };
  }, [load]);

  const isMember = (comm) => comm.members?.some(m => m.user_id === user.id);
  const getRole = (comm) => comm.members?.find(m => m.user_id === user.id)?.role;
  const isLeader = (comm) => getRole(comm) === 'leader';

  const handleJoin = async (commId) => {
    await joinCommunity(commId, user.id, user.username);
    load();
  };

  const handleRemove = async (commId, userId) => {
    if (confirm('Remove this member?')) {
      await removeMember(commId, userId);
      load();
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newComm.name.trim()) return;
    await createCommunity(newComm.name, newComm.description, newComm.category, user.id, user.username);
    setNewComm({ name: '', description: '', category: 'tech' });
    setShowCreate(false);
    load();
  };

  const filtered = communities.filter(c =>
    (category === 'all' || c.category === category) &&
    (search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase()))
  );

  const categoryColors = {
    tech: '#2563eb', startups: '#7c3aed', career: '#059669',
    sports: '#dc2626', local: '#d97706', arts: '#db2777', study: '#0891b2'
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={28} /> Communities
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Join groups, attend events, connect with peers</p>
        </div>
        <button onClick={() => setShowCreate(true)} style={{
          background: '#2563eb', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 8,
          cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6
        }}>
          <Plus size={18} /> Create Community
        </button>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities..."
            style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
              background: category === c ? '#2563eb' : '#f3f4f6', color: category === c ? '#fff' : '#374151'
            }}>{c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(comm => {
          const member = isMember(comm);
          const role = getRole(comm);
          const leader = isLeader(comm);
          const color = categoryColors[comm.category] || '#6b7280';

          return (
            <div key={comm.id} style={{
              background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb', overflow: 'hidden', transition: 'box-shadow 0.2s'
            }}>
              {/* Color bar */}
              <div style={{ height: 4, background: color }} />

              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{comm.name}</h3>
                    <span style={{ fontSize: 12, color, fontWeight: 600, textTransform: 'uppercase' }}>{comm.category}</span>
                  </div>
                  {leader && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: 12 }}>
                      <Shield size={11} /> Leader
                    </span>
                  )}
                  {role === 'moderator' && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, background: '#dbeafe', color: '#1e40af', padding: '3px 8px', borderRadius: 12 }}>
                      Moderator
                    </span>
                  )}
                </div>

                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {comm.description}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 13, color: '#6b7280' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} /> {comm.member_count} members</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={14} /> {comm.posts_count} posts</span>
                </div>

                {/* Members preview */}
                {comm.members?.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: -4, marginBottom: 12 }}>
                    {comm.members.slice(0, 4).map((m, i) => (
                      <div key={i} title={m.username} style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: m.role === 'leader' ? '#f59e0b' : m.role === 'moderator' ? '#2563eb' : '#6b7280',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 600,
                        border: '2px solid #fff', marginLeft: i > 0 ? -6 : 0
                      }}>{m.username?.[0]}</div>
                    ))}
                    {comm.members.length > 4 && (
                      <span style={{ marginLeft: 4, fontSize: 11, color: '#9ca3af' }}>+{comm.members.length - 4} more</span>
                    )}
                  </div>
                )}

                {/* Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {member ? (
                    <span style={{ color: '#16a34a', fontWeight: 600, fontSize: 14 }}>✓ Joined</span>
                  ) : (
                    <button onClick={() => handleJoin(comm.id)} style={{
                      background: '#2563eb', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 6,
                      cursor: 'pointer', fontSize: 13, fontWeight: 600
                    }}>Join Community</button>
                  )}

                  {/* Leader controls */}
                  {leader && comm.members?.filter(m => m.user_id !== user.id).length > 0 && (
                    <button onClick={() => {
                      const other = comm.members.find(m => m.user_id !== user.id);
                      if (other) handleRemove(comm.id, other.user_id);
                    }} style={{
                      background: 'none', border: '1px solid #fca5a5', color: '#dc2626', padding: '4px 10px', borderRadius: 6,
                      cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4
                    }} title="Remove last joined member">
                      <UserMinus size={13} /> Remove Member
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>
          <Users size={48} style={{ margin: '0 auto 12px' }} />
          <p>No communities found</p>
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, maxWidth: 480, width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Create Community</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Community Name *</label>
                <input value={newComm.name} onChange={e => setNewComm(p => ({ ...p, name: e.target.value }))}
                  style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Description *</label>
                <textarea value={newComm.description} onChange={e => setNewComm(p => ({ ...p, description: e.target.value }))}
                  style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, height: 80, resize: 'none' }} required />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Category</label>
                <select value={newComm.category} onChange={e => setNewComm(p => ({ ...p, category: e.target.value }))}
                  style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }}>
                  {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <button type="submit" style={{
                width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: 8,
                cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}>
                <Check size={16} /> Create Community
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}