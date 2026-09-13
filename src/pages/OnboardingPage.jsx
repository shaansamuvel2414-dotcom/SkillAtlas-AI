import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, Globe, Code, Layers, Cpu, Briefcase, BarChart, BookOpen, Sparkles, Check } from 'lucide-react';
import { usePreferences } from '../hooks/useLocalStorage';
import { LANGUAGES } from '../data/mockVideos';

const INTERESTS = [
  { id: 'programming', label: 'Programming', icon: '💻' },
  { id: 'webdev', label: 'Web Development', icon: '🌐' },
  { id: 'aidata', label: 'AI & Data', icon: '🤖' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'technology', label: 'Technology', icon: '⚡' },
  { id: 'professional', label: 'Professional Skills', icon: '💼' },
  { id: 'productivity', label: 'Productivity', icon: '📋' },
];

const LEVELS = [
  { id: 'Beginner', label: 'Beginner', desc: 'Just starting out', icon: '🌱' },
  { id: 'Intermediate', label: 'Intermediate', desc: 'Have some experience', icon: '🔥' },
  { id: 'Advanced', label: 'Advanced', desc: 'Deep expertise', icon: '⚡' },
];

const STEPS = [
  { title: 'Welcome', subtitle: 'to SkillAtlas AI' },
  { title: 'Choose', subtitle: 'Your Preferred Language' },
  { title: 'Pick', subtitle: 'Your Learning Interests' },
  { title: 'Select', subtitle: 'Your Level' },
  { title: 'You\'re', subtitle: 'All Set! 🎉' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setLanguage, setLevel, setOnboardingDone, setInterests } = usePreferences();
  const [step, setStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState('Tamil');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setLanguage(selectedLang);
      setLevel(selectedLevel);
      setInterests(selectedInterests);
      setOnboardingDone(true);
      navigate('/dashboard');
    }
  };

  const canProceed = () => {
    if (step === 2) return selectedInterests.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
          <Zap size={18} className="text-black" fill="black" />
        </div>
        <span className="text-xl font-bold text-text-primary">
          Skill<span className="text-accent">Atlas</span> AI
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-accent' : i < step ? 'w-4 bg-accent/50' : 'w-4 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-bg-card border border-border rounded-2xl p-8 animate-slide-up shadow-card">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Welcome to <span className="text-accent">SkillAtlas AI</span>
            </h1>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Your complete multilingual learning companion. One search. A smarter learning journey.
            </p>
            <div className="space-y-3 text-left">
              {[
                '🎥 Best videos in your language',
                '🌐 Trusted websites & documentation',
                '🗺️ Personalized learning roadmap',
                '💪 Practice problems & challenges',
                '🤖 AI tutor available 24/7',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="text-base">{item.slice(0, 2)}</span>
                  <span>{item.slice(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Language */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Choose Your Language</h2>
            <p className="text-sm text-text-muted mb-6">
              We'll prioritize learning resources in this language.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { code: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
                { code: 'English', native: 'English', flag: '🇬🇧' },
                { code: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
                { code: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
                { code: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    selectedLang === lang.code
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-bg-elevated border-border text-text-secondary hover:border-accent/30'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    <div className="font-semibold text-sm">{lang.code}</div>
                    <div className="text-xs opacity-70">{lang.native}</div>
                  </div>
                  {selectedLang === lang.code && (
                    <Check size={16} className="ml-auto text-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Learning Interests</h2>
            <p className="text-sm text-text-muted mb-6">
              Select all that interest you. Choose at least one.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {INTERESTS.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-bg-elevated border-border text-text-secondary hover:border-accent/30'
                  }`}
                >
                  <span className="text-base">{interest.icon}</span>
                  <span className="text-xs font-medium">{interest.label}</span>
                  {selectedInterests.includes(interest.id) && (
                    <Check size={12} className="ml-auto text-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Level */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Your Learning Level</h2>
            <p className="text-sm text-text-muted mb-6">
              We'll customize content difficulty for you.
            </p>
            <div className="space-y-3">
              {LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    selectedLevel === level.id
                      ? 'bg-accent/10 border-accent'
                      : 'bg-bg-elevated border-border hover:border-accent/30'
                  }`}
                >
                  <span className="text-2xl">{level.icon}</span>
                  <div>
                    <div className={`font-semibold text-sm ${selectedLevel === level.id ? 'text-accent' : 'text-text-primary'}`}>
                      {level.label}
                    </div>
                    <div className="text-xs text-text-muted">{level.desc}</div>
                  </div>
                  {selectedLevel === level.id && (
                    <Check size={16} className="ml-auto text-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Ready */}
        {step === 4 && (
          <div className="text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Your Learning Space is <span className="text-accent">Ready!</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">
              Language: <span className="text-text-primary font-semibold">{selectedLang}</span> · 
              Level: <span className="text-text-primary font-semibold">{selectedLevel}</span>
            </p>
            <div className="bg-bg-elevated border border-border rounded-xl p-4 text-left space-y-2">
              <p className="text-xs text-text-muted font-medium">YOUR SETUP</p>
              <p className="text-sm text-text-secondary">
                🌏 Preferred Language: <span className="text-accent">{selectedLang}</span>
              </p>
              <p className="text-sm text-text-secondary">
                📚 Level: <span className="text-accent">{selectedLevel}</span>
              </p>
              <p className="text-sm text-text-secondary">
                🎯 Interests: <span className="text-accent">{selectedInterests.length} selected</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6 w-full max-w-md">
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="px-6 py-3 bg-bg-card border border-border text-text-secondary rounded-xl hover:border-accent/30 hover:text-text-primary transition-all text-sm font-medium"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
            canProceed()
              ? 'bg-accent text-black hover:bg-accent-hover'
              : 'bg-accent/30 text-black/50 cursor-not-allowed'
          }`}
        >
          {step === STEPS.length - 1 ? 'Start Exploring' : 'Continue'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
