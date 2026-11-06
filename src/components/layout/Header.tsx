import { useLocation } from 'react-router-dom';
import { Bell, Menu, Search } from 'lucide-react';

const routeMeta: Record<string, { title: string; breadcrumb: string }> = {
  '/': { title: 'Dashboard', breadcrumb: 'Home' },
  '/projects': { title: 'Projects', breadcrumb: 'Projects' },
  '/finance': { title: 'Finance', breadcrumb: 'Finance' },
  '/grants': { title: 'Grants & Funding', breadcrumb: 'Grants' },
  '/team': { title: 'Team', breadcrumb: 'Team' },
  '/timeline': { title: 'Timeline', breadcrumb: 'Timeline' },
  '/documents': { title: 'Documents', breadcrumb: 'Documents' },
  '/reports': { title: 'Reports', breadcrumb: 'Reports' },
  '/ai-assistant': { title: 'AI Assistant', breadcrumb: 'AI Assistant' },
  '/settings': { title: 'Settings', breadcrumb: 'Settings' },
};

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { pathname } = useLocation();

  const basePath = '/' + (pathname.split('/')[1] ?? '');
  const meta = routeMeta[basePath] ?? {
    title: 'Page',
    breadcrumb: 'Page',
  };

  const segments = pathname.split('/').filter(Boolean);
  const isDetail = segments.length > 1;

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumb + Title */}
      <div className="min-w-0 flex-1">
        <nav className="flex items-center gap-1 text-xs text-slate-400">
          <span>Research360</span>
          <span>/</span>
          <span className="text-slate-600">{meta.breadcrumb}</span>
          {isDetail && (
            <>
              <span>/</span>
              <span className="truncate text-slate-600 capitalize">
                {decodeURIComponent(segments[segments.length - 1])}
              </span>
            </>
          )}
        </nav>
        <h2 className="truncate text-lg font-semibold text-slate-900">
          {meta.title}
        </h2>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search projects, documents..."
          className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
        />
      </div>

      {/* Notifications */}
      <button className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
        <Bell size={19} />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
      </button>

      {/* Avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
        MS
      </div>
    </header>
  );
}
