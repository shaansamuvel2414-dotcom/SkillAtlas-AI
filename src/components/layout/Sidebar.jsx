import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Compass, Map, Code2, Bookmark, BarChart2,
  MessageSquare, Settings, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', to: '/dashboard' },
  { icon: Compass, label: 'Explore', to: '/explore' },
  { icon: Map, label: 'Roadmap', to: '/roadmap' },
  { icon: Code2, label: 'Practice', to: '/practice' },
  { icon: Bookmark, label: 'Saved', to: '/saved' },
  { icon: BarChart2, label: 'Progress', to: '/progress' },
  { icon: MessageSquare, label: 'AI Tutor', to: '/ai-tutor' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className={`hidden lg:flex flex-col bg-bg-secondary border-r border-border transition-all duration-300 shrink-0 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div className="flex flex-col flex-1 py-3 px-2 gap-0.5">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
              }`
            }
          >
            <Icon size={17} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      <div className="px-2 pb-3 space-y-0.5">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-accent/10 text-accent border border-accent/20'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
            }`
          }
        >
          <Settings size={17} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all"
        >
          {collapsed ? <ChevronRight size={17} /> : (
            <>
              <ChevronLeft size={17} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

// Mobile bottom navigation
export function BottomNav() {
  const mobileItems = [
    { icon: Home, label: 'Home', to: '/dashboard' },
    { icon: Compass, label: 'Explore', to: '/explore' },
    { icon: Code2, label: 'Practice', to: '/practice' },
    { icon: MessageSquare, label: 'AI', to: '/ai-tutor' },
    { icon: BarChart2, label: 'Progress', to: '/progress' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-bg-secondary border-t border-border z-40">
      <div className="flex items-center justify-around py-2">
        {mobileItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-all ${
                isActive ? 'text-accent' : 'text-text-muted'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
