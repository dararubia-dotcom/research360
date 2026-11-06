import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  ArrowLeft, Edit3, Download, Calendar, Users, DollarSign, Target,
  Clock, FileText, Tag, ChevronRight, Paperclip, FlaskConical,
} from 'lucide-react';
import { projects, teamMembers, documents } from '../data/mockData';

const statusBadgeStyles: Record<string, string> = {
  active: 'bg-indigo-100 text-indigo-700',
  completed: 'bg-emerald-100 text-emerald-700',
  'on-hold': 'bg-amber-100 text-amber-700',
  planning: 'bg-purple-100 text-purple-700',
};

const budgetCategories = [
  { name: 'Personnel', value: 45, color: '#6366f1' },
  { name: 'Equipment', value: 20, color: '#8b5cf6' },
  { name: 'Materials', value: 15, color: '#a78bfa' },
  { name: 'Travel', value: 10, color: '#c4b5fd' },
  { name: 'Overhead', value: 10, color: '#ddd6fe' },
];

const timelineEvents = [
  { date: '2024-01-15', title: 'Project Kickoff', description: 'Initial team meeting and project scope definition', status: 'completed' },
  { date: '2024-03-01', title: 'Literature Review Complete', description: 'Comprehensive review of 200+ papers finalized', status: 'completed' },
  { date: '2024-05-15', title: 'Phase 1 Data Collection', description: 'Primary data collection completed across 5 sites', status: 'completed' },
  { date: '2024-08-01', title: 'Preliminary Analysis', description: 'Statistical analysis of Phase 1 results', status: 'completed' },
  { date: '2024-10-15', title: 'Phase 2 Experiments', description: 'Advanced experimental protocols initiated', status: 'active' },
  { date: '2025-01-15', title: 'Manuscript Preparation', description: 'Draft manuscript for Nature submission', status: 'pending' },
  { date: '2025-04-01', title: 'Final Report', description: 'Comprehensive final report to funding agency', status: 'pending' },
];

const tabs = ['Overview', 'Team', 'Budget', 'Timeline', 'Documents'] as const;

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Overview');

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <FlaskConical className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
        <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  const budgetPct = Math.round((project.spent / project.budget) * 100);
  const projectTeam = teamMembers.filter(m => project.teamIds.includes(m.id));
  const projectDocs = documents.filter(d => d.projectId === project.id);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusBadgeStyles[project.status]}`}>
              {project.status.replace('-', ' ')}
            </span>
          </div>
          <p className="text-gray-500">{project.area} • PI: {project.pi}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Edit3 className="w-4 h-4" /> Edit
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Start Date</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{project.startDate}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">End Date</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{project.endDate}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Progress</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{project.progress}%</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Team Size</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{project.teamIds.length} members</p>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags & Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Budget Donut */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Budget Allocation</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={budgetCategories} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                    {budgetCategories.map(entry => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {budgetCategories.map(c => (
                  <div key={c.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-gray-600">{c.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{c.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Total Budget</span>
                  <span className="font-semibold text-gray-900">${(project.budget / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Spent</span>
                  <span className={`font-semibold ${budgetPct > 90 ? 'text-red-600' : 'text-gray-900'}`}>${(project.spent / 1000).toFixed(0)}K ({budgetPct}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${budgetPct > 90 ? 'bg-red-500' : budgetPct > 75 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                    style={{ width: `${Math.min(budgetPct, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* PI Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Principal Investigator</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {project.pi.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{project.pi}</p>
                  <p className="text-sm text-gray-500">Lead Researcher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Team' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectTeam.map(member => (
            <div key={member.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-indigo-600">{member.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Department</span>
                  <span className="text-gray-700">{member.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-700 text-xs">{member.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Availability</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    member.availability === 'full-time' ? 'bg-emerald-100 text-emerald-700' :
                    member.availability === 'part-time' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {member.availability.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {projectTeam.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No team members assigned yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Budget' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Financial Breakdown</h3>
            <div className="text-sm text-gray-500">
              Fiscal Year 2024–2025
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Allocated</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Spent</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Remaining</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Usage</th>
                </tr>
              </thead>
              <tbody>
                {budgetCategories.map(cat => {
                  const allocated = Math.round(project.budget * cat.value / 100);
                  const spent = Math.round(project.spent * cat.value / 100 * (0.8 + Math.random() * 0.4));
                  const remaining = allocated - spent;
                  const usage = Math.round(spent / allocated * 100);
                  return (
                    <tr key={cat.name} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="font-medium text-gray-900">{cat.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700">${(allocated / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-gray-700">${(spent / 1000).toFixed(0)}K</td>
                      <td className={`py-3 px-4 text-right font-medium ${remaining < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                        ${(remaining / 1000).toFixed(0)}K
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${usage > 90 ? 'bg-red-500' : usage > 75 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                              style={{ width: `${Math.min(usage, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600 w-8 text-right">{usage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td className="py-3 px-4 font-semibold text-gray-900">Total</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">${(project.budget / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">${(project.spent / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">${((project.budget - project.spent) / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{budgetPct}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Timeline' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {timelineEvents.map((event, i) => (
                <div key={i} className="relative flex gap-4 pl-10">
                  <div className={`absolute left-2.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    event.status === 'completed' ? 'bg-emerald-500' :
                    event.status === 'active' ? 'bg-indigo-500 ring-4 ring-indigo-100' :
                    'bg-gray-300'
                  }`} />
                  <div className={`flex-1 p-4 rounded-lg ${
                    event.status === 'active' ? 'bg-indigo-50 border border-indigo-100' :
                    'bg-gray-50 border border-gray-100'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    {event.status === 'active' && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">In Progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Documents' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Project Documents</h3>
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Paperclip className="w-4 h-4" /> Upload Document
            </button>
          </div>
          {projectDocs.length > 0 ? (
            <div className="space-y-2">
              {projectDocs.map(doc => (
                <div key={doc.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    doc.type === 'pdf' ? 'bg-red-100 text-red-600' :
                    doc.type === 'docx' ? 'bg-blue-100 text-blue-600' :
                    doc.type === 'xlsx' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size} • Uploaded {doc.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No documents uploaded yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
