import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Flame, ArrowRight, Bookmark, BarChart2, Compass,
  Code2, ChevronRight, Globe, Zap, TrendingUp
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { usePreferences, useProgress, useSavedResources } from '../hooks/useLocalStorage';
import { popularSearches, topicCategories } from '../data/mockTopics';

const GREETING = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const QUICK_TOPICS = [
  { label: 'Java Arrays', icon: '☕', color: 'from-orange-900/40', tag: 'Programming' },
  { label: 'Python Recursion', icon: '🐍', color: 'from-blue-900/40', tag: 'Programming' },
  { label: 'SQL Joins', icon: '🗃️', color: 'from-purple-900/40', tag: 'Database' },
  { label: 'Git Basics', icon: '🌿', color: 'from-green-900/40', tag: 'Tools' },
  { label: 'React Hooks', icon: '⚛️', color: 'from-cyan-900/40', tag: 'Web Dev' },
  { label: 'Figma Auto Layout', icon: '🖼️', color: 'from-pink-900/40', tag: 'Design' },
];

const MULTILINGUAL_EXAMPLES = [
  { query: 'array index yen 0 la start aguthu?', lang: 'Tamil', topic: 'Java Arrays' },
  { query: 'for loop use panni array input epdi edukurathu?', lang: 'Tamil', topic: 'Java Arrays' },
  { query: 'inheritance simple ah explain pannu', lang: 'Tamil', topic: 'Java OOP' },
  { query: 'SQL JOIN enna difference irukku?', lang: 'Tamil', topic: 'SQL Joins' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { language, level } = usePreferences();
  const { progress } = useProgress();
  const { saved } = useSavedResources();
  const [searchQ, setSearchQ] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  
  // Animated placeholder
  const PLACEHOLDERS = [
    'What do you want to learn today?',
    'Search: Java Arrays',
    'Search: Python Recursion',
    'Search: Git Basics',
    'Search: SQL Joins',
    'Search: React Hooks',
  ];
  
  useEffect(() => {
    let i = 0;
    setPlaceholder(PLACEHOLDERS[0]);
    const interval = setInterval(() => {
      i = (i + 1) % PLACEHOLDERS.length;
      setPlaceholder(PLACEHOLDERS[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) navigate(`/search?q=${encodeURIComponent(searchQ.trim())}&lang=${language}`);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-7 animate-fade-in">

        {/* ── GREETING ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              {GREETING()}, Learner 👋
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Preferred language: <span className="text-accent font-medium">{language}</span>
              {' · '}Level: <span className="text-text-secondary">{level}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-400/10 border border-orange-400/20 rounded-lg">
              <Flame size={14} className="text-orange-400" />
              <span className="text-sm font-semibold text-text-primary">{progress.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* ── SEARCH ── */}
        <form onSubmit={handleSearch}>
          <div className="flex gap-2 bg-bg-card border border-border rounded-xl p-2 focus-within:border-accent/50 transition-colors shadow-card">
            <div className="flex-1 flex items-center gap-2">
              <Search size={16} className="text-text-muted ml-2 shrink-0" />
              <input
                type="text"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-text-primary text-sm placeholder-text-muted focus:outline-none py-1.5"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm"
            >
              <Search size={14} /> Search
            </button>
          </div>
          
          {/* Popular searches */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs text-text-muted pt-0.5">Try:</span>
            {popularSearches.slice(0, 7).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => navigate(`/search?q=${encodeURIComponent(s)}&lang=${language}`)}
                className="px-3 py-1 bg-bg-elevated border border-border rounded-full text-xs text-text-secondary hover:border-accent/40 hover:text-accent transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </form>

        {/* ── CONTINUE LEARNING ── */}
        <div
          className="bg-gradient-to-br from-accent/10 via-bg-card to-bg-card border border-accent/25 rounded-xl p-5 cursor-pointer hover:border-accent/40 hover:shadow-card-hover transition-all group"
          onClick={() => navigate(`/search?q=${encodeURIComponent(progress.currentTopic)}&lang=${language}`)}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={13} className="text-accent" />
                <span className="text-xs text-accent font-semibold tracking-wide">CONTINUE LEARNING</span>
              </div>
              <h2 className="text-base font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">
                {progress.currentTopic}
              </h2>
              <p className="text-xs text-text-muted mb-3">
                📍 Next: Complete Array Traversal → Start Strings
              </p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-text-muted">
                  <span>Progress</span>
                  <span className="text-accent font-semibold">{progress.currentProgress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress.currentProgress}%` }} />
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-black text-sm font-bold rounded-lg hover:bg-accent-hover transition-colors shrink-0">
              Continue <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Topics Completed', value: progress.topicsCompleted, icon: BookOpen, color: 'text-accent', border: 'border-accent/20' },
            { label: 'Videos Watched', value: progress.videosWatched, icon: Clock, color: 'text-blue-400', border: 'border-blue-400/20' },
            { label: 'Practice Solved', value: progress.practiceProblems, icon: Code2, color: 'text-purple-400', border: 'border-purple-400/20' },
            { label: 'Saved Items', value: saved.length, icon: Bookmark, color: 'text-orange-400', border: 'border-orange-400/20' },
          ].map(stat => (
            <div key={stat.label} className={`bg-bg-card border ${stat.border} rounded-xl p-4`}>
              <stat.icon size={16} className={stat.color} />
              <div className="text-2xl font-bold text-text-primary mt-2 mb-0.5">{stat.value}</div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── QUICK TOPICS ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-text-primary">Quick Explore</h2>
              <p className="text-xs text-text-muted mt-0.5">Popular topics in {language}</p>
            </div>
            <button
              onClick={() => navigate('/explore')}
              className="flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors font-medium"
            >
              <Compass size={13} /> All Skills
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {QUICK_TOPICS.map(topic => (
              <button
                key={topic.label}
                onClick={() => navigate(`/search?q=${encodeURIComponent(topic.label)}&lang=${language}`)}
                className={`bg-gradient-to-br ${topic.color} to-bg-card border border-border rounded-xl p-4 text-left hover:border-accent/30 hover:shadow-card-hover transition-all group`}
              >
                <div className="text-2xl mb-2">{topic.icon}</div>
                <div className="text-xs text-text-muted mb-0.5">{topic.tag}</div>
                <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {topic.label}
                </div>
                <div className="flex items-center gap-1 text-xs text-accent mt-2.5 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── MULTILINGUAL SEARCH ── */}
        <div className="bg-bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <Globe size={15} className="text-accent" />
            <h2 className="text-base font-bold text-text-primary">Type Naturally in {language}</h2>
          </div>
          <p className="text-xs text-text-muted mb-4">
            SkillAtlas AI understands your native language + English technical terms.
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {MULTILINGUAL_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => navigate(`/search?q=${encodeURIComponent(ex.topic)}&lang=${language}`)}
                className="flex items-start gap-3 p-3 bg-bg-elevated border border-border rounded-lg text-left hover:border-accent/30 hover:bg-bg-elevated/80 transition-all group"
              >
                <Search size={13} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-text-secondary italic">"{ex.query}"</div>
                  <div className="text-[10px] text-text-muted mt-1">→ {ex.topic}</div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-accent/70 mt-4 font-medium text-center">
            "Type naturally. Learn comfortably."
          </p>
        </div>

        {/* ── RECENTLY VIEWED + SAVED ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-text-primary">Recently Viewed</h2>
            </div>
            <div className="space-y-2">
              {progress.recentlyViewed.map((topic, i) => (
                <button
                  key={topic}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(topic)}&lang=${language}`)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text-secondary hover:border-accent/30 hover:text-accent transition-all text-left"
                >
                  <Clock size={13} className="text-text-muted shrink-0" />
                  <span className="flex-1">{topic}</span>
                  <ChevronRight size={13} className="text-text-muted" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-text-primary">Quick Navigation</h2>
            </div>
            <div className="space-y-2">
              {[
                { icon: BarChart2, label: 'View My Progress', to: '/progress', color: 'text-accent' },
                { icon: Bookmark, label: `Saved Resources (${saved.length})`, to: '/saved', color: 'text-orange-400' },
                { icon: Zap, label: 'Ask AI Tutor', to: '/ai-tutor', color: 'text-purple-400' },
              ].map(item => (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text-secondary hover:border-accent/30 hover:text-text-primary transition-all text-left"
                >
                  <item.icon size={14} className={item.color} />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight size={13} className="text-text-muted" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
