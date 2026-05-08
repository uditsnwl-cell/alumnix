import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, RotateCcw, Sparkles } from 'lucide-react';

const suggestions = [
  "Should I choose Product Management or Software Engineering?",
  "How do I prepare for placements in my 3rd year?",
  "What skills do I need for a career in Data Science?",
  "How do I reach out to alumni for mentorship?",
  "What's the best way to build my resume as a CSE student?",
];

const SYSTEM_PROMPT = `You are AlumniX Career Advisor — an expert AI career counselor embedded inside AlumniX, a university alumni networking platform. You help Indian engineering students (primarily B.Tech/M.Tech) with:
- Career path guidance (Product Management, Software Engineering, Data Science, Consulting, FinTech, etc.)
- Placement preparation strategies
- Resume and LinkedIn tips
- How to approach alumni mentors
- Internship hunting advice
- Skill building recommendations

Keep responses concise, warm, practical, and specific to Indian engineering students. Use bullet points for clarity. Always be encouraging. Reference that they're using AlumniX and can connect with relevant alumni through the platform. Keep responses under 200 words.`;

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Hi! I'm your **AlumniX Career Advisor**, powered by AI.\n\nI can help you with career paths, placement prep, skill building, reaching out to mentors, and more. What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      let reply = "That's a great question! I recommend checking out the **Find Members** section to connect with an alumni who specializes in this. They can give you personalized advice based on their own journey.";
      
      const exactQuestion = userText.trim();
      
      if (exactQuestion === "Should I choose Product Management or Software Engineering?" || exactQuestion.toLowerCase().includes('product management')) {
        reply = "**Product Management (PM)** vs **Software Engineering (SDE)**:\n\n**Choose SDE if:**\n• You love coding, building systems, and solving deep technical problems.\n• You prefer focused, deep work without constant meetings.\n\n**Choose PM if:**\n• You love business strategy, user experience, and deciding *what* to build.\n• You have great communication skills and enjoy working with multiple teams.\n\n*Tip: Connect with both PMs and SDEs on AlumniX to hear their daily routines!*";
      } 
      else if (exactQuestion === "How do I prepare for placements in my 3rd year?" || exactQuestion.toLowerCase().includes('placement')) {
        reply = "For **3rd Year Placement Prep**:\n\n1. **Master DSA:** Do 2-3 LeetCode problems daily. Focus on Arrays, DP, and Graphs.\n2. **Projects:** Build at least two strong full-stack or backend projects. Deploy them live.\n3. **CS Fundamentals:** Start revising OS, DBMS, and Computer Networks by the end of your 6th semester.\n4. **Aptitude:** Practice quantitative aptitude for 30 mins a day.\n\n*Good luck! You've got this.*";
      } 
      else if (exactQuestion === "What skills do I need for a career in Data Science?" || exactQuestion.toLowerCase().includes('data science')) {
        reply = "To build a career in **Data Science & AI**, focus on these core skills:\n\n• **Programming:** Master Python, Pandas, and NumPy.\n• **Math:** Solidify your understanding of Statistics, Probability, and Linear Algebra.\n• **Machine Learning:** Understand how algorithms like Random Forest, XGBoost, and Neural Networks work under the hood.\n• **Database:** SQL is a must-have for extracting data.\n\n*Tip: Reach out to Data Science mentors on AlumniX to review your portfolio.*";
      } 
      else if (exactQuestion === "How do I reach out to alumni for mentorship?" || exactQuestion.toLowerCase().includes('mentorship')) {
        reply = "When reaching out to **Alumni for Mentorship**:\n\n• **Be Specific:** Don't just say 'Hi'. Start with context: 'Hi [Name], I am a 3rd-year CSE student interested in your work at Google...'\n• **Have a Clear Ask:** 'Could you review my resume?' or 'Do you have 15 mins for a quick chat about your journey?'\n• **Follow Up:** If they don't reply in a week, send a polite follow-up message.\n\n*Use the 'Find Members' tab here on AlumniX to start connecting!*";
      } 
      else if (exactQuestion === "What's the best way to build my resume as a CSE student?" || exactQuestion.toLowerCase().includes('resume')) {
        reply = "Here are the top **Resume Tips** for CSE students:\n\n• **Keep it to 1 page:** Recruiters scan it in 6 seconds.\n• **Use Action Verbs:** Start bullet points with 'Developed', 'Optimized', or 'Led'.\n• **Quantify Impact:** Instead of 'Made a fast website', write 'Reduced load time by 40% using React.js'.\n• **Highlight Tech Stack:** Make it easy to see your languages and frameworks at a glance.";
      }

      // Simulate AI thinking delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Couldn't generate a response right now. Please try again." }]);
    }
    setLoading(false);
  };

  const reset = () => {
    setMessages([{ role: 'assistant', content: "👋 Hi! I'm your **AlumniX Career Advisor**, powered by AI.\n\nI can help you with career paths, placement prep, skill building, reaching out to mentors, and more. What's on your mind today?" }]);
  };

  const formatMsg = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n- /g, '<br/>• ')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '40px 40px 0', maxWidth: 860, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--gold), #e8880a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="#07091a" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>
              AI Career <span style={{ color: 'var(--gold)' }}>Advisor</span>
            </h1>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(34,212,94,0.15)', color: 'var(--success)', fontWeight: 700 }}>LIVE</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Powered by Claude AI · Personalized career guidance</p>
        </div>
        <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 13 }}>
          <RotateCcw size={13} /> New Chat
        </button>
      </div>

      {/* Suggestions (only when 1 message) */}
      {messages.length === 1 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Suggested Questions</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)} style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(245,166,35,0.25)', background: 'var(--gold-dim)', color: 'var(--gold)', fontSize: 12, fontWeight: 500, textAlign: 'left', lineHeight: 1.4, transition: 'all 0.2s', maxWidth: 260 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(245,166,35,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.25)'; e.currentTarget.style.background = 'var(--gold-dim)'; }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 20, scrollbarWidth: 'thin' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', gap: 12, alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.role === 'user' ? 'linear-gradient(135deg, var(--gold), #e8880a)' : 'linear-gradient(135deg, #4da6ff, #2563eb)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#fff', boxShadow: m.role === 'user' ? '0 4px 15px rgba(245,166,35,0.3)' : '0 4px 15px rgba(77,166,255,0.3)' }}>
              {m.role === 'user' ? 'R' : <Zap size={14} />}
            </div>
            {/* Bubble */}
            <div style={{ maxWidth: '75%', padding: '14px 18px', borderRadius: m.role === 'user' ? '20px 4px 20px 20px' : '4px 20px 20px 20px', background: m.role === 'user' ? 'linear-gradient(135deg, rgba(245,166,35,0.2), rgba(245,166,35,0.08))' : 'var(--navy-card)', border: m.role === 'user' ? '1px solid var(--gold-border)' : '1px solid rgba(255,255,255,0.07)', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }} />
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #4da6ff, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={14} color="#fff" />
            </div>
            <div style={{ padding: '16px 20px', borderRadius: '4px 20px 20px 20px', background: 'var(--navy-card)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 6, alignItems: 'center' }}>
              {[0, 0.2, 0.4].map((delay, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', animation: `pulse-gold 1.2s ${delay}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '20px 0 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: 12, background: 'var(--navy-card)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', padding: '8px 8px 8px 20px', transition: 'border-color 0.2s' }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()} placeholder="Ask about careers, placements, skills, mentorship..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 14, padding: '6px 0' }} />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{ width: 42, height: 42, borderRadius: 12, border: 'none', background: input.trim() && !loading ? 'linear-gradient(135deg, var(--gold), #e8880a)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed' }}>
            <Send size={16} color={input.trim() && !loading ? '#07091a' : 'var(--text-muted)'} />
          </button>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>AI-powered advice · Not a substitute for professional counseling</p>
      </div>
    </div>
  );
}
