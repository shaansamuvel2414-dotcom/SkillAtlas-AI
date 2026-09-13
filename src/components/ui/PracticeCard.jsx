import { Clock, CheckCircle2, Circle, ChevronRight } from 'lucide-react';

const DIFFICULTY_CONFIG = {
  Easy: { color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', dot: 'bg-green-400' },
  Medium: { color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', dot: 'bg-yellow-400' },
  Hard: { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', dot: 'bg-red-400' },
};

export default function PracticeCard({ problem, onStart }) {
  const config = DIFFICULTY_CONFIG[problem.difficulty] || DIFFICULTY_CONFIG.Easy;

  return (
    <div
      className={`card group hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer ${
        problem.solved ? 'opacity-80' : ''
      }`}
      onClick={() => onStart?.(problem)}
    >
      <div className="flex items-start gap-3">
        {/* Status icon */}
        <div className="shrink-0 mt-0.5">
          {problem.solved
            ? <CheckCircle2 size={18} className="text-accent" />
            : <Circle size={18} className="text-text-muted group-hover:text-accent/60 transition-colors" />
          }
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-sm font-semibold leading-snug ${
              problem.solved ? 'text-text-secondary line-through' : 'text-text-primary group-hover:text-accent transition-colors'
            }`}>
              {problem.title}
            </h3>
            <span className={`badge border text-[10px] shrink-0 ${config.bg} ${config.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot} mr-1`} />
              {problem.difficulty}
            </span>
          </div>

          <p className="text-xs text-text-muted mt-1 line-clamp-1">{problem.description}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={11} /> {problem.estimatedTime}
              </span>
              <span className="tag text-[10px]">{problem.topic}</span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onStart?.(problem); }}
              className={`flex items-center gap-1 text-xs font-medium transition-all ${
                problem.solved
                  ? 'text-text-muted hover:text-text-secondary'
                  : 'text-accent hover:text-accent-hover'
              }`}
            >
              {problem.solved ? 'Review' : 'Start'} <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
