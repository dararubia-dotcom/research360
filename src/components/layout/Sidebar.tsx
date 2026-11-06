import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  DollarSign,
  Award,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Bot,
  Settings,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects', badge: 8 },
  { to: '/finance', icon: DollarSign, label: 'Finance' },
  { to: '/grants', icon: Award, label: 'Grants & Funding', badge: 3 },
  { to: '/team', icon: Users, label: 'Team' },
  { to: '/timeline', icon: Calendar, label: 'Timeline' },
  { to: '/documents', icon: FileText, label: 'Documents', badge: 15 },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-slate-900 transition-transform duration-300 ease-in-out lg:z-30 lg:translate-x-0 ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
            R
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight text-white">
              Research360
            </h1>
            <p className="truncate text-[11px] font-medium text-slate-400">
              Scientific Platform
            </p>
          </div>
          <button
            onClick={onToggle}
            className="ml-auto rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto px-3">
          {navItems.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => {
                if (window.innerWidth < 1024) onToggle();
              }}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-white'
                    }
                  />
                  <span className="flex-1 truncate">{label}</span>
                  {badge != null && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-700 text-slate-300 group-hover:bg-slate-700'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider + User */}
        <div className="border-t border-slate-700/60 px-3 pt-3 pb-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
              MS
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                Dr. Maria Santos
              </p>
              <p className="truncate text-[11px] text-slate-400">
                Principal Investigator
              </p>
            </div>
            <NavLink
              to="/settings"
              className="rounded-md p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <Settings size={16} />
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}
