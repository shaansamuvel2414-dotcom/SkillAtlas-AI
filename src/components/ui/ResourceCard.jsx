import { ExternalLink, Bookmark, BookmarkCheck, ShieldCheck, Globe } from 'lucide-react';
import { useSavedResources } from '../../hooks/useLocalStorage';

const DIFFICULTY_COLORS = {
  Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Advanced: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  Mixed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
};

const TYPE_COLORS = {
  'Official Documentation': 'text-accent bg-accent/10 border-accent/20',
  'Tutorial': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Practice Platform': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'Reference Article': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
};

export default function ResourceCard({ resource }) {
  const { isSaved, saveResource, removeResource } = useSavedResources();
  const saved = isSaved(resource.id);

  const handleSave = (e) => {
    e.stopPropagation();
    if (saved) removeResource(resource.id);
    else saveResource({ ...resource, resourceType: 'website' });
  };

  return (
    <div className="card group hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 animate-fade-in">
      <div className="flex gap-3">
        {/* Icon */}
        <div className="w-10 h-10 bg-bg-elevated border border-border rounded-lg flex items-center justify-center text-lg shrink-0">
          {resource.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-text-muted font-medium">{resource.name}</span>
                {resource.verified && (
                  <span className="flex items-center gap-0.5 text-accent text-[10px] font-medium">
                    <ShieldCheck size={10} /> Verified
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-1">
                {resource.title}
              </h3>
            </div>
            <button
              onClick={handleSave}
              className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border transition-all ${
                saved
                  ? 'bg-accent/15 border-accent/30 text-accent'
                  : 'bg-bg-elevated border-border text-text-muted hover:border-accent/30 hover:text-accent'
              }`}
            >
              {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            </button>
          </div>

          <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className={`badge border text-[10px] ${DIFFICULTY_COLORS[resource.difficulty] || 'badge-gray'}`}>
              {resource.difficulty}
            </span>
            <span className={`badge border text-[10px] ${TYPE_COLORS[resource.type] || 'badge-gray'}`}>
              {resource.type}
            </span>
            <span className="flex items-center gap-0.5 text-[10px] text-text-muted">
              <Globe size={9} /> {resource.language}
            </span>
          </div>

          <div className="mt-3">
            <a
              href={resource.url}
              onClick={e => e.preventDefault()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated border border-border text-text-primary text-xs font-medium rounded-lg hover:border-accent/30 hover:text-accent transition-all"
            >
              <ExternalLink size={11} /> Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
