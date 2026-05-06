// ============================================
// DATA LAYER — Change ONE variable to switch backend
// ============================================
const USE_SUPABASE = false; // <-- Change to true when Supabase is ready

// When USE_SUPABASE is true, install @supabase/supabase-js and uncomment:
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');
const supabase = null;

// ============================================
// LOCAL STORAGE SIMULATION (works offline)
// ============================================
const DB = {
  _get(key) {
    const data = localStorage.getItem(`alumnix_${key}`);
    return data ? JSON.parse(data) : [];
  },

  _set(key, data) {
    localStorage.setItem(`alumnix_${key}`, JSON.stringify(data));
    // Dispatch custom event so other tabs/components update
    window.dispatchEvent(new CustomEvent('alumnix_db_change', { detail: { key } }));
  },

  _id() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
};

// ============================================
// CURRENT USER (simulate logged-in user)
// ============================================
export function getCurrentUser() {
  const stored = localStorage.getItem('alumnix_current_user');
  if (stored) return JSON.parse(stored);
  
  // Default demo users — switch between student/alumni for demo
  const users = {
    student: {
      id: 'user_student_1',
      username: 'Rahul Sharma',
      role: 'student',
      branch: 'CSE',
      semester: 6,
      cgpa: 8.5,
      avatar_url: null,
      show_name: true
    },
    alumni: {
      id: 'user_alumni_1',
      username: 'Priya Verma',
      role: 'alumni',
      branch: 'CSE',
      batch: 2020,
      company: 'Google',
      designation: 'Product Manager',
      avatar_url: null,
      show_name: true
    }
  };

  return users.student; // Default to student view
}

export function switchUser(role) {
  const users = {
    student: {
      id: 'user_student_1',
      username: 'Rahul Sharma',
      role: 'student',
      branch: 'CSE',
      semester: 6,
      cgpa: 8.5,
      avatar_url: null,
      show_name: true
    },
    alumni: {
      id: 'user_alumni_1',
      username: 'Priya Verma',
      role: 'alumni',
      branch: 'CSE',
      batch: 2020,
      company: 'Google',
      designation: 'Product Manager',
      avatar_url: null,
      show_name: true
    }
  };
  localStorage.setItem('alumnix_current_user', JSON.stringify(users[role]));
  window.dispatchEvent(new CustomEvent('alumnix_user_switch'));
  return users[role];
}

// ============================================
// AMA — QUESTIONS
// ============================================
export async function fetchQuestions(tag = 'all') {
  if (USE_SUPABASE && supabase) {
    let query = supabase
      .from('ama_questions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);
    const { data } = await query;
    return data || [];
  }

  // LocalStorage fallback
  let questions = DB._get('ama_questions');
  
  // Seed demo data if empty
  if (questions.length === 0) {
    questions = [
      {
        id: 'q1',
        student_id: 'user_student_1',
        student: { username: 'Rahul Sharma' },
        question_text: 'How should I prepare for product management interviews at FAANG companies? I am a CSE 6th sem student with 8.5 CGPA.',
        tags: ['career', 'interview'],
        likes: 12,
        status: 'answered',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        is_anonymous: false,
        answers: [
          {
            id: 'a1',
            alumni_id: 'user_alumni_1',
            alumni: { username: 'Priya Verma', company: 'Google', designation: 'Product Manager' },
            answer_text: 'Great question! Here is my exact preparation strategy that worked for Google:\n\n1. **Frameworks matter** — Learn CIRCLES, STAR, and product design frameworks\n2. **Practice with a partner** — I did 50+ mock PM interviews on pramp.com\n3. **Build a side project** — Even a simple Chrome extension shows product thinking\n4. **Read "Cracking the PM Interview"** cover to cover\n5. **Follow PMs on LinkedIn/Twitter** — Understand current product debates\n\nThe biggest mistake students make is only doing LeetCode. PM interviews test STRUCTURED THINKING, not coding.',
            likes: 34,
            created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
            is_private: false
          }
        ]
      },
      {
        id: 'q2',
        student_id: 'user_student_2',
        student: { username: 'Anonymous Student' },
        question_text: 'Is it worth doing a master\'s from India vs going abroad for MS? My family can afford up to 20 lakhs.',
        tags: ['career'],
        likes: 8,
        status: 'open',
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
        is_anonymous: true,
        answers: []
      },
      {
        id: 'q3',
        student_id: 'user_student_3',
        student: { username: 'Ankit Gupta' },
        question_text: 'What is the daily routine of a software engineer at Microsoft? How different is it from college life?',
        tags: ['company', 'technical'],
        likes: 15,
        status: 'open',
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
        is_anonymous: false,
        answers: []
      },
      {
        id: 'q4',
        student_id: 'user_student_1',
        student: { username: 'Rahul Sharma' },
        question_text: 'Which technology should I focus on — AI/ML, Web Dev, or Cloud? I want maximum placement chances.',
        tags: ['technical', 'career'],
        likes: 20,
        status: 'answered',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        is_anonymous: false,
        answers: [
          {
            id: 'a4',
            alumni_id: 'user_alumni_2',
            alumni: { username: 'Arjun Mehta', company: 'Amazon', designation: 'SDE-2' },
            answer_text: 'Honestly? Web Dev gives the FASTEST placement results because:\n- Most startups and mid-size companies need frontend devs\n- You can build a portfolio in 3 months\n- Interview process is simpler than AI/ML roles\n\nBut if you have 1+ year, Cloud (AWS/Azure) gives the HIGHEST salary packages. Pick based on your timeline.',
            likes: 18,
            created_at: new Date(Date.now() - 82800000).toISOString(),
            is_private: false
          }
        ]
      },
      {
        id: 'q5',
        student_id: 'user_student_4',
        student: { username: 'Sneha Patel' },
        question_text: 'I got placed in TCS but also have a startup idea. Should I take the job or pursue the startup?',
        tags: ['career', 'startups'],
        likes: 25,
        status: 'open',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        is_anonymous: false,
        answers: []
      }
    ];
    DB._set('ama_questions', questions);
  }

  if (tag !== 'all') {
    questions = questions.filter(q => q.tags?.includes(tag));
  }
  return questions;
}

export async function submitQuestion(questionText, userId, username) {
  const question = {
    id: DB._id(),
    student_id: userId,
    student: { username },
    question_text: questionText,
    tags: ['general'],
    likes: 0,
    status: 'open',
    created_at: new Date().toISOString(),
    is_anonymous: false,
    answers: []
  };

  const questions = DB._get('ama_questions');
  questions.unshift(question);
  DB._set('ama_questions', questions);

  // Also create a notification
  const notifications = DB._get('notifications');
  notifications.unshift({
    id: DB._id(),
    type: 'new_ama_question',
    title: 'New AMA Question',
    message: `${username} asked a new question in AMA`,
    is_read: false,
    created_at: new Date().toISOString()
  });
  DB._set('notifications', notifications);

  return question;
}

export async function submitAnswer(questionId, answerText, alumniId, alumniName, alumniMeta) {
  const answer = {
    id: DB._id(),
    alumni_id: alumniId,
    alumni: { username: alumniName, ...alumniMeta },
    answer_text: answerText,
    likes: 0,
    created_at: new Date().toISOString(),
    is_private: false
  };

  const questions = DB._get('ama_questions');
  const idx = questions.findIndex(q => q.id === questionId);
  if (idx !== -1) {
    questions[idx].answers = questions[idx].answers || [];
    questions[idx].answers.push(answer);
    questions[idx].status = 'answered';
    DB._set('ama_questions', questions);
  }

  return answer;
}

export async function likeQuestion(questionId) {
  const questions = DB._get('ama_questions');
  const idx = questions.findIndex(q => q.id === questionId);
  if (idx !== -1) {
    questions[idx].likes = (questions[idx].likes || 0) + 1;
    DB._set('ama_questions', questions);
    return questions[idx].likes;
  }
  return 0;
}

// ============================================
// COMMUNITIES
// ============================================
export async function fetchCommunities() {
  let communities = DB._get('communities');

  if (communities.length === 0) {
    communities = [
      {
        id: 'comm1',
        name: 'IET Bareilly Coders',
        description: 'A community for competitive programmers and developers. Share problems, discuss approaches, and grow together.',
        category: 'tech',
        created_by: 'user_alumni_1',
        cover_image: null,
        rules: ['No spam', 'Help each other', 'Share resources'],
        member_count: 156,
        posts_count: 342,
        min_reputation: 0,
        members: [
          { user_id: 'user_student_1', role: 'member', username: 'Rahul Sharma' },
          { user_id: 'user_alumni_1', role: 'leader', username: 'Priya Verma' }
        ]
      },
      {
        id: 'comm2',
        name: 'Startup Founders IET',
        description: 'For anyone interested in building startups. Alumni who have founded companies mentor aspiring entrepreneurs.',
        category: 'startups',
        created_by: 'user_alumni_2',
        cover_image: null,
        rules: ['Share startup ideas openly', 'Constructive feedback only', 'No judging early ideas'],
        member_count: 43,
        posts_count: 89,
        min_reputation: 10,
        members: [
          { user_id: 'user_alumni_2', role: 'leader', username: 'Arjun Mehta' }
        ]
      },
      {
        id: 'comm3',
        name: 'Placement Prep 2025',
        description: 'Dedicated community for placement preparation. Mock interviews, resume reviews, and company-specific prep material.',
        category: 'career',
        created_by: 'user_alumni_3',
        cover_image: null,
        rules: ['Share interview experiences', 'No false claims', 'Support everyone'],
        member_count: 210,
        posts_count: 567,
        min_reputation: 0,
        members: [
          { user_id: 'user_student_1', role: 'member', username: 'Rahul Sharma' },
          { user_id: 'user_student_3', role: 'moderator', username: 'Ankit Gupta' },
          { user_id: 'user_alumni_3', role: 'leader', username: 'Neha Singh' }
        ]
      },
      {
        id: 'comm4',
        name: 'IET Sports League',
        description: 'Organizing and discussing sports events, tournaments, and fitness activities within IET Bareilly.',
        category: 'sports',
        created_by: 'user_student_5',
        cover_image: null,
        rules: ['Respect all players', 'Fair play', 'No toxicity'],
        member_count: 89,
        posts_count: 134,
        min_reputation: 0,
        members: []
      },
      {
        id: 'comm5',
        name: 'AI/ML Enthusiasts',
        description: 'Deep dive into machine learning, deep learning, and AI research. Projects, papers, and discussions.',
        category: 'tech',
        created_by: 'user_alumni_4',
        cover_image: null,
        rules: ['Share verified resources', 'No hype without substance', 'Cite papers'],
        member_count: 67,
        posts_count: 198,
        min_reputation: 20,
        members: [
          { user_id: 'user_alumni_4', role: 'leader', username: 'Dr. Vikas Kumar' }
        ]
      },
      {
        id: 'comm6',
        name: 'Bareilly Local Meetups',
        description: 'Local events, workshops, and meetups happening in and around Bareilly. Alumni visiting the city can post here.',
        category: 'local',
        created_by: 'user_alumni_1',
        cover_image: null,
        rules: ['Only real events', 'Include date/time/location', 'No scams'],
        member_count: 124,
        posts_count: 45,
        min_reputation: 0,
        members: [
          { user_id: 'user_student_1', role: 'member', username: 'Rahul Sharma' }
        ]
      }
    ];
    DB._set('communities', communities);
  }
  return communities;
}

export async function joinCommunity(communityId, userId, username) {
  const communities = DB._get('communities');
  const idx = communities.findIndex(c => c.id === communityId);
  if (idx !== -1) {
    const alreadyMember = communities[idx].members?.some(m => m.user_id === userId);
    if (alreadyMember) return { error: 'Already a member' };

    communities[idx].members = communities[idx].members || [];
    communities[idx].members.push({ user_id: userId, role: 'member', username });
    communities[idx].member_count = (communities[idx].member_count || 0) + 1;
    DB._set('communities', communities);

    // Notification
    const notifications = DB._get('notifications');
    notifications.unshift({
      id: DB._id(),
      type: 'community_join',
      title: 'Joined Community!',
      message: `You joined "${communities[idx].name}"`,
      is_read: false,
      created_at: new Date().toISOString()
    });
    DB._set('notifications', notifications);

    return { success: true };
  }
  return { error: 'Community not found' };
}

export async function removeMember(communityId, userId) {
  const communities = DB._get('communities');
  const idx = communities.findIndex(c => c.id === communityId);
  if (idx !== -1) {
    communities[idx].members = (communities[idx].members || []).filter(m => m.user_id !== userId);
    communities[idx].member_count = Math.max(0, (communities[idx].member_count || 1) - 1);
    DB._set('communities', communities);
    return { success: true };
  }
  return { error: 'Community not found' };
}

export async function createCommunity(name, description, category, userId, username) {
  const community = {
    id: DB._id(),
    name,
    description,
    category,
    created_by: userId,
    cover_image: null,
    rules: ['Be respectful', 'No spam'],
    member_count: 1,
    posts_count: 0,
    min_reputation: 0,
    members: [{ user_id: userId, role: 'leader', username }]
  };

  const communities = DB._get('communities');
  communities.unshift(community);
  DB._set('communities', communities);

  return community;
}

// ============================================
// NOTIFICATIONS
// ============================================
export async function fetchNotifications() {
  let notifications = DB._get('notifications');
  if (notifications.length === 0) {
    notifications = [
      {
        id: 'n1',
        type: 'new_ama_question',
        title: 'New AMA Question',
        message: 'Ankit Gupta asked about Microsoft work culture',
        is_read: false,
        created_at: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'n2',
        type: 'community_join',
        title: 'Community Activity',
        message: '3 new posts in "IET Bareilly Coders"',
        is_read: false,
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'n3',
        type: 'answer_liked',
        title: 'Your answer got liked!',
        message: 'Priya Verma liked your answer about tech stacks',
        is_read: true,
        created_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'n4',
        type: 'achievement',
        title: 'Reputation Milestone!',
        message: 'You reached 25 reputation points. New communities unlocked!',
        is_read: true,
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    DB._set('notifications', notifications);
  }
  return notifications;
}

export async function markNotificationRead(notifId) {
  const notifications = DB._get('notifications');
  const idx = notifications.findIndex(n => n.id === notifId);
  if (idx !== -1) {
    notifications[idx].is_read = true;
    DB._set('notifications', notifications);
  }
}

export async function markAllNotificationsRead() {
  const notifications = DB._get('notifications');
  notifications.forEach(n => n.is_read = true);
  DB._set('notifications', notifications);
}

// ============================================
// REAL-TIME LISTENER (works for both backends)
// ============================================
export function onDataChange(callback) {
  window.addEventListener('alumnix_db_change', (e) => {
    callback(e.detail.key);
  });
  return () => window.removeEventListener('alumnix_db_change', callback);
}