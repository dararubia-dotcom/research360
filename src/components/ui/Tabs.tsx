interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-slate-200">
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
              active
                ? 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs font-medium ${
                    active
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-indigo-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}
