import { Play, Bookmark, BookmarkCheck, Star, Clock, Globe, ChevronRight } from 'lucide-react';
import { useSavedResources } from '../../hooks/useLocalStorage';

const DIFFICULTY_COLORS = {
  Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Advanced: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
};

const LANGUAGE_FLAGS = {
  Tamil: '🇮🇳',
  English: '🇬🇧',
  Hindi: '🇮🇳',
  Malayalam: '🇮🇳',
  Telugu: '🇮🇳',
};

// Gradient thumbnails by creator initial
const THUMBNAIL_GRADIENTS = [
  'from-emerald-900 to-teal-900',
  'from-blue-900 to-indigo-900',
  'from-purple-900 to-violet-900',
  'from-orange-900 to-amber-900',
  'from-rose-900 to-pink-900',
  'from-cyan-900 to-sky-900',
];

export default function VideoCard({ video, index = 0 }) {
  const { isSaved, saveResource, removeResource } = useSavedResources();
  const saved = isSaved(video.id);
  const gradient = THUMBNAIL_GRADIENTS[index % THUMBNAIL_GRADIENTS.length];
  const initials = video.creator.split(' ').map(w => w[0]).join('').slice(0, 2);

  const handleSave = (e) => {
    e.stopPropagation();
    if (saved) removeResource(video.id);
    else saveResource({ ...video, resourceType: 'video' });
  };

  return (
    <div className="card group hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer animate-fade-in">
      {/* Thumbnail */}
      <div className={`relative bg-gradient-to-br ${gradient} rounded-lg mb-3 overflow-hidden`} style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white/30 mb-1">{initials}</div>
            <div className="text-xs text-white/20">{video.creator}</div>
          </div>
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-accent">
            <Play size={18} className="text-black ml-1" fill="black" />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white font-medium">
          {video.duration}
        </div>
        {/* Relevance */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-accent/90 px-2 py-0.5 rounded text-xs text-black font-bold">
          <Star size={10} fill="black" />
          {video.relevanceScore}%
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-text-muted line-clamp-1">{video.creator}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`badge border text-xs ${DIFFICULTY_COLORS[video.difficulty] || 'text-text-muted'}`}>
            {video.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            {LANGUAGE_FLAGS[video.language]} {video.language}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted ml-auto">
            <Clock size={10} /> {video.duration}
          </span>
        </div>

        <div className="text-xs text-text-muted">{video.views} views</div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <a
            href={video.url}
            onClick={e => e.preventDefault()}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-accent text-black text-xs font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            <Play size={12} fill="black" /> Watch
          </a>
          <button
            onClick={handleSave}
            className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${
              saved
                ? 'bg-accent/15 border-accent/30 text-accent'
                : 'bg-bg-elevated border-border text-text-muted hover:border-accent/30 hover:text-accent'
            }`}
          >
            {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
