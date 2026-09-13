import { useState, useRef, useEffect } from 'react';
import { Send, Zap, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';
import { quickActions, getAIResponse } from '../../data/mockChat';

function MessageBubble({ message }) {
  const isAI = message.role === 'ai';

  // Render code blocks in AI messages
  const renderContent = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```\w*\n?/, '').replace(/```$/, '');
        return (
          <pre key={i} className="bg-bg-primary border border-border rounded-lg p-3 mt-2 mb-2 text-xs text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
            {code}
          </pre>
        );
      }
      return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
    });
  };

  return (
    <div className={`flex gap-2 mb-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        isAI ? 'bg-accent/15 border border-accent/30' : 'bg-bg-elevated border border-border'
      }`}>
        {isAI ? <Zap size={13} className="text-accent" /> : <User size={13} className="text-text-muted" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
        isAI
          ? 'bg-bg-elevated border border-border text-text-primary rounded-tl-none'
          : 'bg-accent/15 border border-accent/30 text-text-primary rounded-tr-none'
      }`}>
        {isAI ? renderContent(message.content) : message.content}
        <div className="text-[10px] text-text-muted mt-1">{message.time}</div>
      </div>
    </div>
  );
}

export default function ChatInterface({ embedded = false, topic = 'Java Arrays' }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: `Vanakkam! 👋 Naan SkillAtlas AI — ungalukkு ${topic} learn panna help pannuven!\n\nKeezhae irukka quick actions use pannalaam, illa freely type pannalaam. Tamil-la type pannalaamm — purinjukuven! 😊`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text, action = null) => {
    if (!text.trim() && !action) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text || quickActions.find(a => a.id === action)?.label || '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate AI response delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

    const responseText = getAIResponse(text, action);
    const aiMsg = {
      id: Date.now() + 1,
      role: 'ai',
      content: responseText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={`flex flex-col bg-bg-secondary border border-border rounded-xl overflow-hidden ${
      embedded ? 'h-full' : 'h-full'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-card">
        <div className="w-8 h-8 bg-accent/15 border border-accent/30 rounded-full flex items-center justify-center">
          <Zap size={14} className="text-accent" />
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary">SkillAtlas AI</div>
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
            Topic: {topic} · Tamil
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 min-h-0">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {loading && (
          <div className="flex gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
              <Zap size={13} className="text-accent" />
            </div>
            <div className="bg-bg-elevated border border-border rounded-xl rounded-tl-none px-3 py-2.5">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={() => sendMessage(action.label, action.id)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated border border-border rounded-full text-[10px] text-text-secondary hover:border-accent/30 hover:text-accent transition-all"
            >
              <span>{action.icon}</span> {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-bg-card">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type in Tamil or English..."
            className="flex-1 bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-9 h-9 bg-accent text-black rounded-lg flex items-center justify-center hover:bg-accent-hover transition-colors disabled:opacity-40 shrink-0"
          >
            <Send size={15} />
          </button>
        </form>
        <p className="text-[10px] text-text-muted mt-1.5 text-center">
          AI responses are simulated for prototype demonstration
        </p>
      </div>
    </div>
  );
}
