import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Globe, ChevronDown, User, Bell, Menu, X, Zap
} from 'lucide-react';
import { LANGUAGES } from '../../data/mockVideos';
import { usePreferences } from '../../hooks/useLocalStorage';

export default function Navbar({ onSearch, minimal = false }) {
  const navigate = useNavigate();
  const { language, setLanguage } = usePreferences();
  const [query, setQuery] = useState('');
  const [showLang, setShowLang] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}&lang=${language}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 h-14">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-black" fill="black" />
            </div>
            <span className="font-bold text-text-primary text-base hidden sm:block">
              Skill<span className="text-accent">Atlas</span>
            </span>
          </Link>

          {/* Search */}
          {!minimal && (
            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-2">
              <div className="relative flex items-center">
                <Search size={15} className="absolute left-3 text-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search any topic..."
                  className="w-full bg-bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </form>
          )}

          <div className="ml-auto flex items-center gap-2">
            {/* Language selector */}
            {!minimal && (
              <div className="relative">
                <button
                  onClick={() => setShowLang(!showLang)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-card border border-border rounded-lg text-sm text-text-secondary hover:border-accent hover:text-accent transition-all"
                >
                  <Globe size={13} />
                  <span className="hidden sm:inline">{language}</span>
                  <ChevronDown size={12} />
                </button>
                {showLang && (
                  <div className="absolute right-0 top-full mt-1 bg-bg-card border border-border rounded-xl shadow-card w-36 py-1 z-50 animate-fade-in">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setShowLang(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-elevated transition-colors ${
                          lang === language ? 'text-accent font-medium' : 'text-text-secondary'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
              <Bell size={15} />
            </button>

            <Link to="/dashboard" className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/20 transition-all">
              <User size={15} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-secondary"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="lg:hidden border-t border-border bg-bg-secondary px-4 py-3 space-y-2 animate-slide-up">
          {!minimal && (
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search any topic..."
                  className="w-full bg-bg-card border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
                />
              </div>
            </form>
          )}
          <div className="grid grid-cols-5 gap-1">
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMobileMenu(false); }}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  lang === language
                    ? 'bg-accent text-black'
                    : 'bg-bg-card border border-border text-text-secondary'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
