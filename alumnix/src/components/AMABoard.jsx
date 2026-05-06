import { useState, useEffect, useCallback } from 'react';
import { fetchQuestions, submitQuestion, submitAnswer, likeQuestion, getCurrentUser } from '../data/db';
import { MessageCircle, ThumbsUp, Send, Clock, Tag, ChevronDown, ChevronUp, User, Shield } from 'lucide-react';

export default function AMABoard() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState('all');
  const [expandedQ, setExpandedQ] = useState(null);
  const [answerForms, setAnswerForms] = useState({});
  const [user, setUser] = useState(getCurrentUser());

  // Listen for data changes
  useEffect(() => {
    const handler = () => loadQuestions();
    window.addEventListener('alumnix_db_change', handler);
    window.addEventListener('alumnix_user_switch', () => setUser(getCurrentUser()));
    return () => {
      window.removeEventListener('alumnix_db_change', handler);
      window.removeEventListener('alumnix_user_switch', () => setUser(getCurrentUser()));
    };
  }, [selectedTag]);

  const loadQuestions = useCallback(async () => {
    const data = await fetchQuestions(selectedTag);
    setQuestions(data);
  }, [selectedTag]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setLoading(true);
    await submitQuestion(newQuestion, user.id, user.username);
    setNewQuestion('');
    setLoading(false);
    loadQuestions();
  };

  const handleAnswer = async (qId) => {
    const text = answerForms[qId];
    if (!text?.trim()) return;
    await submitAnswer(qId, text, user.id, user.username, {
      company: user.company,
      designation: user.designation
    });
    setAnswerForms(prev => ({ ...prev, [qId]: '' }));
    loadQuestions();
  };

  const handleLike = async (qId) => {
    await likeQuestion(qId);
    loadQuestions();
  };

  const timeAgo = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const tags = ['all', 'career', 'interview', 'technical', 'company', 'startups'];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageCircle size={28} /> Alumni AMA
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>
            Ask alumni anything — careers, interviews, companies, life
          </p>
        </div>
        <div style={{
          fontSize: 12, padding: '6px 12px', borderRadius: 20,
          background: user.role === 'alumni' ? '#fef3c7' : '#dbeafe',
          color: user.role === 'alumni' ? '#92400e' : '#1e40af',
          fontWeight: 600
        }}>
          {user.role === 'alumni' ? '🎓 Alumni Mode — You can answer' : '👨‍🎓 Student Mode — You can ask'}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {tags.map(t => (
          <button key={t} onClick={() => setSelectedTag(t)} style={{
            padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
            background: selectedTag === t ? '#2563eb' : '#f3f4f6',
            color: selectedTag === t ? '#fff' : '#374151'
          }}>{t === 'all' ? 'All Topics' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      {/* Ask Question Form — only for students */}
      {user.role === 'student' && (
        <form onSubmit={handleSubmit} style={{
          background: '#fff', borderRadius: 12, padding: 16, marginBottom: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb'
        }}>
          <textarea value={newQuestion} onChange={e => setNewQuestion(e.target.value)}
            placeholder="Ask alumni anything about careers, companies, interviews, life after college..."
            style={{ width: '100%', padding: 12, border: '1px solid #d1d5db', borderRadius: 8, resize: 'none', height: 80, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="submit" disabled={loading || !newQuestion.trim()} style={{
              background: loading || !newQuestion.trim() ? '#93c5fd' : '#2563eb', color: '#fff',
              border: 'none', padding: '8px 20px', borderRadius: 8, cursor: 'pointer',
              fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Send size={16} /> {loading ? 'Posting...' : 'Ask Question'}
            </button>
          </div>
        </form>
      )}

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {questions.map(q => (
          <div key={q.id} style={{
            background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb', overflow: 'hidden'
          }}>
            {/* Question Header */}
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: q.is_anonymous ? '#9ca3af' : '#2563eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600
                  }}>
                    {q.is_anonymous ? '?' : (q.student?.username || 'S')[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{q.is_anonymous ? 'Anonymous Student' : q.student?.username || 'Student'}</p>
                    <p style={{ fontSize: 12, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {timeAgo(q.created_at)}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {q.tags?.map(tag => (
                    <span key={tag} style={{
                      padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500,
                      background: '#eff6ff', color: '#2563eb'
                    }}>{tag}</span>
                  ))}
                  {q.status === 'answered' && (
                    <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: '#dcfce7', color: '#16a34a' }}>
                      ✓ Answered
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p style={{ fontSize: 15, color: '#1f2937', lineHeight: 1.6, marginBottom: 12 }}>{q.question_text}</p>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <button onClick={() => handleLike(q.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    color: '#6b7280', fontSize: 13
                  }}>
                    <ThumbsUp size={15} /> {q.likes || 0}
                  </button>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6b7280', fontSize: 13 }}>
                    <MessageCircle size={15} /> {q.answers?.length || 0} answers
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {q.answers?.length > 0 && (
                    <button onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#2563eb', fontWeight: 500,
                      display: 'flex', alignItems: 'center', gap: 4
                    }}>
                      {expandedQ === q.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {expandedQ === q.id ? 'Hide' : 'View'} Answers
                    </button>
                  )}
                  {user.role === 'alumni' && (
                    <button onClick={() => setAnswerForms(prev => ({ ...prev, [q.id]: prev[q.id] ? undefined : '' }))} style={{
                      background: '#2563eb', border: 'none', color: '#fff', padding: '4px 12px', borderRadius: 6,
                      cursor: 'pointer', fontSize: 13, fontWeight: 500
                    }}>
                      {answerForms[q.id] !== undefined ? 'Cancel' : 'Answer'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Answer Form */}
            {answerForms[q.id] !== undefined && (
              <div style={{ padding: 16, borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
                <textarea value={answerForms[q.id] || ''} onChange={e => setAnswerForms(prev => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder="Share your experience and advice..."
                  style={{ width: '100%', padding: 12, border: '1px solid #d1d5db', borderRadius: 8, resize: 'none', height: 80, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                  <button onClick={() => setAnswerForms(prev => ({ ...prev, [q.id]: undefined }))} style={{
                    background: 'none', border: '1px solid #d1d5db', padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13
                  }}>Cancel</button>
                  <button onClick={() => handleAnswer(q.id)} style={{
                    background: '#2563eb', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600
                  }}>Submit Answer</button>
                </div>
              </div>
            )}

            {/* Answers */}
            {expandedQ === q.id && q.answers?.length > 0 && (
              <div style={{ padding: 16, borderTop: '1px solid #e5e7eb', background: '#f0f9ff' }}>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#1e40af' }}>{q.answers.length} Answer{q.answers.length > 1 ? 's' : ''}</p>
                {q.answers.map(a => (
                  <div key={a.id} style={{
                    background: '#fff', borderRadius: 8, padding: 14, marginBottom: 8,
                    border: '1px solid #bfdbfe'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', background: '#f59e0b',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600
                      }}>
                        {a.alumni?.username?.[0] || 'A'}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {a.alumni?.username}
                          <Shield size={12} style={{ color: '#f59e0b' }} />
                        </p>
                        <p style={{ fontSize: 11, color: '#6b7280' }}>
                          {a.alumni?.designation}{a.alumni?.company ? ` at ${a.alumni.company}` : ''} · {timeAgo(a.created_at)}
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{a.answer_text}</p>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4, color: '#9ca3af', fontSize: 12 }}>
                      <ThumbsUp size={13} /> {a.likes || 0} found this helpful
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {questions.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>
          <MessageCircle size={48} style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: 16, fontWeight: 500 }}>No questions yet</p>
          <p style={{ fontSize: 14 }}>Be the first to ask!</p>
        </div>
      )}
    </div>
  );
}