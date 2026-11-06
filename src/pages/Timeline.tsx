import { useState, useMemo } from 'react';
import {
  Calendar,
  BarChart3,
  Diamond,
  Flag,
  Clock,
  FileCheck,
  Send,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { projects, timelineEvents } from '../data/mockData';

const statusBarColors: Record<string, string> = {
  active: 'bg-emerald-500',
  planning: 'bg-blue-400',
  'under-review': 'bg-amber-500',
  completed: 'bg-gray-400',
  'on-hold': 'bg-red-400',
};

const eventTypeConfig: Record<string, { icon: typeof Flag; color: string; border: string }> = {
  milestone: { icon: Diamond, color: 'text-purple-600 bg-purple-50', border: 'border-l-purple-500' },
  deadline: { icon: AlertTriangle, color: 'text-red-600 bg-red-50', border: 'border-l-red-500' },
  review: { icon: FileCheck, color: 'text-amber-600 bg-amber-50', border: 'border-l-amber-500' },
  submission: { icon: Send, color: 'text-blue-600 bg-blue-50', border: 'border-l-blue-500' },
  meeting: { icon: Calendar, color: 'text-emerald-600 bg-emerald-50', border: 'border-l-emerald-500' },
  presentation: { icon: BarChart3, color: 'text-indigo-600 bg-indigo-50', border: 'border-l-indigo-500' },
};

const GANTT_START = new Date('2024-10-01');
const GANTT_END = new Date('2025-12-31');
const TOTAL_DAYS = Math.ceil((GANTT_END.getTime() - GANTT_START.getTime()) / (1000 * 60 * 60 * 24));

function dayOffset(date: Date) {
  return Math.ceil((date.getTime() - GANTT_START.getTime()) / (1000 * 60 * 60 * 24));
}

function toPercent(days: number) {
  return Math.max(0, Math.min(100, (days / TOTAL_DAYS) * 100));
}

function getMonthMarkers() {
  const markers: { label: string; left: number }[] = [];
  const d = new Date(GANTT_START);
  while (d <= GANTT_END) {
    markers.push({
      label: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      left: toPercent(dayOffset(d)),
    });
    d.setMonth(d.getMonth() + 1);
  }
  return markers;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function daysUntil(dateStr: string) {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Timeline() {
  const [view, setView] = useState<'timeline' | 'events'>('timeline');

  const monthMarkers = useMemo(() => getMonthMarkers(), []);
  const todayPercent = toPercent(dayOffset(new Date()));

  const sortedEvents = useMemo(() => {
    return [...timelineEvents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, []);

  const upcomingMilestones = useMemo(() => {
    const now = new Date();
    return sortedEvents
      .filter((e) => new Date(e.date) > now && (e.type === 'milestone' || e.type === 'deadline'))
      .slice(0, 5);
  }, [sortedEvents]);

  const projectMilestones = useMemo(() => {
    const map = new Map<string, typeof timelineEvents>();
    timelineEvents.forEach((e) => {
      if (e.projectId && e.type === 'milestone') {
        const arr = map.get(e.projectId) || [];
        arr.push(e);
        map.set(e.projectId, arr);
      }
    });
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Timeline</h1>
          <p className="text-sm text-gray-500 mt-1">Visualize project schedules and milestones</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('timeline')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'timeline'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Timeline
          </button>
          <button
            onClick={() => setView('events')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'events'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Events
          </button>
        </div>
      </div>

      {view === 'timeline' ? (
        <>
          {/* Gantt Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Gantt Chart</h2>

            {/* Month Headers */}
            <div className="relative min-w-[800px]">
              <div className="flex ml-[180px]">
                <div className="relative w-full h-6">
                  {monthMarkers.map((m, i) => (
                    <span
                      key={i}
                      className="absolute text-[10px] text-gray-500 font-medium -translate-x-1/2 whitespace-nowrap"
                      style={{ left: `${m.left}%` }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid Lines + Today Marker */}
              <div className="relative ml-[180px]">
                <div className="absolute inset-0 pointer-events-none">
                  {monthMarkers.map((m, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 border-l border-gray-100"
                      style={{ left: `${m.left}%` }}
                    />
                  ))}
                  {todayPercent > 0 && todayPercent < 100 && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10"
                      style={{ left: `${todayPercent}%` }}
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-medium rounded whitespace-nowrap">
                        Today
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Bars */}
                <div className="relative space-y-1.5">
                  {projects.map((project) => {
                    const start = new Date(project.startDate);
                    const end = new Date(project.endDate);
                    const leftPct = toPercent(dayOffset(start));
                    const widthPct = toPercent(dayOffset(end)) - leftPct;
                    const milestones = projectMilestones.get(project.id) || [];

                    return (
                      <div key={project.id} className="flex items-center h-10 group">
                        <div className="absolute left-[-180px] w-[170px] pr-3 text-right">
                          <p className="text-xs font-medium text-gray-700 truncate" title={project.title}>
                            {project.title}
                          </p>
                        </div>
                        <div className="relative w-full h-full flex items-center">
                          <div
                            className={`absolute h-7 rounded-md ${statusBarColors[project.status] || 'bg-gray-400'} opacity-85 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer`}
                            style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 0.5)}%` }}
                            title={`${project.title}: ${formatDate(project.startDate)} → ${formatDate(project.endDate)}`}
                          >
                            <span className="absolute inset-0 flex items-center px-2 text-[10px] text-white font-medium truncate">
                              {widthPct > 8 ? project.title : ''}
                            </span>
                          </div>
                          {milestones.map((ms) => {
                            const msLeft = toPercent(dayOffset(new Date(ms.date)));
                            return (
                              <div
                                key={ms.id}
                                className="absolute w-3 h-3 bg-purple-500 border-2 border-white shadow rotate-45 z-20 cursor-pointer"
                                style={{ left: `${msLeft}%`, transform: 'translateX(-50%) rotate(45deg)' }}
                                title={`${ms.title} — ${formatDate(ms.date)}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 ml-[180px] text-xs">
                {Object.entries(statusBarColors).map(([status, color]) => (
                  <div key={status} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${color}`} />
                    <span className="text-gray-600 capitalize">{status.replace('-', ' ')}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-purple-500 rotate-45" />
                  <span className="text-gray-600">Milestone</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-red-400" />
                  <span className="text-gray-600">Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              Upcoming Milestones
            </h2>
            {upcomingMilestones.length > 0 ? (
              <div className="space-y-3">
                {upcomingMilestones.map((ms) => {
                  const days = daysUntil(ms.date);
                  const project = projects.find((p) => p.id === ms.projectId);
                  return (
                    <div
                      key={ms.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Diamond className="w-4 h-4 text-purple-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{ms.title}</p>
                          {project && (
                            <p className="text-xs text-gray-500 truncate">{project.title}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-xs text-gray-500">{formatDate(ms.date)}</p>
                        <p
                          className={`text-xs font-medium ${
                            days <= 7
                              ? 'text-red-600'
                              : days <= 30
                                ? 'text-amber-600'
                                : 'text-gray-600'
                          }`}
                        >
                          {days > 0 ? `${days} days` : days === 0 ? 'Today' : `${-days}d overdue`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No upcoming milestones</p>
            )}
          </div>
        </>
      ) : (
        /* Events View */
        <div className="space-y-3">
          {sortedEvents.map((event) => {
            const cfg = eventTypeConfig[event.type] || eventTypeConfig.milestone;
            const Icon = cfg.icon;
            const project = projects.find((p) => p.id === event.projectId);
            return (
              <div
                key={event.id}
                className={`bg-white rounded-xl border border-gray-200 p-4 border-l-4 ${cfg.border} hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${cfg.color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        {event.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{event.description}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {project && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          <ChevronRight className="w-3 h-3" />
                          {project.title}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-xs capitalize">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
