import AppLayout from '../components/layout/AppLayout';
import ChatInterface from '../components/ui/ChatInterface';
import { Zap } from 'lucide-react';

export default function AITutorPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in" style={{ height: 'calc(100vh - 56px)' }}>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-accent/15 border border-accent/30 rounded-full flex items-center justify-center">
              <Zap size={14} className="text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Ask SkillAtlas AI</h1>
          </div>
          <p className="text-sm text-text-muted">
            Ask anything in Tamil or English. Get code examples, videos, practice, and more.
          </p>
        </div>

        {/* Chat examples */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[
            { text: '"Array index yen 0 la start aguthu?"', lang: 'Tamil' },
            { text: '"Explain recursion simply"', lang: 'English' },
            { text: '"For loop example code"', lang: 'Mixed' },
            { text: '"What should I learn next?"', lang: 'English' },
          ].map(ex => (
            <div key={ex.text} className="bg-bg-card border border-border rounded-lg p-3">
              <div className="text-[10px] text-accent font-medium mb-1">{ex.lang}</div>
              <div className="text-xs text-text-muted italic">{ex.text}</div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="flex-1 min-h-0">
          <ChatInterface topic="Java Arrays" embedded />
        </div>
      </div>
    </AppLayout>
  );
}
