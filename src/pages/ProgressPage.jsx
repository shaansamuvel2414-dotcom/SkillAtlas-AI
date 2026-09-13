import AppLayout from '../components/layout/AppLayout';
import { useProgress } from '../hooks/useLocalStorage';
import { BarChart2, Flame, BookOpen, Play, Code2, Target, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-card border border-border rounded-lg px-3 py-2">
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-bold text-accent">{payload[0].value} sessions</p>
      </div>
    );
  }
  return null;
};

export default function ProgressPage() {
  const { progress } = useProgress();

  const chartData = DAYS.map((day, i) => ({
    day,
    sessions: progress.weeklyActivity[i],
  }));

  const STATS = [
    { icon: BookOpen, label: 'Topics Completed', value: progress.topicsCompleted, color: 'text-accent', bg: 'bg-accent/10' },
    { icon: Play, label: 'Videos Watched', value: progress.videosWatched, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Code2, label: 'Practice Solved', value: progress.practiceProblems, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: Flame, label: 'Day Streak', value: `${progress.streak}🔥`, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  const CURRENT_TOPICS = [
    { name: 'Java Arrays', progress: 65, status: 'In Progress' },
    { name: 'SQL Joins', progress: 40, status: 'In Progress' },
    { name: 'Git Basics', progress: 90, status: 'Almost Done' },
  ];

  const COMPLETED = ['Java Basics', 'Conditions', 'Loops'];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fade-in">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={18} className="text-accent" />
            <h1 className="text-2xl font-bold text-text-primary">Your Progress</h1>
          </div>
          <p className="text-sm text-text-muted">Learning streak and activity overview</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map(stat => (
            <div key={stat.label} className="stat-card">
              <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}>
                <stat.icon size={16} className={stat.color} />
              </div>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly activity */}
        <div className="bg-bg-card border border-border rounded-xl p-5">
          <h2 className="section-title mb-4">Weekly Activity</h2>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={20}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7a6b', fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(34,197,94,0.05)' }} />
                <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.sessions === Math.max(...chartData.map(d => d.sessions)) ? '#22c55e' : '#1a2a1a'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Topics */}
        <div className="bg-bg-card border border-border rounded-xl p-5">
          <h2 className="section-title mb-4">Current Topics</h2>
          <div className="space-y-4">
            {CURRENT_TOPICS.map(topic => (
              <div key={topic.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-text-primary font-medium">{topic.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">{topic.status}</span>
                    <span className="text-accent font-semibold">{topic.progress}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${topic.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Topics */}
        <div className="bg-bg-card border border-border rounded-xl p-5">
          <h2 className="section-title mb-4">Completed Topics</h2>
          <div className="flex flex-wrap gap-2">
            {COMPLETED.map(topic => (
              <div key={topic} className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent font-medium">
                <span className="w-4 h-4 bg-accent rounded-full flex items-center justify-center text-[10px] text-black font-bold">✓</span>
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* Overall progress */}
        <div className="bg-gradient-to-br from-accent/10 to-bg-card border border-accent/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-semibold text-text-primary">Overall Java Journey</div>
              <div className="text-xs text-text-muted">3 of 8 topics complete</div>
            </div>
            <div className="text-3xl font-extrabold text-accent">65%</div>
          </div>
          <div className="progress-bar h-3">
            <div className="progress-fill h-3" style={{ width: '65%' }} />
          </div>
          <p className="text-xs text-text-muted mt-3">
            📍 Next: Complete Arrays → Start Strings
          </p>
        </div>

      </div>
    </AppLayout>
  );
}
