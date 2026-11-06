import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, TrendingDown, FolderKanban, DollarSign, Users, BookOpen,
  FileText, GitBranch, CheckCircle2, AlertCircle, Clock, ArrowRight,
  CalendarDays, FlaskConical, Award,
} from 'lucide-react';
import { projects, teamMembers } from '../data/mockData';

const budgetData = [
  { month: 'Jan', budget: 185000, expenditure: 162000 },
  { month: 'Feb', budget: 195000, expenditure: 178000 },
  { month: 'Mar', budget: 210000, expenditure: 195000 },
  { month: 'Apr', budget: 225000, expenditure: 208000 },
  { month: 'May', budget: 240000, expenditure: 221000 },
  { month: 'Jun', budget: 258000, expenditure: 239000 },
  { month: 'Jul', budget: 272000, expenditure: 255000 },
  { month: 'Aug', budget: 285000, expenditure: 268000 },
  { month: 'Sep', budget: 298000, expenditure: 281000 },
  { month: 'Oct', budget: 310000, expenditure: 294000 },
  { month: 'Nov', budget: 325000, expenditure: 305000 },
  { month: 'Dec', budget: 342000, expenditure: 318000 },
];

const statusData = [
  { name: 'Active', value: 8, color: '#6366f1' },
  { name: 'Completed', value: 5, color: '#10b981' },
  { name: 'On Hold', value: 2, color: '#f59e0b' },
  { name: 'Planning', value: 3, color: '#8b5cf6' },
];

const recentActivity = [
  { id: 1, action: 'New publication submitted', project: 'GenomX', time: '2 hours ago', icon: BookOpen, color: 'text-indigo-500' },
  { id: 2, action: 'Budget revision approved', project: 'ClimateAI', time: '4 hours ago', icon: DollarSign, color: 'text-emerald-500' },
  { id: 3, action: 'Milestone completed', project: 'NeuroMap', time: '6 hours ago', icon: CheckCircle2, color: 'text-green-500' },
  { id: 4, action: 'Team member added', project: 'BioSynth', time: '1 day ago', icon: Users, color: 'text-blue-500' },
  { id: 5, action: 'Grant proposal drafted', project: 'QuantumSense', time: '1 day ago', icon: FileText, color: 'text-purple-500' },
  { id: 6, action: 'Code repository updated', project: 'GenomX', time: '2 days ago', icon: GitBranch, color: 'text-gray-500' },
];

const upcomingDeadlines = [
  { id: 1, title: 'NSF Grant Final Report', project: 'GenomX', daysLeft: 3, urgency: 'critical' as const },
  { id: 2, title: 'Ethics Committee Review', project: 'NeuroMap', daysLeft: 7, urgency: 'high' as const },
  { id: 3, title: 'Quarterly Budget Report', project: 'All Projects', daysLeft: 12, urgency: 'medium' as const },
  { id: 4, title: 'Conference Paper Submission', project: 'ClimateAI', daysLeft: 18, urgency: 'medium' as const },
  { id: 5, title: 'Annual Progress Review', project: 'BioSynth', daysLeft: 25, urgency: 'low' as const },
];

function StatCard({ title, value, trend, trendValue, icon: Icon, color }: {
  title: string; value: string; trend?: 'up' | 'down'; trendValue?: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">{trendValue}</span>
              <span className="text-gray-400">vs last quarter</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function UrgencyBadge({ urgency }: { urgency: 'critical' | 'high' | 'medium' | 'low' }) {
  const styles = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[urgency]}`}>
      {urgency}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-indigo-100 text-indigo-700',
    completed: 'bg-emerald-100 text-emerald-700',
    'on-hold': 'bg-amber-100 text-amber-700',
    planning: 'bg-purple-100 text-purple-700',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status.replace('-', ' ')}
    </span>
  );
}

const formatCurrency = (v: number) => `$${(v / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-gray-600">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: p.color }} />
          {p.name}: ${(p.value / 1000).toFixed(0)}K
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [_activeTab] = useState('overview');
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const activeCount = projects.filter(p => p.status === 'active').length;
  const publications = 47;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time overview of your research portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Projects" value={String(activeCount)} trend="up" trendValue="+12%" icon={FolderKanban} color="bg-indigo-500" />
        <StatCard title="Total Budget" value={`$${(totalBudget / 1000000).toFixed(1)}M`} trend="up" trendValue="+8.3%" icon={DollarSign} color="bg-emerald-500" />
        <StatCard title="Team Members" value={String(teamMembers.length)} icon={Users} color="bg-blue-500" />
        <StatCard title="Publications" value={String(publications)} trend="up" trendValue="+23%" icon={BookOpen} color="bg-purple-500" />
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Budget Overview</h2>
              <p className="text-sm text-gray-500">Monthly budget allocation vs actual expenditure</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-gray-500">Budget</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-gray-500">Expenditure</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={budgetData}>
              <defs>
                <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="budget" stroke="#6366f1" fill="url(#budgetGrad)" strokeWidth={2.5} name="Budget" />
              <Area type="monotone" dataKey="expenditure" stroke="#10b981" fill="url(#expGrad)" strokeWidth={2.5} name="Expenditure" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status Pie */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Project Status</h2>
          <p className="text-sm text-gray-500 mb-4">Distribution by current phase</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} projects`, name]}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {statusData.map(s => (
              <div key={s.name} className="flex items-center gap-2 text-sm">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-gray-600">{s.name}</span>
                <span className="ml-auto font-semibold text-gray-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Activity & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 group">
                <div className={`mt-0.5 w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{item.action}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.project}</span>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View calendar</button>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((d) => (
              <div key={d.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold
                  ${d.urgency === 'critical' ? 'bg-red-100 text-red-700' :
                    d.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                    d.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'}`}>
                  {d.daysLeft}d
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{d.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{d.project}</p>
                </div>
                <UrgencyBadge urgency={d.urgency} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Projects Table */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Project Overview</h2>
          <Link to="/projects" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Principal Investigator</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Progress</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Budget Usage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((p) => {
                const budgetPct = Math.round((p.spent / p.budget) * 100);
                return (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <Link to={`/projects/${p.id}`} className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                        {p.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">{p.area}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                          {p.pi.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-gray-700">{p.pi}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              budgetPct > 90 ? 'bg-red-500' : budgetPct > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(budgetPct, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{budgetPct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={p.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
