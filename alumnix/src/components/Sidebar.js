import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Briefcase, User, MessageSquare, LogOut, ChevronLeft, ChevronRight, Zap, Award, MessageCircle, Bell, Globe } from 'lucide-react';
import { fetchNotifications } from '../data/db';

const studentNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ama', label: 'Alumni AMA', icon: MessageCircle },
  { id: 'communities', label: 'Communities', icon: Globe },
  { id: 'mentors', label: 'Find Mentors', icon: Users },
  { id: 'societies', label: 'Societies', icon: Award },
  { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
  { id: 'chatbot', label: 'AI Advisor', icon: MessageSquare },
  { id: 'profile', label: 'My Profile', icon: User },
];

const alumniNav = [
  { id: 'alumni-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ama', label: 'Alumni AMA', icon: MessageCircle },
  { id: 'communities', label: 'Communities', icon: Globe },
  { id: 'opportunities', label: 'Post Jobs', icon: Briefcase },
  { id: 'mentors', label: 'Students', icon: Users },
  { id: 'societies', label: 'Societies', icon: Award },
  { id: 'chatbot', label: 'AI Advisor', icon: MessageSquare },
  { id: 'profile', label: 'My Profile', icon: User },
];

export default function Sidebar({ page, setPage, role, user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const nav = role === 'alumni' ? alumniNav : studentNav;

  useEffect(() => {
    fetchNotifications().then(n => setNotifCount(n.filter(x => !x.is_read).length));
    const handler = () => { fetchNotifications().then(n => setNotifCount(n.filter(x => !x.is_read).length)); };
    window.addEventListener('alumnix_db_change', handler);
    return () => window.removeEventListener('alumnix_db_change', handler);
  }, []);

  return (
    <aside style={{
      width: collapsed ? 72 : 240,
      background: 'var(--navy-2)',
      borderRight: '1px solid rgba(245,166,35,0.1)',
      display: 'flex', flexDirection: 'column', padding: '24px 0',
      transition: 'width 0.3s ease',
      position: 'sticky', top: 0, height: '100vh', flexShrink: 0, zIndex: 10,
    }}>
      <div style={{ padding: '0 20px 32px', display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--gold), #e8880a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          boxShadow: '0 4px 15px rgba(245,166,35,0.4)',
        }}>
          <Zap size={18} color="#07091a" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--white)', whiteSpace: 'nowrap' }}>
            Alumni<span style={{ color: 'var(--gold)' }}>X</span>
          </span>
        )}
      </div>

      {!collapsed && (
        <div style={{ margin: '0 16px 12px', padding: '8px 12px', background: 'var(--gold-dim)', borderRadius: 8, border: '1px solid var(--gold-border)' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: 1 }}>
            {role === 'alumni' ? '🎓 Alumni' : '📚 Student'}
          </span>
        </div>
      )}

      {!collapsed && user && (
        <div style={{ margin: '0 16px 20px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
        </div>
      )}

      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {nav.map(({ id, label, icon: Icon }) => {
          const active = page === id;
          const isNotif = id === 'notifications';
          return (
            <button key={id} onClick={() => setPage(id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: collapsed ? '12px 0' : '12px 14px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 12, border: 'none',
              background: active ? 'linear-gradient(135deg, rgba(245,166,35,0.2), rgba(245,166,35,0.08))' : 'transparent',
              color: active ? 'var(--gold)' : 'var(--text-secondary)',
              fontWeight: active ? 600 : 400, fontSize: 14,
              transition: 'all 0.2s', whiteSpace: 'nowrap',
              borderLeft: active ? '3px solid var(--gold)' : '3px solid transparent',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = active ? 'var(--gold)' : 'var(--text-secondary)'; }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                {isNotif && notifCount > 0 && (
                  <span style={{
                    position: 'absolute', top: -6, right: -8,
                    background: '#dc2626', color: '#fff',
                    fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                  }}>{notifCount}</span>
                )}
              </div>
              {!collapsed && label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button onClick={() => setPage('notifications')} style={{
          display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 12, padding: '10px 14px', borderRadius: 10, border: 'none',
          background: page === 'notifications' ? 'rgba(255,255,255,0.08)' : 'transparent',
          color: page === 'notifications' ? 'var(--white)' : 'var(--text-muted)', fontSize: 13, position: 'relative',
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Bell size={16} />
            {notifCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -8,
                background: '#dc2626', color: '#fff',
                fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
              }}>{notifCount}</span>
            )}
          </div>
          {!collapsed && 'Notifications'}
        </button>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 12, padding: '10px 14px', borderRadius: 10, border: 'none',
          background: 'transparent', color: 'var(--text-muted)', fontSize: 13,
        }}>
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} />{' Collapse'}</>}
        </button>
        <button onClick={onLogout} style={{
          display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 12, padding: '10px 14px', borderRadius: 10, border: 'none',
          background: 'transparent', color: 'var(--danger)', fontSize: 13, fontWeight: 500,
        }}>
          <LogOut size={16} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}