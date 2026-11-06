import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, ArrowRight, Calendar, FlaskConical } from 'lucide-react';
import { projects } from '../data/mockData';

const statusFilters = ['all', 'active', 'completed', 'planning', 'on-hold'] as const;

const statusColors: Record<string, string> = {
  active: 'border-t-indigo-500',
  completed: 'border-t-emerald-500',
  'on-hold': 'border-t-amber-500',
  planning: 'border-t-purple-500',
};

const statusBadgeStyles: Record<string, string> = {
  active: 'bg-indigo-100 text-indigo-700',
  completed: 'bg-emerald-100 text-emerald-700',
  'on-hold': 'bg-amber-100 text-amber-700',
  planning: 'bg-purple-100 text-purple-700',
};

const areaBadgeColors: Record<string, string> = {
  Genomics: 'bg-pink-50 text-pink-700',
  'Climate Science': 'bg-teal-50 text-teal-700',
  Neuroscience: 'bg-violet-50 text-violet-700',
  'Synthetic Biology': 'bg-lime-50 text-lime-700',
  'Quantum Computing': 'bg-cyan-50 text-cyan-700',
  'AI & Healthcare': 'bg-blue-50 text-blue-700',
  'Materials Science': 'bg-orange-50 text-orange-700',
  Astrophysics: 'bg-indigo-50 text-indigo-700',
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<typeof statusFilters[number]>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesStatus = activeFilter === 'all' || p.status === activeFilter;
      const matchesSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.pi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.area.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research Projects</h1>
          <p className="text-gray-500 mt-1">{projects.length} projects across {new Set(projects.map(p => p.area)).size} research areas</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {statusFilters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                activeFilter === f
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f === 'on-hold' ? 'On Hold' : f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, PIs, or research areas..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Project Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <FlaskConical className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map(project => {
            const budgetPct = Math.round((project.spent / project.budget) * 100);
            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`block bg-white rounded-xl border border-gray-100 border-t-4 ${statusColors[project.status]} hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="p-6">
                  {/* Title Row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {project.name}
                      </h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${areaBadgeColors[project.area] || 'bg-gray-50 text-gray-700'}`}>
                        {project.area}
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize shrink-0 ${statusBadgeStyles[project.status]}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>

                  {/* PI */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                      {project.pi.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-600">{project.pi}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{project.description}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-gray-500">Progress</span>
                      <span className="text-xs font-semibold text-gray-700">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">Budget</span>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">${(project.spent / 1000).toFixed(0)}K</span>
                      <span className="text-gray-400"> / ${(project.budget / 1000).toFixed(0)}K</span>
                      <span className={`ml-2 text-xs font-medium ${budgetPct > 90 ? 'text-red-600' : budgetPct > 75 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        ({budgetPct}%)
                      </span>
                    </div>
                  </div>

                  {/* Team Members Avatars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center -space-x-2">
                      {project.teamIds.slice(0, 4).map((_, i) => {
                        const colors = ['from-blue-400 to-indigo-500', 'from-emerald-400 to-teal-500', 'from-purple-400 to-pink-500', 'from-amber-400 to-orange-500'];
                        return (
                          <div
                            key={i}
                            className={`w-7 h-7 rounded-full bg-gradient-to-br ${colors[i % colors.length]} border-2 border-white flex items-center justify-center text-white text-xs font-medium`}
                          />
                        );
                      })}
                      {project.teamIds.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                          +{project.teamIds.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{project.teamIds.length} members</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 text-gray-400 text-xs">+{project.tags.length - 4}</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{project.startDate} — {project.endDate}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
