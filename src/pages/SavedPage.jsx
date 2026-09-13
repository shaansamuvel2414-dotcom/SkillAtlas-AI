import { useState } from 'react';
import { Bookmark, Play, BookOpen, Code2, Globe, Trash2 } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { useSavedResources } from '../hooks/useLocalStorage';

const TABS = ['All', 'Videos', 'Websites', 'Documentation', 'Practice'];

const TYPE_ICON = {
  video: Play,
  website: Globe,
  'Official Documentation': BookOpen,
  'Tutorial': BookOpen,
  'Practice Platform': Code2,
  'Reference Article': BookOpen,
};

export default function SavedPage() {
  const { saved, removeResource } = useSavedResources();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = saved.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Videos') return item.resourceType === 'video';
    if (activeTab === 'Websites') return item.type === 'Tutorial' || item.section === 'Trusted Websites' || item.section === 'Beginner Tutorials';
    if (activeTab === 'Documentation') return item.type === 'Official Documentation' || item.type === 'Reference Article';
    if (activeTab === 'Practice') return item.resourceType === 'practice';
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Bookmark size={18} className="text-accent" />
            <h1 className="text-2xl font-bold text-text-primary">Saved Resources</h1>
          </div>
          <p className="text-sm text-text-muted">{saved.length} saved items</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-secondary border border-border hover:border-accent/30 hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Items */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark size={40} className="text-text-muted mx-auto mb-4" />
            <div className="text-text-muted text-sm">
              {activeTab === 'All'
                ? 'No saved items yet. Save videos and resources while learning!'
                : `No saved ${activeTab.toLowerCase()} yet.`}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(item => {
              const IconComp = TYPE_ICON[item.resourceType] || TYPE_ICON[item.type] || BookOpen;

              return (
                <div key={item.id} className="card flex items-start gap-4 hover:border-accent/20 transition-all">
                  <div className="w-10 h-10 bg-bg-elevated border border-border rounded-xl flex items-center justify-center shrink-0">
                    {item.icon ? (
                      <span className="text-lg">{item.icon}</span>
                    ) : (
                      <IconComp size={16} className="text-accent" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary line-clamp-1">
                      {item.title || item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {item.topic && <span className="tag text-[10px]">{item.topic}</span>}
                      {item.language && <span className="text-[10px] text-text-muted">{item.language}</span>}
                      {(item.type || item.resourceType) && (
                        <span className="text-[10px] text-text-muted capitalize">
                          {item.type || item.resourceType}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <a
                      href={item.url || '#'}
                      onClick={e => e.preventDefault()}
                      className="px-3 py-1.5 bg-bg-elevated border border-border rounded-lg text-xs text-text-secondary hover:border-accent/30 hover:text-accent transition-all"
                    >
                      Open
                    </a>
                    <button
                      onClick={() => removeResource(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:border-red-500/30 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
