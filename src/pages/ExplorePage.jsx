import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { topicCategories } from '../data/mockTopics';
import { usePreferences } from '../hooks/useLocalStorage';

const COLOR_MAP = {
  blue: 'from-blue-900/40 border-blue-700/20 text-blue-400',
  orange: 'from-orange-900/40 border-orange-700/20 text-orange-400',
  purple: 'from-purple-900/40 border-purple-700/20 text-purple-400',
  pink: 'from-pink-900/40 border-pink-700/20 text-pink-400',
  cyan: 'from-cyan-900/40 border-cyan-700/20 text-cyan-400',
  yellow: 'from-yellow-900/40 border-yellow-700/20 text-yellow-400',
  teal: 'from-teal-900/40 border-teal-700/20 text-teal-400',
};

export default function ExplorePage() {
  const navigate = useNavigate();
  const { language } = usePreferences();
  const [searchQ, setSearchQ] = useState('');
  const [expandedCat, setExpandedCat] = useState(null);

  const filtered = topicCategories.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s =>
      searchQ === '' ||
      s.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQ.toLowerCase())
    ),
  })).filter(cat => searchQ === '' || cat.skills.length > 0);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Explore Skills</h1>
          <p className="text-sm text-text-muted">
            Browse any topic. Search and start learning instantly in {language}.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="Search any topic or skill..."
            className="w-full bg-bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {filtered.map(category => {
            const colors = COLOR_MAP[category.color] || COLOR_MAP.blue;
            const isExpanded = expandedCat === category.id || searchQ !== '';
            const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, 4);

            return (
              <div key={category.id}>
                {/* Category header */}
                <button
                  className="flex items-center gap-3 mb-3 w-full text-left group"
                  onClick={() => setExpandedCat(expandedCat === category.id ? null : category.id)}
                >
                  <div className={`w-9 h-9 bg-gradient-to-br ${colors.split(' ')[0]} to-bg-card border rounded-xl flex items-center justify-center text-lg`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-xs text-text-muted">{category.skills.length} skills</p>
                  </div>
                  {searchQ === '' && (
                    isExpanded
                      ? <ChevronUp size={16} className="text-text-muted" />
                      : <ChevronDown size={16} className="text-text-muted" />
                  )}
                </button>

                {/* Skills grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {visibleSkills.map(skill => (
                    <button
                      key={skill.id}
                      onClick={() => navigate(`/search?q=${encodeURIComponent(skill.name)}&lang=${language}`)}
                      className="bg-bg-card border border-border rounded-xl p-4 text-left hover:border-accent/30 hover:shadow-card-hover transition-all group cursor-pointer"
                    >
                      <div className="text-2xl mb-2">{skill.icon}</div>
                      <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {skill.name}
                      </div>
                      <div className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                        {skill.description}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-accent mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowRight size={11} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Show more */}
                {!isExpanded && category.skills.length > 4 && searchQ === '' && (
                  <button
                    onClick={() => setExpandedCat(category.id)}
                    className="mt-3 text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-1"
                  >
                    +{category.skills.length - 4} more <ChevronDown size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
