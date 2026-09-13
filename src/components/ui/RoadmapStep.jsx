import { CheckCircle2, Circle, Clock, ChevronRight, Zap } from 'lucide-react';

const STATUS_CONFIG = {
  completed: {
    icon: CheckCircle2,
    iconColor: 'text-accent',
    lineColor: 'bg-accent',
    cardBg: 'bg-bg-card border-border',
    label: 'Completed',
    labelColor: 'text-accent bg-accent/10 border-accent/20',
  },
  current: {
    icon: Zap,
    iconColor: 'text-accent',
    lineColor: 'bg-accent',
    cardBg: 'bg-bg-card border-accent/40',
    label: 'In Progress',
    labelColor: 'text-accent bg-accent/10 border-accent/20',
  },
  upcoming: {
    icon: Circle,
    iconColor: 'text-text-muted',
    lineColor: 'bg-border',
    cardBg: 'bg-bg-card border-border opacity-60',
    label: 'Upcoming',
    labelColor: 'text-text-muted bg-bg-elevated border-border',
  },
};

export default function RoadmapStep({ step, isLast = false }) {
  const config = STATUS_CONFIG[step.status] || STATUS_CONFIG.upcoming;
  const Icon = config.icon;

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
          step.status === 'completed' ? 'bg-accent/15 border-accent' :
          step.status === 'current' ? 'bg-accent/10 border-accent' :
          'bg-bg-elevated border-border'
        }`}>
          <Icon size={15} className={config.iconColor} />
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-1 ${config.lineColor} min-h-[32px]`} />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 mb-4 border rounded-xl p-4 transition-all ${config.cardBg} ${
        step.status === 'current' ? 'shadow-card-hover' : ''
      }`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{step.title}</h3>
            <p className="text-xs text-text-muted mt-0.5">{step.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`badge border text-[10px] ${config.labelColor}`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Progress bar for current */}
        {step.status === 'current' && step.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Progress</span>
              <span className="text-accent font-medium">{step.progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${step.progress}%` }} />
            </div>
          </div>
        )}

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {step.topics.map(topic => (
            <span key={topic} className="tag text-[10px]">{topic}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock size={11} /> {step.estimatedTime}
          </span>
          {step.status !== 'upcoming' && (
            <button className="flex items-center gap-1 text-xs text-accent font-medium hover:text-accent-hover transition-colors">
              {step.status === 'current' ? 'Continue' : 'Review'} <ChevronRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
