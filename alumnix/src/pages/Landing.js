import React, { useState, useEffect, useRef } from 'react';
import { Zap, Users, Briefcase, Sparkles, ArrowRight, GraduationCap, Building2, MessageSquare, Star, TrendingUp, Award, Heart, ChevronDown } from 'lucide-react';

// Helper component for animating stats when they scroll into view
const AnimatedStat = ({ text }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const timerRef = useRef(null);
  const ref = useRef(null);

  const numMatch = text.match(/[\d,]+/);
  const suffixMatch = text.match(/[^\d,]+/);
  
  const endNum = numMatch ? parseInt(numMatch[0].replace(/,/g, '')) : 0;
  const suffix = suffixMatch ? suffixMatch[0] : '';

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let current = 0;
        const duration = 2000; // 2 seconds
        const fps = 60;
        const steps = duration / (1000 / fps);
        const increment = endNum / steps;
        
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
          current += increment;
          if (current >= endNum) {
            setCount(endNum);
            clearInterval(timerRef.current);
          } else {
            setCount(Math.floor(current));
          }
        }, 1000 / fps);
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [endNum]);

  return <span ref={ref}>{hasAnimated.current ? count.toLocaleString() : '0'}{suffix}</span>;
};

// Letter by letter sequential reveal (Left to Right typewriter effect)
const WordRevealText = ({ text, highlightedText = '', style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Triggers only once
      }
    }, { threshold: 0.2 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const textChars = (highlightedText ? text + ' ' : text).split('');
  const highlightedChars = highlightedText ? highlightedText.split('') : [];

  return (
    <h2 ref={ref} style={{ ...style, display: 'inline-block' }}>
      {textChars.map((char, i) => (
        <span key={`char-${i}`} style={{
          display: 'inline-block',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-15px) scale(0.95)',
          transition: `opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`,
          whiteSpace: 'pre'
        }}>{char}</span>
      ))}
      {highlightedChars.map((char, i) => (
        <span key={`highlight-${i}`} style={{
          display: 'inline-block',
          color: 'var(--gold)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-15px) scale(0.95)',
          transition: `opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) ${(textChars.length + i) * 0.04}s, transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) ${(textChars.length + i) * 0.04}s`,
          whiteSpace: 'pre'
        }}>{char}</span>
      ))}
    </h2>
  );
};

export default function Landing({ onEnter }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    { icon: Zap, title: 'AI-Powered Matching', desc: 'Our AI analyzes 50+ data points to match you with mentors who actually fit your goals.', color: '#f5a623' },
    { icon: Briefcase, title: 'Real Opportunities', desc: 'Internships and jobs posted directly by alumni — referrals included.', color: '#4da6ff' },
    { icon: Users, title: 'Active Community', desc: 'Join 1000+ alumni and students from your university working together.', color: '#22d45e' },
    { icon: MessageSquare, title: 'AI Career Advisor', desc: 'Get instant career guidance from our 24/7 AI advisor trained on industry data.', color: '#a78bfa' },
    { icon: Building2, title: 'University Societies', desc: 'Connect through your societies — E-Cell, UCS, UDT and more legacy networks.', color: '#fb923c' },
    { icon: Award, title: 'Mentor Score', desc: 'Build your reputation. Top mentors get featured to recruiters.', color: '#22d3ee' },
  ];

  const steps = [
    { num: '01', title: 'Sign Up', desc: 'Create your profile in 2 minutes — student or alumni.', icon: GraduationCap },
    { num: '02', title: 'Get Matched', desc: 'Our AI finds your perfect mentor based on goals, skills, and interests.', icon: Sparkles },
    { num: '03', title: 'Connect & Grow', desc: 'Chat, get referrals, attend events, and accelerate your career.', icon: TrendingUp },
  ];

  const stats = [
    { num: '1,200+', label: 'Active Alumni' },
    { num: '3,500+', label: 'Students' },
    { num: '450+', label: 'Companies' },
    { num: '92%', label: 'Match Success' },
  ];





  const testimonials = [
    { name: 'Aditi Verma', role: 'CSE 2024 → SDE at Amazon', text: 'AlumniX connected me with a senior at Amazon who referred me. Got placed in 2 weeks!', color: '#f5a623' },
    { name: 'Rohit Sharma', role: 'ECE 2023 → Goldman Sachs', text: 'The AI matching is scary good. My mentor still helps me 1 year into my job.', color: '#4da6ff' },
    { name: 'Priya Iyer', role: 'Alumni · Microsoft', text: 'Mentored 15 students. 6 got hired through my referrals. Such a rewarding platform.', color: '#22d45e' },
  ];

  const societies = [
    { code: 'E-Cell', name: 'Entrepreneurship Development Cell', color: '#10b981', icon: '🚀' },
    { code: 'UCS', name: 'University Cultural Society', color: '#f5a623', icon: '🎭' },
    { code: 'UDT', name: 'University Dramatic Team', color: '#4da6ff', icon: '🎬' },
    { code: 'ULC', name: 'University Literary Committee', color: '#a78bfa', icon: '📚' },
  ];

  const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const winH = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const rotX = -(mousePos.y - winH / 2) * 0.03;
  const rotY = (mousePos.x - winW / 2) * 0.03;
  const zScroll = scrollY * 0.15;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', color: 'var(--text-primary)', overflow: 'hidden', position: 'relative' }}>

      {/* === Animated Background Blobs === */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '5%', left: '10%', width: 500, height: 500,
          background: 'radial-gradient(circle, var(--gold-dim), transparent 70%)',
          animation: 'float-slow 18s ease-in-out infinite, blob 12s ease-in-out infinite',
          filter: 'blur(40px)',
          transform: `translateY(${scrollY * 0.25}px)`, // Fast parallax
          transition: 'transform 0.1s linear'
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '5%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(77,166,255,0.08), transparent 70%)',
          animation: 'float-slow 22s ease-in-out infinite reverse, blob 14s ease-in-out infinite',
          filter: 'blur(50px)',
          transform: `translateY(${scrollY * 0.15}px)`, // Medium parallax
          transition: 'transform 0.1s linear'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '30%', width: 450, height: 450,
          background: 'radial-gradient(circle, rgba(168,139,250,0.06), transparent 70%)',
          animation: 'float-slow 20s ease-in-out infinite, blob 10s ease-in-out infinite',
          filter: 'blur(45px)',
          transform: `translateY(${scrollY * 0.08}px)`, // Slow parallax
          transition: 'transform 0.1s linear'
        }} />
      </div>

      {/* === Mouse Follow Glow === */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 200,
        top: mousePos.y - 200,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(79,70,229,0.04), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'left 0.2s ease-out, top 0.2s ease-out',
        filter: 'blur(20px)',
      }} />

      {/* === NAVBAR === */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 50 ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(79,70,229,0.2)',
          }}>
            <Zap size={20} color="#ffffff" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--text-primary)' }}>
            Alumni<span style={{ color: 'var(--gold)' }}>X</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => onEnter('student')} style={{
            padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)',
            background: 'transparent', color: 'var(--text-primary)', fontWeight: 600, fontSize: 14,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            Student Login
          </button>
          <button onClick={() => onEnter('alumni')} style={{
            padding: '10px 20px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#ffffff', fontWeight: 700, fontSize: 14,
            boxShadow: '0 4px 20px rgba(79,70,229,0.3)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            Alumni Login
          </button>
        </div>
      </nav>

      {/* === HERO === */}
      <section ref={heroRef} style={{
        position: 'relative', zIndex: 2, padding: '80px 60px 120px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 1200, margin: '0 auto',
        perspective: 1200
      }}>
        
        {/* 3D Container tracking mouse */}
        <div style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${zScroll}px)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s linear',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', borderRadius: 50,
            background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
            marginBottom: 32, animation: 'fadeUp 0.6s ease',
            transform: 'translateZ(30px)' // Pops out slightly
          }}>
            <Sparkles size={14} color="var(--gold)" />
            <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>Powered by AI · Trusted by 1200+ Alumni</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 7vw, 84px)', fontWeight: 800,
            lineHeight: 1.05, marginBottom: 28, animation: 'fadeUp 0.7s ease',
            letterSpacing: -2, color: 'var(--text-primary)',
            transform: 'translateZ(50px)' // Extreme pop out
          }}>
            Your Alumni Network,<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--gold), #7c75f0, var(--gold))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 4s ease infinite',
            }}>Reimagined with AI.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)',
            maxWidth: 700, lineHeight: 1.7, marginBottom: 48, animation: 'fadeUp 0.8s ease',
            transform: 'translateZ(20px)' // Slight pop out
          }}>
            Connect with seniors who've been where you want to go. Get matched with mentors,
            discover hidden opportunities, and accelerate your career with the power of community.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.9s ease', transform: 'translateZ(40px)' }}>
            <button onClick={() => onEnter('student')} style={{
              padding: '16px 32px', borderRadius: 14, border: 'none',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#ffffff',
              fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 30px rgba(79,70,229,0.3)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(79,70,229,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,70,229,0.3)'; }}>
              <GraduationCap size={20} /> I'm a Student <ArrowRight size={18} />
            </button>
            <button onClick={() => onEnter('alumni')} style={{
              padding: '16px 32px', borderRadius: 14,
              border: '1px solid var(--gold-border)', background: 'var(--gold-dim)',
              color: 'var(--gold)', fontWeight: 700, fontSize: 16,
              display: 'flex', alignItems: 'center', gap: 10,
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,70,229,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold-dim)'; e.currentTarget.style.transform = 'none'; }}>
              <Award size={20} /> I'm Alumni <ArrowRight size={18} />
            </button>
          </div>

        </div>

        {/* Floating cards preview */}
        <div style={{ marginTop: 80, position: 'relative', width: '100%', maxWidth: 900, height: 280 }}>
          {[
            { x: '5%', y: 0, delay: '0s', color: '#f5a623', name: 'Priya S.', role: 'PM @ Google' },
            { x: '40%', y: 40, delay: '0.5s', color: '#4da6ff', name: 'Arjun M.', role: 'SDE @ MS' },
            { x: '75%', y: 0, delay: '1s', color: '#22d45e', name: 'Sneha R.', role: 'DS @ Zomato' },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', left: c.x, top: c.y, zIndex: 3,
              transform: `translateY(${scrollY * (0.05 + i * 0.04)}px)`, // Multi-layered scrolling!
              transition: 'transform 0.1s linear'
            }}>
              <div style={{
                width: 200, padding: 20, borderRadius: 18,
                background: 'var(--navy-card)', border: `1px solid rgba(0,0,0,0.06)`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.06)`,
                animation: `float 3s ease-in-out ${c.delay} infinite`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05) translateY(-5px) rotateX(5deg)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', background: c.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 800, color: '#ffffff', fontSize: 18,
                  }}>{c.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: c.color }}>{c.role}</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, height: 3, background: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: c.color, borderRadius: 2 }} />
                </div>
                <div style={{ marginTop: 6, fontSize: 10, color: 'var(--text-muted)' }}>85% match</div>
              </div>
            </div>
          ))}
        </div>

        <ChevronDown size={28} color="var(--text-muted)" style={{ marginTop: 40, animation: 'float 2s ease-in-out infinite' }} />
      </section>

      {/* === STATS === */}
      <section style={{ position: 'relative', zIndex: 2, padding: '60px 60px', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800,
                color: 'var(--gold)',
                marginBottom: 8,
              }}><AnimatedStat text={s.num} /></div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURES === */}
      <section style={{ position: 'relative', zIndex: 2, padding: '120px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2 }}>Features</span>
          <WordRevealText 
            text="Everything you need to" 
            highlightedText="level up"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px', letterSpacing: -1 }} 
          />
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>
            Built for students and alumni who want real outcomes, not just connections.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="tilt-card" style={{
                padding: 32, borderRadius: 20,
                background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: 'var(--shadow-card)',
                position: 'relative', overflow: 'hidden',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '55'; e.currentTarget.style.boxShadow = `0 20px 60px ${f.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>
                <div style={{
                  position: 'absolute', top: -50, right: -50, width: 150, height: 150,
                  background: `radial-gradient(circle, ${f.color}15, transparent 70%)`,
                  borderRadius: '50%',
                }} />
                <div style={{
                  width: 56, height: 56, borderRadius: 16, background: f.color + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                  border: `1px solid ${f.color}33`,
                }}>
                  <Icon size={26} color={f.color} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section style={{ position: 'relative', zIndex: 2, padding: '120px 60px', background: 'rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2 }}>How It Works</span>
            <WordRevealText 
              text="Get started in" 
              highlightedText="3 simple steps"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0', letterSpacing: -1 }} 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 80, fontWeight: 800,
                    color: 'rgba(79,70,229,0.05)', position: 'absolute', top: -20, left: '50%',
                    transform: `translateX(-50%) translateY(${Math.min(0, (scrollY - 800) * -0.1)}px)`,
                    zIndex: 0, transition: 'transform 0.1s linear'
                  }}>{s.num}</div>
                  <div style={{
                    width: 80, height: 80, borderRadius: 20, margin: '0 auto 24px',
                    background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(79,70,229,0.3)',
                    position: 'relative', zIndex: 1,
                  }}>
                    <Icon size={32} color="#ffffff" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 280, margin: '0 auto' }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === SOCIETIES PREVIEW === */}
      <section style={{ position: 'relative', zIndex: 2, padding: '120px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2 }}>Communities</span>
          <WordRevealText 
            text="Powered by" 
            highlightedText="University Societies"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px', letterSpacing: -1 }} 
          />
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>
            Reconnect with your society legacy and find mentors who shared your passion.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {societies.map((s, i) => (
            <div key={i} className="tilt-card" style={{
              padding: 36, borderRadius: 24, textAlign: 'center',
              background: `linear-gradient(135deg, ${s.color}10, transparent)`,
              border: `1px solid ${s.color}33`,
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${s.color}15, ${s.color}05)`; e.currentTarget.style.boxShadow = `0 20px 50px ${s.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${s.color}10, transparent)`; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: s.color, marginBottom: 8 }}>{s.code}</div>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section style={{ position: 'relative', zIndex: 2, padding: '120px 60px', background: 'rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2 }}>Stories</span>
            <WordRevealText 
              text="Real outcomes from" 
              highlightedText="real users"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0', letterSpacing: -1 }} 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                padding: 32, borderRadius: 20,
                background: 'var(--navy-card)', border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.color + '55'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={t.color} color={t.color} />)}
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic', fontWeight: 500 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', background: t.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 800, color: '#ffffff', fontSize: 18,
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section style={{ position: 'relative', zIndex: 2, padding: '120px 60px' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', textAlign: 'center',
          padding: 64, borderRadius: 32,
          background: 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(79,70,229,0.02))',
          border: '1px solid var(--gold-border)',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(79,70,229,0.1)',
          transform: `scale(${Math.min(1, 0.95 + scrollY * 0.00005)}) translateY(${Math.min(0, (scrollY - 2000) * -0.05)}px)`,
          transition: 'transform 0.1s linear'
        }}>
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 400, height: 400,
            background: 'radial-gradient(circle, var(--gold-dim), transparent 70%)',
            filter: 'blur(60px)',
          }} />
          <Heart size={48} color="var(--gold)" style={{ marginBottom: 24, position: 'relative' }} />
          <WordRevealText 
            text="Ready to transform your career?" 
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20, letterSpacing: -1, position: 'relative' }} 
          />
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', position: 'relative', fontWeight: 500 }}>
            Join thousands of students and alumni already building their future together.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <button onClick={() => onEnter('student')} style={{
              padding: '16px 36px', borderRadius: 14, border: 'none',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#ffffff',
              fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 10px 30px rgba(79,70,229,0.3)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              Get Started Free <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer style={{
        position: 'relative', zIndex: 2,
        padding: '40px 60px', borderTop: '1px solid rgba(0,0,0,0.06)',
        textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13,
      }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>
            Alumni<span style={{ color: 'var(--gold)' }}>X</span>
          </span>
        </div>
        © 2025 AlumniX · Built with ❤️ for ambitious minds.
      </footer>
    </div>
  );
}