import { useState, useEffect, useCallback } from 'react';
import { fetchNotifications, markNotificationRead, markAllNotificationsRead, getCurrentUser } from '../data/db';
import { Bell, CheckCheck, MessageCircle, UserPlus, Heart, Star, Users, Award } from 'lucide-react';

export default function NotificationFeed() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(getCurrentUser());

  const load = useCallback(async () => {
    const data = await fetchNotifications();
    setNotifications(data);
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const h = () => load();
    window.addEventListener('alumnix_db_change', h);
    return () => window.removeEventListener('alumnix_db_change', h);
  }, [load]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleRead = async (id) => {
    await markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const handleReadAll = async () => {
    await markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'new_ama_question': return <MessageCircle size={16} style={{ color: '#2563eb' }} />;
      case 'community_join': return <UserPlus size={16} style={{ color: '#059669' }} />;
      case 'answer_liked': return <Heart size={16} style={{ color: '#dc2626' }} />;
      case 'achievement': return <Award size={16} style={{ color: '#d97706' }} />;
      default: return <Bell size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const timeAgo = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const filtered = filter === 'unread' ? notifications.filter(n => !n.is_read) : notifications;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={28} /> Notifications
          {unreadCount > 0 && (
            <span style={{ fontSize: 13, background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>
              {unreadCount} new
            </span>
          )}
        </h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setFilter('all')} style={{
            padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
            background: filter === 'all' ? '#2563eb' : '#f3f4f6', color: filter === 'all' ? '#fff' : '#374151'
          }}>All</button>
          <button onClick={() => setFilter('unread')} style={{
            padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
            background: filter === 'unread' ? '#2563eb' : '#f3f4f6', color: filter === 'unread' ? '#fff' : '#374151'
          }}>Unread</button>
          {unreadCount > 0 && (
            <button onClick={handleReadAll} style={{
              background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              color: '#2563eb', fontSize: 13, fontWeight: 500
            }}><CheckCheck size={16} /> Mark all read</button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map(n => (
          <div key={n.id} onClick={() => handleRead(n.id)} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, borderRadius: 10,
            cursor: 'pointer', background: n.is_read ? '#fff' : '#eff6ff',
            border: `1px solid ${n.is_read ? '#f3f4f6' : '#bfdbfe'}`
          }}>
            <div style={{ marginTop: 2 }}>{getIcon(n.type)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <p style={{ fontSize: 14, fontWeight: n.is_read ? 400 : 600, color: '#1f2937' }}>{n.title}</p>
                <span style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap' }}>{timeAgo(n.created_at)}</span>
              </div>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{n.message}</p>
            </div>
            {!n.is_read && (
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb', marginTop: 6, flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>
          <Bell size={48} style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: 16, fontWeight: 500 }}>{filter === 'unread' ? 'All caught up!' : 'No notifications yet'}</p>
        </div>
      )}
    </div>
  );
}