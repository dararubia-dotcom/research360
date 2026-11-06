import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggle = () => setSidebarCollapsed((c) => !c);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggle} />

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header onMenuToggle={toggle} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
