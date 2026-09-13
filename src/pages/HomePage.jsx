import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, ChevronDown, ArrowRight, Zap, Check, Play } from 'lucide-react';
import { LANGUAGES } from '../data/mockVideos';
import { popularSearches } from '../data/mockTopics';
import { usePreferences } from '../hooks/useLocalStorage';

const HOW_IT_WORKS = [
  { icon: '🔍', label: 'Search' },
  { icon: '🌏', label: 'Choose Language' },
  { icon: '🎥', label: 'Discover' },
  { icon: '📚', label: 'Learn' },
  { icon: '💪', label: 'Practice' },
  { icon: '🤖', label: 'Ask AI' },
  { icon: '📈', label: 'Track Progress' },
];

const FEATURES = [
  { icon: '🎥', title: 'Best Videos in Your Language', desc: 'Ranked, curated videos in Tamil, English, Hindi, Malayalam, and Telugu. No more irrelevant search results.', color: 'from-blue-900/20' },
  { icon: '🌐', title: 'Trusted Websites & Docs', desc: 'GeeksforGeeks, W3Schools, official documentation — curated, verified and organized. All in one place.', color: 'from-purple-900/20' },
  { icon: '🗺️', title: 'Smart Learning Roadmap', desc: 'Personalized step-by-step path from beginner to advanced. Always know what to learn next.', color: 'from-emerald-900/20' },
  { icon: '💪', title: 'Practice & Projects', desc: 'Quizzes, coding problems, mini projects. Reinforce what you learn with hands-on practice.', color: 'from-orange-900/20' },
  { icon: '🤖', title: 'AI Tutor in Tamil', desc: '"Puriyala. Simple ah explain pannu." — Ask doubts in your language. Get instant, contextual help.', color: 'from-pink-900/20' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Track topics, videos watched, practice streak. Visualize your learning journey clearly.', color: 'from-cyan-900/20' },
];

const BEFORE_AFTER = [
  { before: 'Search YouTube for Tamil Java videos separately', after: 'Get ranked Tamil videos instantly' },
  { before: 'Google for beginner tutorials one by one', after: 'See trusted websites in one organized view' },
  { before: 'Navigate multiple documentation sites', after: 'Official docs linked and curated for you' },
  { before: 'Find practice problems on LeetCode separately', after: 'Topic-specific practice built right in' },
  { before: 'Ask doubts on Stack Overflow or ChatGPT', after: 'AI Tutor in Tamil, answers in seconds' },
  { before: 'No clear idea what to learn next', after: 'Clear personalized roadmap always ready' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { language, setLanguage } = usePreferences();
  const [query, setQuery] = useState('');
  const [showLang, setShowLang] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}&lang=${language}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-black" fill="black" />
            </div>
            <span className="font-extrabold text-base tracking-tight">
              Skill<span className="text-accent">Atlas</span> AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/onboarding')}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 px-4 py-2 bg-accent text-black text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              Start Learning <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-accent/4 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 pt-20 pb-14 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/25 rounded-full text-accent text-xs font-semibold mb-6 tracking-wide">
            <Globe size={12} />
            LEARNING IN OUR NATIVE LANGUAGE
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-[1.1] mb-5 tracking-tight">
            One Search.<br />
            <span className="text-gradient">A Smarter Learning Journey.</span>
          </h1>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the best videos, trusted websites, documentation, practice resources,
            and AI-powered doubt support — all in one place, in the language you understand best.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-4">
            <div className="flex items-center gap-2 bg-bg-card border border-border rounded-xl p-2 shadow-card focus-within:border-accent/40 transition-colors">
              <Search size={16} className="text-text-muted ml-2 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="What do you want to learn today?"
                className="flex-1 bg-transparent text-text-primary text-sm placeholder-text-muted focus:outline-none py-1.5"
              />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLang(!showLang)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-bg-elevated border border-border rounded-lg text-xs text-text-secondary hover:border-accent/30 hover:text-accent transition-all"
                >
                  <Globe size={12} /> {language} <ChevronDown size={11} />
                </button>
                {showLang && (
                  <div className="absolute right-0 top-full mt-1 bg-bg-card border border-border rounded-xl shadow-card-hover w-36 py-1 z-50 animate-fade-in">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => { setLanguage(lang); setShowLang(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-elevated transition-colors flex items-center justify-between ${
                          lang === language ? 'text-accent font-medium' : 'text-text-secondary'
                        }`}
                      >
                        {lang}
                        {lang === language && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm whitespace-nowrap">
                Search <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="text-xs text-text-muted self-center">Try:</span>
            {popularSearches.slice(0, 6).map(s => (
              <button
                key={s}
                onClick={() => { setQuery(s); navigate(`/search?q=${encodeURIComponent(s)}&lang=${language}`); }}
                className="px-3 py-1 bg-bg-elevated border border-border rounded-full text-xs text-text-secondary hover:border-accent/40 hover:text-accent transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-7 py-3 bg-accent text-black font-bold rounded-xl hover:bg-accent-hover transition-colors"
            >
              Start Learning <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="flex items-center gap-2 px-7 py-3 border border-border text-text-secondary rounded-xl hover:border-accent/30 hover:text-text-primary transition-all"
            >
              Explore Skills
            </button>
          </div>
        </div>
      </section>

      {/* ── APP PREVIEW ── */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          <div className="bg-bg-elevated border-b border-border px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 mx-4 bg-bg-primary/60 border border-border rounded px-3 py-1 text-[11px] text-text-muted text-center">
              app.skillatlas.ai · Java Arrays · Tamil · Beginner
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1.5 bg-bg-elevated border border-border rounded-lg text-sm font-bold text-accent">Java Arrays</span>
              <span className="px-3 py-1.5 bg-bg-elevated border border-border rounded-lg text-sm text-text-secondary">Tamil</span>
              <span className="badge-green text-xs self-center">Beginner</span>
            </div>
            <div className="flex gap-3 border-b border-border mb-4 overflow-x-auto no-scrollbar">
              {['Overview', 'Videos', 'Websites', 'Docs', 'Practice', 'Roadmap'].map((t, i) => (
                <span key={t} className={`pb-2.5 text-xs font-medium whitespace-nowrap border-b-2 ${
                  i === 0 ? 'text-accent border-accent' : 'text-text-muted border-transparent'
                }`}>{t}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: '🎥', label: 'Best Tamil Videos', count: '10 Ranked Videos', g: 'from-blue-900/30' },
                { icon: '🌐', label: 'Trusted Websites', count: '8 Resources', g: 'from-purple-900/30' },
                { icon: '📖', label: 'Documentation', count: 'Oracle + Baeldung', g: 'from-emerald-900/30' },
                { icon: '💪', label: 'Practice Problems', count: '8 Problems', g: 'from-orange-900/30' },
                { icon: '🗺️', label: 'Learning Roadmap', count: '65% Progress', g: 'from-cyan-900/30' },
                { icon: '🤖', label: 'AI Tutor', count: 'Tamil Support', g: 'from-pink-900/30' },
              ].map(c => (
                <div key={c.label} className={`bg-gradient-to-br ${c.g} to-transparent border border-border rounded-xl p-3`}>
                  <div className="text-lg mb-1">{c.icon}</div>
                  <div className="text-xs font-bold text-text-primary">{c.label}</div>
                  <div className="text-[10px] text-text-muted mt-0.5">{c.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 border-t border-border">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-3">The Problem Students Face Today</h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Learners spend more time searching than actually learning. SkillAtlas AI fixes this.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {[
            { p: 'YouTube', prob: 'Too many irrelevant videos', icon: '📺' },
            { p: 'Google', prob: 'Scattered, unorganized results', icon: '🔍' },
            { p: 'Course Platforms', prob: 'Only their own paid content', icon: '📚' },
            { p: 'Documentation', prob: 'Too technical, no guidance', icon: '📖' },
            { p: 'AI Chatbots', prob: 'Text only, no curated resources', icon: '🤖' },
            { p: 'Practice Sites', prob: 'Separate from your learning path', icon: '💻' },
          ].map(item => (
            <div key={item.p} className="bg-bg-card border border-border rounded-xl p-4 flex gap-3">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <div className="text-sm font-semibold text-text-primary mb-1">{item.p}</div>
                <p className="text-xs text-text-muted leading-relaxed">{item.prob}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="inline-block bg-accent/8 border border-accent/25 rounded-2xl px-10 py-6">
            <div className="text-accent text-sm font-bold mb-1 tracking-wide">SKILLATLAS AI</div>
            <div className="text-text-primary text-lg font-bold">ONE complete learning journey</div>
            <div className="text-text-muted text-sm mt-1.5">All of the above · Organized · In your language</div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-2">How SkillAtlas Works</h2>
          <p className="text-text-muted text-sm">Seven steps to smarter learning</p>
        </div>
        <div className="flex flex-wrap justify-center items-start gap-2 sm:gap-0">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-bg-card border border-border rounded-xl flex items-center justify-center text-xl mb-2 hover:border-accent/30 transition-colors">
                  {step.icon}
                </div>
                <div className="text-[11px] font-semibold text-text-primary text-center w-16">{step.label}</div>
              </div>
              {i < HOW_IT_WORKS.length - 1 && (
                <ArrowRight size={14} className="text-accent/30 mb-5 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Everything in One Place</h2>
          <p className="text-text-muted text-sm">Built for students who want to learn, not just search.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className={`bg-gradient-to-br ${f.color} to-bg-card border border-border rounded-xl p-5 hover:border-border-strong/20 transition-all`}>
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-sm font-bold text-text-primary mb-2">{f.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MULTILINGUAL ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 border-t border-border">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-semibold mb-4 tracking-wide">
            🌏 Multilingual First
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            "LEARNING IN OUR NATIVE LANGUAGE"
          </h2>
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Type naturally in Tamil, Hindi, Malayalam, or Telugu mixed with English technical terms.
            SkillAtlas AI understands you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="text-xs text-text-muted font-semibold tracking-wide mb-4">NATURAL LANGUAGE SEARCHES</div>
            <div className="space-y-3">
              {[
                'array index yen 0 la start aguthu?',
                'for loop use panni array input epdi edukurathu?',
                'inheritance simple ah explain pannu',
                'SQL JOIN enna difference irukku?',
              ].map(ex => (
                <div key={ex} className="flex items-start gap-2 p-2.5 bg-bg-elevated border border-border rounded-lg">
                  <Search size={12} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-xs text-text-secondary italic">"{ex}"</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-accent/80 mt-4 font-semibold text-center">
              "Type naturally. Learn comfortably." ✨
            </p>
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="text-xs text-text-muted font-semibold tracking-wide mb-4">SUPPORTED LANGUAGES</div>
            <div className="space-y-3">
              {[
                { lang: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', badge: 'Primary', badgeClass: 'badge-green' },
                { lang: 'English', native: 'English', flag: '🇬🇧', badge: 'Full Support', badgeClass: 'badge-gray' },
                { lang: 'Hindi', native: 'हिंदी', flag: '🇮🇳', badge: 'Supported', badgeClass: 'badge-gray' },
                { lang: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', badge: 'Supported', badgeClass: 'badge-gray' },
                { lang: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', badge: 'Supported', badgeClass: 'badge-gray' },
              ].map(l => (
                <div key={l.lang} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <span>{l.flag}</span>
                    <div>
                      <span className="text-sm text-text-primary font-medium">{l.lang}</span>
                      <span className="text-xs text-text-muted ml-2">{l.native}</span>
                    </div>
                  </div>
                  <span className={`${l.badgeClass} text-[10px]`}>{l.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE VS AFTER ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Before vs After SkillAtlas</h2>
          <p className="text-text-muted text-sm">See the difference a single platform makes</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-bg-card border border-red-900/20 rounded-xl p-5">
            <div className="text-xs font-bold text-red-400/80 tracking-wide mb-4">WITHOUT SKILLATLAS</div>
            <div className="space-y-3">
              {BEFORE_AFTER.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-red-400/50 text-sm mt-0.5 shrink-0">✗</span>
                  <span className="text-xs text-text-muted leading-relaxed">{item.before}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
            <div className="text-xs font-bold text-accent tracking-wide mb-4">WITH SKILLATLAS AI</div>
            <div className="space-y-3">
              {BEFORE_AFTER.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check size={13} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-xs text-text-primary leading-relaxed">{item.after}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 border-t border-border">
        <div className="bg-gradient-to-br from-accent/10 via-bg-card to-bg-card border border-accent/20 rounded-2xl px-8 py-12 text-center">
          <div className="text-3xl font-extrabold text-text-primary mb-3 tracking-tight">
            Ready to Learn Smarter?
          </div>
          <p className="text-text-muted text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Search any topic. Choose your language. Get the best videos, resources, roadmap, and AI support — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate('/onboarding')}
              className="flex items-center gap-2 px-8 py-3.5 bg-accent text-black font-bold rounded-xl hover:bg-accent-hover transition-colors"
            >
              Get Started Free <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="flex items-center gap-2 px-8 py-3.5 border border-border text-text-secondary rounded-xl hover:border-accent/30 hover:text-text-primary transition-all"
            >
              Explore Skills
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center">
              <Zap size={12} className="text-black" fill="black" />
            </div>
            <span className="font-extrabold text-sm tracking-tight">
              Skill<span className="text-accent">Atlas</span> AI
            </span>
          </div>
          <p className="text-xs text-text-muted text-center">
            "LEARNING IN OUR NATIVE LANGUAGE" · Prototype v1.0 · Mock data for demonstration
          </p>
          <p className="text-xs text-text-muted">© 2025 SkillAtlas AI</p>
        </div>
      </footer>
    </div>
  );
}
