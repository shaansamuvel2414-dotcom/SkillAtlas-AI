import AppLayout from '../components/layout/AppLayout';
import RoadmapStep from '../components/ui/RoadmapStep';
import { javaRoadmap, roadmapProgress, roadmapCompletedCount, roadmapTotalCount } from '../data/mockRoadmap';
import { ArrowRight, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RoadmapPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Map size={18} className="text-accent" />
            <h1 className="text-2xl font-bold text-text-primary">Learning Roadmap</h1>
          </div>
          <p className="text-sm text-text-muted">Java Programming · Tamil · Beginner</p>
        </div>

        {/* Progress summary */}
        <div className="bg-bg-card border border-border rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-text-muted">Overall Progress</div>
              <div className="text-3xl font-extrabold text-accent mt-0.5">{roadmapProgress}%</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-text-muted">{roadmapCompletedCount} / {roadmapTotalCount}</div>
              <div className="text-xs text-text-muted">Topics done</div>
            </div>
          </div>
          <div className="progress-bar h-3">
            <div className="progress-fill h-3" style={{ width: `${roadmapProgress}%` }} />
          </div>

          <div className="mt-4 p-3 bg-bg-elevated border border-accent/20 rounded-lg">
            <div className="text-xs text-accent font-medium mb-1">📍 RECOMMENDED NEXT STEP</div>
            <p className="text-sm text-text-primary">
              Complete <strong>Array Traversal</strong> before starting Strings.
            </p>
          </div>

          <button
            onClick={() => navigate('/search?q=Java+Arrays&lang=Tamil')}
            className="btn-primary mt-4 text-sm"
          >
            Continue Learning <ArrowRight size={14} />
          </button>
        </div>

        {/* Roadmap steps */}
        <div>
          {javaRoadmap.map((step, i) => (
            <RoadmapStep key={step.id} step={step} isLast={i === javaRoadmap.length - 1} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
