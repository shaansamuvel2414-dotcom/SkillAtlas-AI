import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search, Play, BookOpen, Map, Code2, Zap, LayoutGrid,
  ArrowRight, Star, Clock, Globe, Filter, X, ChevronRight,
  ShieldCheck, ExternalLink, BookmarkCheck, Bookmark, CheckCircle2, Circle
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import VideoCard from '../components/ui/VideoCard';
import ResourceCard from '../components/ui/ResourceCard';
import RoadmapStep from '../components/ui/RoadmapStep';
import PracticeCard from '../components/ui/PracticeCard';
import ChatInterface from '../components/ui/ChatInterface';
import { usePreferences, useSavedResources } from '../hooks/useLocalStorage';
import { mockVideos, VIDEO_CATEGORIES, LANGUAGES } from '../data/mockVideos';
import { mockResources, RESOURCE_SECTIONS } from '../data/mockResources';
import { javaRoadmap, roadmapProgress } from '../data/mockRoadmap';
import { practiceProblems, PRACTICE_CATEGORIES } from '../data/mockPractice';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'videos', label: 'Videos', icon: Play },
  { id: 'websites', label: 'Websites', icon: Globe },
  { id: 'documentation', label: 'Docs', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Code2 },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
];

const DIFFICULTY_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const DURATION_FILTERS = ['All', 'Under 10 min', '10–30 min', 'Full Course'];
const SORT_OPTIONS = ['Best Match', 'Most Useful', 'Popular', 'Newest'];

// ─── OVERVIEW TAB ──────────────────────────────────────────────────────────────
function OverviewTab({ topic, language, level, setActiveTab, navigate }) {
  const OVERVIEW_CARDS = [
    {
      icon: '🎥', title: 'Best Videos', subtitle: `${mockVideos.filter(v => v.language === language).length} ${language} videos`,
      desc: 'Top-ranked curated videos in your selected language, by relevance.',
      color: 'from-blue-900/30 border-blue-700/20', tab: 'videos',
    },
    {
      icon: '🌐', title: 'Trusted Websites', subtitle: `${mockResources.filter(r => r.type === 'Tutorial').length} trusted resources`,
      desc: 'GeeksforGeeks, W3Schools, Javatpoint — verified and curated.',
      color: 'from-purple-900/30 border-purple-700/20', tab: 'websites',
    },
    {
      icon: '📖', title: 'Official Docs', subtitle: 'Oracle + Baeldung',
      desc: 'Official Java documentation and high-quality reference articles.',
      color: 'from-emerald-900/30 border-emerald-700/20', tab: 'documentation',
    },
    {
      icon: '💪', title: 'Practice', subtitle: `${practiceProblems.length} problems`,
      desc: 'Easy to Hard — find largest, reverse, rotate, two sum, matrix.',
      color: 'from-orange-900/30 border-orange-700/20', tab: 'practice',
    },
    {
      icon: '🗺️', title: 'Learning Roadmap', subtitle: `${roadmapProgress}% complete`,
      desc: 'Java Basics → Conditions → Loops → Arrays → Strings → OOP',
      color: 'from-cyan-900/30 border-cyan-700/20', tab: 'roadmap',
    },
    {
      icon: '🤖', title: 'Ask AI Tutor', subtitle: `${language} AI support`,
      desc: 'Ask doubts in Tamil. Get code examples, videos, and practice.',
      color: 'from-pink-900/30 border-pink-700/20', tab: 'ai',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* ── Topic Header ── */}
      <div className="bg-bg-card border border-border rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-xl font-bold text-text-primary">{topic}</h2>
          <span className="badge-green text-xs">{language}</span>
          <span className="badge-gray text-xs">{level}</span>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          An <span className="text-text-primary font-semibold">array</span> in Java is a fixed-size data structure
          that stores elements of the same type in contiguous memory locations.
          Arrays are zero-indexed — the first element is at index{' '}
          <code className="bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded text-accent text-xs font-mono">0</code>.
          Use <code className="bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded text-accent text-xs font-mono">array.length</code> to get the size.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'LEARN FIRST', content: 'Array Declaration & Initialization' },
            { label: 'RELATED TOPICS', content: null, tags: ['Loops', 'Strings', 'ArrayList', 'Collections'] },
            { label: 'NEXT STEP', content: 'Complete Array Traversal → Start Strings' },
          ].map((item, i) => (
            <div key={i} className="bg-bg-elevated border border-border rounded-lg p-3">
              <div className="text-[10px] font-semibold text-text-muted tracking-wide mb-2">{item.label}</div>
              {item.tags ? (
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(t => (
                    <button
                      key={t}
                      onClick={() => navigate(`/search?q=${encodeURIComponent(t)}&lang=${language}`)}
                      className="tag text-[10px] hover:border-accent/30 hover:text-accent cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-primary font-medium">{item.content}</p>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="flex justify-between text-xs text-text-muted mb-1.5">
            <span>Your Progress</span>
            <span className="text-accent font-semibold">{roadmapProgress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${roadmapProgress}%` }} />
          </div>
        </div>
      </div>

      {/* ── Resource cards grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OVERVIEW_CARDS.map(card => (
          <button
            key={card.icon}
            onClick={() => card.tab === 'ai' ? navigate('/ai-tutor') : setActiveTab(card.tab)}
            className={`bg-gradient-to-br ${card.color} to-bg-card border rounded-xl p-4 text-left hover:shadow-card-hover transition-all duration-200 group`}
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <div className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">{card.title}</div>
            <div className="text-xs text-accent/70 font-medium mt-0.5 mb-2">{card.subtitle}</div>
            <div className="text-xs text-text-muted leading-relaxed">{card.desc}</div>
            <div className="flex items-center gap-1 text-xs text-accent mt-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {card.tab === 'ai' ? 'Open Tutor' : 'Explore'} <ArrowRight size={11} />
            </div>
          </button>
        ))}
      </div>

      {/* ── Top Videos Quick List ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-text-primary">⭐ Top {language} Videos</h3>
          <button
            onClick={() => setActiveTab('videos')}
            className="text-xs text-accent hover:text-accent-hover font-medium flex items-center gap-1"
          >
            View all <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-2">
          {mockVideos.filter(v => v.language === language).slice(0, 3).map((video, i) => (
            <div key={video.id} className="card flex items-center gap-3 hover:border-accent/20 transition-all cursor-pointer">
              <div className="text-base font-bold text-text-muted w-5 text-center shrink-0">#{i + 1}</div>
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shrink-0">
                <Play size={10} className="text-black ml-0.5" fill="black" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-text-primary line-clamp-1">{video.title}</div>
                <div className="text-xs text-text-muted mt-0.5">{video.creator} · {video.duration}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent font-bold shrink-0">
                <Star size={10} fill="currentColor" /> {video.relevanceScore}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Tutor hint ── */}
      <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-700/20 rounded-xl p-4">
        <Zap size={16} className="text-purple-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-text-primary mb-1">Ask SkillAtlas AI</div>
          <p className="text-xs text-text-muted italic">
            "array index yen 0 la start aguthu?" — Type naturally in {language} and get instant explanations!
          </p>
          <button
            onClick={() => navigate('/ai-tutor')}
            className="btn-primary mt-3 text-xs py-1.5"
          >
            Open AI Tutor <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── VIDEOS TAB ────────────────────────────────────────────────────────────────
function VideosTab({ topic, language }) {
  const [diffFilter, setDiffFilter] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Best Match');

  const langVideos = mockVideos.filter(v => {
    if (v.language !== language) return false;
    if (diffFilter !== 'All' && v.difficulty !== diffFilter) return false;
    if (durationFilter === 'Under 10 min') {
      const mins = parseInt(v.duration.split(':')[0]);
      if (mins >= 10) return false;
    }
    if (durationFilter === '10–30 min') {
      const mins = parseInt(v.duration.split(':')[0]);
      if (mins < 10 || mins >= 60) return false;
    }
    if (durationFilter === 'Full Course') {
      const parts = v.duration.split(':');
      if (parts.length < 3 && parseInt(parts[0]) < 60) return false;
    }
    return true;
  });

  const otherVideos = mockVideos.filter(v => v.language !== language);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-text-primary mb-1">
          Best {language} Videos for {topic}
        </h2>
        <p className="text-sm text-text-muted">
          {langVideos.length} {language} videos · {otherVideos.length} global · Ranked by relevance score
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 bg-bg-elevated border border-border rounded-lg p-1">
          {DIFFICULTY_LEVELS.map(d => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                diffFilter === d ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {DURATION_FILTERS.filter(f => f !== 'All').map(d => (
            <button
              key={d}
              onClick={() => setDurationFilter(durationFilter === d ? 'All' : d)}
              className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-all ${
                durationFilter === d
                  ? 'bg-accent/10 border-accent/50 text-accent'
                  : 'border-border text-text-secondary hover:border-accent/30'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="ml-auto bg-bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary focus:outline-none focus:border-accent"
        >
          {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Videos by category */}
      {VIDEO_CATEGORIES.map(cat => {
        const catVideos = langVideos.filter(v => v.category === cat);
        if (!catVideos.length) return null;
        return (
          <div key={cat}>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-text-secondary mb-3">
              <span className="w-1 h-4 bg-accent rounded-full" />
              {cat}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catVideos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Global videos */}
      {otherVideos.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-text-muted whitespace-nowrap">Best Global Resources</span>
            <div className="flex-1 border-t border-border" />
          </div>
          <div className="bg-bg-elevated border border-border rounded-xl p-4 mb-4 flex items-start gap-3">
            <Globe size={14} className="text-accent mt-0.5 shrink-0" />
            <p className="text-xs text-text-muted leading-relaxed">
              Native {language} resource unavailable? See best global resource below.{' '}
              <span className="text-accent font-medium">Use "Explain in {language}" in AI Tutor</span> to get help.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherVideos.slice(0, 3).map((video, i) => (
              <VideoCard key={video.id} video={video} index={i + 5} />
            ))}
          </div>
        </div>
      )}

      <button className="w-full py-3 border border-border rounded-xl text-sm text-text-secondary hover:border-accent/30 hover:text-accent transition-all">
        View Top 50 Videos →
      </button>
    </div>
  );
}

// ─── WEBSITES TAB ──────────────────────────────────────────────────────────────
function WebsitesTab({ topic }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-lg font-bold text-text-primary mb-1">Trusted Resources for {topic}</h2>
        <p className="text-sm text-text-muted">
          {mockResources.length} curated resources · <ShieldCheck size={12} className="inline text-accent" /> Verified & trusted
        </p>
      </div>
      {RESOURCE_SECTIONS.map(section => {
        const sectionResources = mockResources.filter(r => r.section === section);
        if (!sectionResources.length) return null;
        return (
          <div key={section}>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-text-secondary mb-3">
              <span className="w-1 h-4 bg-accent rounded-full" />
              {section}
            </h3>
            <div className="space-y-3">
              {sectionResources.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── DOCUMENTATION TAB ────────────────────────────────────────────────────────
function DocumentationTab({ topic, language }) {
  const docs = mockResources.filter(r => r.type === 'Official Documentation' || r.type === 'Reference Article');
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-lg font-bold text-text-primary mb-1">Documentation for {topic}</h2>
        <p className="text-sm text-text-muted">Official sources and high-quality reference guides</p>
      </div>
      <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-xl p-4">
        <Zap size={14} className="text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-text-muted">
          Documentation is in English.{' '}
          <span className="text-accent font-medium">Ask AI Tutor</span> to explain any concept in {language}.
        </p>
      </div>
      <div className="space-y-3">
        {docs.map(r => <ResourceCard key={r.id} resource={r} />)}
      </div>
    </div>
  );
}

// ─── PRACTICE TAB ─────────────────────────────────────────────────────────────
function PracticeTab({ topic }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDiff, setActiveDiff] = useState('All');
  const [problems, setProblems] = useState(practiceProblems);

  const filtered = problems.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeDiff !== 'All' && p.difficulty !== activeDiff) return false;
    return true;
  });

  const solved = problems.filter(p => p.solved).length;

  const handleStart = (problem) => {
    setProblems(prev => prev.map(p =>
      p.id === problem.id ? { ...p, solved: true } : p
    ));
  };

  return (
    <div className="space-y-5 animate-slide-up">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-1">Practice: {topic}</h2>
          <p className="text-sm text-text-muted">{solved}/{problems.length} problems solved</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-bold text-accent">{solved}</div><div className="text-xs text-text-muted">Solved</div></div>
          <div><div className="text-xl font-bold text-text-primary">{problems.length}</div><div className="text-xs text-text-muted">Total</div></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {['All', ...PRACTICE_CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 border rounded-full text-xs font-medium transition-all ${
                activeCategory === cat ? 'bg-accent/10 border-accent/50 text-accent' : 'border-border text-text-secondary hover:border-accent/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-bg-elevated border border-border rounded-lg p-1">
          {['All', 'Easy', 'Medium', 'Hard'].map(d => (
            <button
              key={d}
              onClick={() => setActiveDiff(d)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeDiff === d ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(p => <PracticeCard key={p.id} problem={p} onStart={handleStart} />)}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-text-muted text-sm">No problems match this filter.</div>
        )}
      </div>
    </div>
  );
}

// ─── ROADMAP TAB ──────────────────────────────────────────────────────────────
function RoadmapTab({ navigate }) {
  return (
    <div className="space-y-5 animate-slide-up">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-1">Java Learning Roadmap</h2>
          <p className="text-sm text-text-muted">{roadmapProgress}% complete · 3 of 8 topics done</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold text-accent">{roadmapProgress}%</div>
          <div className="text-xs text-text-muted">Overall progress</div>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-xl p-4">
        <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-accent text-xs">📍</span>
        </div>
        <div>
          <div className="text-xs text-accent font-semibold mb-1">RECOMMENDED NEXT STEP</div>
          <p className="text-sm text-text-primary">
            Complete <strong>Array Traversal</strong> before starting Strings.
          </p>
          <button
            onClick={() => navigate('/roadmap')}
            className="btn-primary mt-3 text-xs py-1.5"
          >
            View Full Roadmap <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div>
        {javaRoadmap.map((step, i) => (
          <RoadmapStep key={step.id} step={step} isLast={i === javaRoadmap.length - 1} />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, setLanguage, level, setLevel } = usePreferences();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAI, setShowAI] = useState(false);
  const [newSearch, setNewSearch] = useState('');

  const query = searchParams.get('q') || 'Java Arrays';
  const urlLang = searchParams.get('lang');

  useEffect(() => {
    if (urlLang && LANGUAGES.includes(urlLang)) setLanguage(urlLang);
    setNewSearch(query);
  }, [urlLang, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (newSearch.trim()) {
      setSearchParams({ q: newSearch.trim(), lang: language });
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 animate-fade-in">

        {/* ── SEARCH CONTEXT BAR ── */}
        <div className="bg-bg-card border border-border rounded-xl p-3 mb-5">
          <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2">
            {/* Search input */}
            <div className="flex-1 min-w-48 flex items-center gap-2 bg-bg-elevated border border-border rounded-lg px-3 py-2 focus-within:border-accent transition-colors">
              <Search size={14} className="text-text-muted shrink-0" />
              <input
                value={newSearch}
                onChange={e => setNewSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none"
                placeholder="Search a topic or doubt..."
              />
            </div>

            {/* Language */}
            <select
              value={language}
              onChange={e => { setLanguage(e.target.value); setSearchParams({ q: query, lang: e.target.value }); }}
              className="bg-bg-elevated border border-border rounded-lg px-3 py-2 text-xs text-text-secondary focus:outline-none focus:border-accent"
            >
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>

            {/* Level */}
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="bg-bg-elevated border border-border rounded-lg px-3 py-2 text-xs text-text-secondary focus:outline-none focus:border-accent"
            >
              {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
            </select>

            <button type="submit" className="btn-primary text-xs py-2 px-4">Search</button>

            <button
              type="button"
              onClick={() => setShowAI(!showAI)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                showAI
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                  : 'bg-bg-elevated border-border text-text-secondary hover:border-accent/30 hover:text-accent'
              }`}
            >
              <Zap size={13} />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>

        {/* ── TABS ── */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-accent border-accent'
                    : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border'
                }`}
              >
                <tab.icon size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT + AI SIDE PANEL ── */}
        <div className={`${showAI ? 'flex gap-6' : ''}`}>
          <div className={showAI ? 'flex-1 min-w-0' : 'w-full'}>
            {activeTab === 'overview' && (
              <OverviewTab topic={query} language={language} level={level} setActiveTab={setActiveTab} navigate={navigate} />
            )}
            {activeTab === 'videos' && <VideosTab topic={query} language={language} />}
            {activeTab === 'websites' && <WebsitesTab topic={query} />}
            {activeTab === 'documentation' && <DocumentationTab topic={query} language={language} />}
            {activeTab === 'practice' && <PracticeTab topic={query} />}
            {activeTab === 'roadmap' && <RoadmapTab navigate={navigate} />}
          </div>

          {/* Sticky AI Panel (desktop) */}
          {showAI && (
            <div
              className="hidden lg:block w-80 shrink-0"
              style={{ position: 'sticky', top: '72px', height: 'calc(100vh - 88px)' }}
            >
              <ChatInterface topic={query} embedded />
            </div>
          )}
        </div>
      </div>

      {/* Mobile AI FAB */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <button
          onClick={() => navigate('/ai-tutor')}
          className="w-13 h-13 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg text-black hover:bg-accent-hover transition-colors"
          title="Ask AI Tutor"
        >
          <Zap size={20} fill="black" />
        </button>
      </div>
    </AppLayout>
  );
}
