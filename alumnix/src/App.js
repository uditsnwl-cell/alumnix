import React, { useState } from 'react';
import './index.css';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import MentorMatching from './pages/MentorMatching';
import Profile from './pages/Profile';
import Opportunities from './pages/Opportunities';
import Chatbot from './pages/Chatbot';
import Societies from './pages/Societies';
import AMABoard from './pages/AMABoard';
import CommunityHub from './pages/CommunityHub';
import NotificationFeed from './pages/NotificationFeed';
import Sidebar from './components/Sidebar';

export default function App() {
  const [page, setPage] = useState('landing');
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  if (page === 'landing') {
    return <Landing onEnter={(r) => { setRole(r); setPage('auth'); }} />;
  }

  if (page === 'auth') {
    return (
      <Auth
        role={role}
        onAuth={(profile) => {
          setUser(profile);
          setPage(role === 'student' ? 'dashboard' : 'alumni-dashboard');
        }}
        onBack={() => { setPage('landing'); setRole(null); }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar page={page} setPage={setPage} role={role} user={user}
        onLogout={() => { setPage('landing'); setRole(null); setUser(null); }} />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--navy)' }}>
        {page === 'dashboard' && <StudentDashboard setPage={setPage} user={user} />}
        {page === 'alumni-dashboard' && <AlumniDashboard setPage={setPage} user={user} />}
        {page === 'mentors' && <MentorMatching />}
        {page === 'societies' && <Societies />}
        {page === 'profile' && <Profile role={role} user={user} setUser={setUser} />}
        {page === 'opportunities' && <Opportunities role={role} />}
        {page === 'chatbot' && <Chatbot />}
        {page === 'ama' && <AMABoard />}
        {page === 'communities' && <CommunityHub />}
        {page === 'notifications' && <NotificationFeed />}
      </main>
    </div>
  );
}