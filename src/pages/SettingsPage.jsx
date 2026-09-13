import { Globe, Bell, Moon, Trash2, ChevronRight } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { usePreferences } from '../hooks/useLocalStorage';
import { LANGUAGES } from '../data/mockVideos';

export default function SettingsPage() {
  const { language, setLanguage, level, setLevel, setOnboardingDone } = usePreferences();

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-sm text-text-muted">Customize your learning experience</p>
        </div>

        <div className="space-y-4">
          {/* Language */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} className="text-accent" />
              <h2 className="text-sm font-semibold text-text-primary">Preferred Language</h2>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
                    language === lang
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-bg-elevated border-border text-text-secondary hover:border-accent/30'
                  }`}
                >
                  {lang}
                  {language === lang && <span className="text-accent">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">📚</span>
              <h2 className="text-sm font-semibold text-text-primary">Learning Level</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`py-2 rounded-lg border text-xs font-medium transition-all ${
                    level === l
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-bg-elevated border-border text-text-secondary hover:border-accent/30'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Misc */}
          <div className="bg-bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-text-primary mb-2">General</h2>
            {[
              { icon: Bell, label: 'Learning Reminders', value: 'Daily at 8 PM' },
              { icon: Moon, label: 'Theme', value: 'Dark (Default)' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <item.icon size={15} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted">{item.value}</span>
                  <ChevronRight size={14} className="text-text-muted" />
                </div>
              </div>
            ))}
          </div>

          {/* Reset */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-text-primary mb-3">Account</h2>
            <button
              onClick={() => { setOnboardingDone(false); window.location.href = '/onboarding'; }}
              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 size={15} /> Reset Onboarding & Preferences
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
