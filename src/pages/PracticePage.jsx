import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PracticeCard from '../components/ui/PracticeCard';
import { practiceProblems, PRACTICE_CATEGORIES, practiceStats } from '../data/mockPractice';
import { Code2, Flame, Target, CheckCircle2 } from 'lucide-react';

export default function PracticePage() {
  const [problems, setProblems] = useState(practiceProblems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDiff, setActiveDiff] = useState('All');

  const filtered = problems.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeDiff !== 'All' && p.difficulty !== activeDiff) return false;
    return true;
  });

  const stats = {
    attempted: problems.filter(p => p.solved).length,
    correct: problems.filter(p => p.solved).length,
    streak: practiceStats.streak,
  };

  const handleStart = (problem) => {
    setProblems(prev => prev.map(p =>
      p.id === problem.id ? { ...p, solved: true } : p
    ));
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Code2 size={18} className="text-accent" />
            <h1 className="text-2xl font-bold text-text-primary">Practice</h1>
          </div>
          <p className="text-sm text-text-muted">Java Arrays · Tamil · Beginner</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card text-center">
            <Target size={18} className="text-accent mx-auto" />
            <div className="text-2xl font-bold text-text-primary mt-1">{stats.attempted}</div>
            <div className="text-xs text-text-muted">Attempted</div>
          </div>
          <div className="stat-card text-center">
            <CheckCircle2 size={18} className="text-green-400 mx-auto" />
            <div className="text-2xl font-bold text-text-primary mt-1">{stats.correct}</div>
            <div className="text-xs text-text-muted">Correct</div>
          </div>
          <div className="stat-card text-center">
            <Flame size={18} className="text-orange-400 mx-auto" />
            <div className="text-2xl font-bold text-text-primary mt-1">{stats.streak}</div>
            <div className="text-xs text-text-muted">Day Streak</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {['All', ...PRACTICE_CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 border rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-accent/10 border-accent text-accent'
                    : 'border-border text-text-secondary hover:border-accent/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5 bg-bg-elevated border border-border rounded-lg p-1">
            {['All', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setActiveDiff(d)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  activeDiff === d ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Problems list */}
        <div className="space-y-3">
          {filtered.map(problem => (
            <PracticeCard key={problem.id} problem={problem} onStart={handleStart} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-muted text-sm">
              No problems found for this filter.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
